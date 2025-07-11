// This script tries to find a publishing workflow with a dispatch trigger
// in the Github Actions of the current project

import { promisify } from 'node:util';
import { exec as execCb } from 'node:child_process';
import * as path from 'node:path';
import { promises as fs } from 'node:fs';
import { Octokit } from '@octokit/core';
import { fileURLToPath } from 'node:url';
const exec = promisify(execCb);

const octokit = new Octokit({ auth: process.env.NODE_PRE_GYP_GITHUB_TOKEN });
const package_json = JSON.parse(await fs.readFile(path.resolve(fileURLToPath(import.meta.url), '..', '..', 'package.json')));
const pkg = {
  repo: package_json.binary.hosting.repo.split('/')[1],
  owner: package_json.binary.hosting.repo.split('/')[0]
};
const version = package_json.version;
let workflowPublishId;
const workflowPublishMatch = /publish/;

(async () => {
  const branch = (await exec('git branch --show-current')).stdout.trim();

  process.stdout.write(`trying to find the publish workflow for ${pkg.owner}:${pkg.repo}...`);
  const workflows = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows', pkg);
  for (const w of workflows.data.workflows) {
    if (w.name.match(workflowPublishMatch)) {
      process.stdout.write(` found ${w.id}:${w.name}\n`);
      workflowPublishId = w.id;
      break;
    }
  }
  if (!workflowPublishId) {
    process.stdout.write(' no publishing workflow found\n');
    return;
  }
  const workflowPublish = {
    ...pkg,
    workflow_id: workflowPublishId,
    ref: `v${version}`,
    inputs: {
      prerelease: !!process.env.npm_config_preid
    }
  };

  process.stdout.write(`launching Github actions build on branch ${branch} for ${version}, tag ${workflowPublish.ref}`);
  await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', workflowPublish);

  let status;
  do {
    process.stdout.write('.');
    await new Promise((res) => setTimeout(res, 5000));
    status = await octokit.request(`GET /repos/{owner}/{repo}/actions/workflows/${workflowPublishId}/runs`,
      { ...pkg, per_page: 1, page: 0 });
  } while (status.data.workflow_runs[0].status !== 'completed');
  process.stdout.write('\n');
  if (status.data.workflow_runs[0].conclusion !== 'success') {
    const url = new URL(status.data.workflow_runs[0].jobs_url);
    if (url.protocol !== 'https:' || url.hostname !== 'api.github.com' || url.pathname.match(/^[a-z0-9/-]+$/g)) {
      throw new Error(`unexpected protocol URL ${url}`);
    }
    const jobs = await octokit.request(url.toString());
    const failedJob = jobs.data.jobs.filter((j) => !['success', 'cancelled'].includes(j.conclusion));
    const failedStep = failedJob[0].steps.filter((j) => !['success', 'cancelled'].includes(j.conclusion));
    console.error('failed job', failedJob[0].name, failedStep[0].name);
    throw new Error('Github actions build failed');
  }
  process.stdout.write('success');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
