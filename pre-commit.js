require('shelljs/global');
var fs = require('fs');
var os = require('os');

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

//Sequence of numbers to rename (double digits require changing mv command below)			
rename_numbers = [ /2$/,/3$/,/4$/,/5$/,/6$/,/7$/,/8$/,/9$/];

function printlist(list) {
    var j=0;
  while (j < list.length){console.log(list[j]);j++;}
}

function filterlist(list, regex) {
  return list.filter(function(file) { return file.match(regex); });
}

listfile = process.argv[2];
listfile = "e:\\log.txt"

//Check to see if we were called correctly

if (typeof listfile == 'undefined' || !test('-e',listfile)){ 
  console.log("Error: '"+listfile+"' is not a valid path.");
}
else{
  var text = fs.readFileSync(listfile, "utf8");
  fs.writeFileSync("E:\\log.txt", text, 'utf8');

  svn_dirs = text.split(os.EOL);

  var i=0;
  //For each dir provided (skipping empty lines)
  while (i < svn_dirs.length && svn_dirs[i] != ""){
    //Get a list of all files (should exclude .svn/*)
    files=ls('-R',svn_dirs[i]+"/*")
    
    console.log("===Deleting===\n");
    //Delete unwanted files
    for (var j=0; j<delete_pattern.length; j++){
      sublist = filterlist(files,delet_pattern);
      printlist(sublist);
      sublist.forEach(function(filename){
        rm('-f',filename);
      });
    }
    
    console.log("===Renaming===\n");
    // Progressively rename files from *.N to *.1
    for (var j=0;j<rename_pattern.length;j++)
      for (var k=0;k<rename_numbers.length;k++){
        sublist = filterlist(filterlist(files,rename_pattern[j]),rename_numbers[k]);
        sublist.forEach(function(filename){
          mv('-f',filename,filename.slice(0,-1)+"1");
        });
        printlist(sublist);
    }
    i++;
  }
}
