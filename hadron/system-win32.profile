include(default)

[replace_tool_requires]
meson/*: meson/1.3.1

[conf]
tools.cmake.cmaketoolchain:generator=Ninja
tools.cmake.cmaketoolchain:user_toolchain+={{ os.path.join(profile_dir, 'ninja-xpack-toolchain.cmake') }}
