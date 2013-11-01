Creo / ProEngineer with Subversion Helper Scripts
=================================================

These scripts, when run as pre-commit and pre-update hook scripts with tortoise
SVN will remove temporary files and rename *.{prt,asm,drw}.[2-9] to *.{prt,asm,drw}.1
so that subversion can be used for revision control of Creo / ProEngineer files.

Thus you can use Subversion as a poor-mans PDM.

There are two types of scripts: DOS Batch or nodejs Javascript. The batch file 
scripts were adapted from someone elses script.


Intallation
===========

Put the files (either bat or js folder) somewhere accessible (C:\Program Files)
If you are using the js script, install nodejs http://nodejs.org
Add that folder to the system PATH variable
Add the ProEsvnPrep.bat file as a hook script for both pre-commit and pre-update.

Usage
=====

When you commit, or update your working copy, the scripts will first delete 
temporary files and rename the highest version to .1 and delete the other version
files.

You should close ProE / Creo before updating or commiting your files.

ISSUES
======

Most issues I have had with these scripts involved either an old version of ProE
not removing it's entry from the PATH variable (causing the wrong purge.bat to be
called) or an incorrect PATH variable set for the scripts.

Documentation
=============

If you actually find this code and try to use it, and you find that the above 
documentation is insufficient, file an issue and I'll try to improve it.
