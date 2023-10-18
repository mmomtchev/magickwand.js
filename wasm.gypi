{
  'conditions': [
    ['target_platform == "emscripten"', {
      # This comes from conan
      'make_global_settings': [
        ['CXX', '<!(node -p "JSON.parse(fs.readFileSync(\'<(module_root_dir)/build/conanbuildinfo.json\')).deps_env_info.CXX")'],
        ['CC', '<!(node -p "JSON.parse(fs.readFileSync(\'<(module_root_dir)/build/conanbuildinfo.json\')).deps_env_info.CC")'],
        ['CXX.target', '<!(node -p "JSON.parse(fs.readFileSync(\'<(module_root_dir)/build/conanbuildinfo.json\')).deps_env_info.CXX")'],
        ['CC.target', '<!(node -p "JSON.parse(fs.readFileSync(\'<(module_root_dir)/build/conanbuildinfo.json\')).deps_env_info.CC")'],
        ['LINK', '<!(node -p "JSON.parse(fs.readFileSync(\'<(module_root_dir)/build/conanbuildinfo.json\')).deps_env_info.CC")']
      ]
    }]
  ]
}
