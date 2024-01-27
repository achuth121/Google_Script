function listFolderContents() {
  var foldername = '<Name of the folder>'; //Type in the folder name in which the the files whose links are to be produced
  var folderlisting = '<New sheet name>'; //Type in the name of the new sheet which will be produced after the execution
  
  var folders = DriveApp.getFoldersByName(foldername)
  var folder = folders.next();
  var contents = folder.getFiles();
  
  var ss = SpreadsheetApp.create(folderlisting);
  var sheet = ss.getActiveSheet();
  sheet.appendRow( ['name', 'link'] );
  
  var file;
  var name;
  var link;
  var row;
  while(contents.hasNext()) {
    file = contents.next();
    name = file.getName();
    link = file.getUrl();
    sheet.appendRow( [name, link] );     
  }  
};
