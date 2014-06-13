/* Author: Hauptmech <hauptmech@gmail.com>, Oct 2013 

Add patterns for deletion or renaming as needed.
The renumbering is limited to single digits. If you need to you can change this
by modifying the slicing in the 'mv' command at line 82.

*/

require('shelljs/global');

var fs = require('fs');
var os = require('os');

logfile = process.env.USERPROFILE + "/ProEsvnPrep_log.txt";
//Files to delete
delete_pattern = [	
      /\.crc\.[^\/]+$/,
      /\.log\.[^\/]+$/,
      /\.m_p\.[^\/]+$/,
      /\.ger\.[^\/]+$/,
      /\.inf\.[^\/]+$/,
      /\.lst\.[^\/]+$/,
      /\.plt$/,
      /\.idx$/,
      /\.tst$/];

//Files to rename			
rename_pattern = [	
    /\.prt\.[^\/]+$/,
    /\.asm\.[^\/]+$/,
    /\.drw\.[^\/]+$/];

function printlist(list) {
    var j=0;
  while (j < list.length){console.log(list[j]);j++;}
}

function filterlist(list, regex) {
  return list.filter(function(file) { return file.match(regex); });
}

// Grab the file which svn has stuffed with directories to process
listfile = process.argv[2];

//Check to see if we were called correctly
if (typeof listfile == 'undefined' || !test('-e',listfile)){ 
  console.log("Error: '"+listfile+"' is not a valid path.");
}
else{
  var text = fs.readFileSync(listfile, "utf8");
  fs.writeFileSync(logfile, text, 'utf8');

  svn_dirs = text.split(os.EOL);

  var i=0;
  //For each dir provided (skipping empty lines)
  while (i < svn_dirs.length && svn_dirs[i] != ""){
    //Get a list of all files (should exclude .svn/*)
    files=ls('-R',svn_dirs[i]+"/*");
    
    console.log("===Deleting===\n");
    //Delete unwanted files
    for (var j=0; j<delete_pattern.length; j++){
      sublist = filterlist(files,delete_pattern);
      printlist(sublist);
      fs.appendFileSync(logfile,sublist);
      sublist.forEach(function(filename){
        rm('-f',filename);
      });
    }
    
    files=ls('-R',svn_dirs[i]+"/*");

    console.log("===Renaming===\n");
    // Progressively rename files from *.N to *.1
    for (var j=0;j<rename_pattern.length;j++){
		// Start with single digit files
        sublist = filterlist(filterlist(files,rename_pattern[j]),/\.[1-9]$/);
        sublist.sort()
        sublist.forEach(function(filename){
          mv('-f',filename,filename.slice(0,-1)+"1");
        });
        printlist(sublist);
        fs.appendFileSync(logfile,sublist);
		// Do double digit files if they exist
        sublist = filterlist(filterlist(files,rename_pattern[j]),/\.[1-9][0-9]$/);
        sublist.sort()
        sublist.forEach(function(filename){
          mv('-f',filename,filename.slice(0,-2)+"1");
        });
        printlist(sublist);
        fs.appendFileSync(logfile,sublist);
    }
    i++;
  }
}
