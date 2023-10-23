if (!process.argv[2]) console.log('False');
else if (process.argv[2].toLowerCase() === 'false') console.log('False');
else if (process.argv[2].toLowerCase() === 'true') console.log('True');
else throw new Error(`Invalid value ${process.argv[2]}`);
