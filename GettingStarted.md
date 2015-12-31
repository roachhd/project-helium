# Introduction #

Project Helium is an alpha-quality project currently. The code runs great, but includes a number of limitations. Currently, there are a lot of unimplemented features, the only target platform is Chrome, and the repository is in need of clean up (as is a lot of the source code). Documentation is currently a priority, along with clean up.

This document will explain how to get started with the code.

# Getting Set Up #

You will need Mercurial installed on your development machine to download the source code. If you wish to contribute, contact someone on the dev team and we will set you up with push access. For those who just want to pull the source, follow the instructions on the Source tab.

You can learn more about Mercurial here: http://hginit.com/

Once you have downloaded the source by cloning it, you can take a look at the directories and source code.

# Getting Started with Code #

Currently the repository is made up of three main sections:

  1. **Chrome** - _The directory where the Chrome packaged app is built. If using the built in scripts, all you should need to manually update here is the manifest.json. More on that later._
  1. **Source** - _This directory contains all of the actual source code, including tests, html, css, and of course, the javascript code. There are also Dummy and test directories, for debugging and testing._
  1. **Tools** - _This is where all third party tools, build scripts, and other tools go. Note that some programs, such as closure compiler may have licenses other than Apache 2.0. Please respect their copyrights._
  1. **Web App** - _This is where compiled scripts go and the directory where deployable code is kept. For each built, this directory is updated with all relevant files (html, css, javascript, and other resources). You can copy this directory and modify the remote rules to allow it to run on your own server._

There is still a lot of documentation needed. Not all files have a license (though they are covered under the broad license in the root directory, unless otherwise stated), and this is a priority. Also, the build scripts could use some tweaking, closure compiler should have its proper license and other requirements met, and there's plenty of code cleanup needed in the engine.

# Notes #

  1. _**The Chrome App can be built automatically (aside from the manifest) through the included scripts. These scripts also add the code to /Web App. Currently, the scripts are only made to work with linux. They may be compatible with most versions of Unix, however. Batch versions for Windows shouldn't be hard to make, if a need should arise, but for now, the easiest way to build is either on a Linux server or VM, if you aren't using Linux on your development environment. You will also need a recent version of Java to run Closure Compiler. Please see the Tools section for more information.**_