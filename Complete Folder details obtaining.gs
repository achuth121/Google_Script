function listFilesAndFolders() {
  var folderid = 'FOLDER_ID'; // change FolderID
  var sh = SpreadsheetApp.openById("SHEET_ID");

  sh.appendRow(["parent","folder", "name", "update", "size", "URL", "ID", "description", "type"]);
  try {
    var parentFolder =DriveApp.getFolderById(folderid);
    listFiles(parentFolder,parentFolder.getName())
    listSubFolders(parentFolder,parentFolder.getName());
  } catch (e) {
    Logger.log(e.toString());
  }
}

function listSubFolders(parentFolder,parent) {
  var childFolders = parentFolder.getFolders();
  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    Logger.log("Fold : " + childFolder.getName());
    listFiles(childFolder,parent)
    listSubFolders(childFolder,parent + "|" + childFolder.getName());
  }
}

function listFiles(fold,parent){
  var sh = SpreadsheetApp.openById("1_Np2BEV7WBbe0i34dNNfNtX0ddt9um-u253il-TydmM");
  var data = [];
  var files = fold.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    data = [ 
      parent,
      fold.getName(),
      file.getName(),
      file.getLastUpdated(),
      file.getSize(),
      file.getUrl(),
      file.getId(),
      file.getDescription(),
      file.getMimeType()
      ];
    sh.appendRow(data);
  }
}
