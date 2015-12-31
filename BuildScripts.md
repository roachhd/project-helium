# Using the build scripts #
## Listing ##
  * build
  * game-compiler
  * app-update
  * site-update
## Requirements ##
  * You must be using a linux system with bash. The above scripts are all bash scripts.
  * You must have zip installed (usually is by default) in order for app-update to work properly.
  * You should optionally have nano installed. This is the editor used in the project, and is called in the build scripts. If you do not have nano, you'll get an error, though the rest of the build should still work.
  * You must have a recent version of Java installed in order for the compiler to run. Recommend 1.6+
## Use ##
The build scripts are used to automate copying and compiling the game. In order to use the scripts, simply execute build from within the Tools directory.

```
$ cd Tools
$ ./build
```

_At the end of the build script, you will be asked to commit changes. This is because the build script also calls hg commit, in order to update the repository as needed. Just enter a build message and save._

# Details #
The _build_ script simply calls all other scripts in order, and calls hg add and hg commit at the end. This is the script to edit if you are adding another build script.

The _game-compiler_ script is used to call compiler.jar (closure-compiler) with the proper settings for each script. If another javascript file needs to be added, simply copy one of the existing lines and edit with the scripts name.

The _app-update_ script is used to copy all the files from Source to the Chrome app directory. After the copy, it will execute nano to allow editing the manifest.json file. At the end, it will also zip the directory, allowing for easier upload to the Webstore.

The _site-update_ script is similar to the _app-update_ script, except that it copies the files to the web app directory. There is no file zipping involved, as it is a simple HTML and JavaScript application with no manifest or added icons.