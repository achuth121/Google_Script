function getDateFromDocsAndInsertInSheet() {
  var folderId = "1L4XdKlkIOjRevwaqlWKD_Qb2z7Nyqv0V"; // Replace with the ID of the folder containing your Google Docs
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.clear(); // Clear existing data
  
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  
  while (files.hasNext()) {
    var file = files.next();
    var doc = DocumentApp.openById(file.getId());
    var text = doc.getBody().getText();
    var date = extractFirstDate(text);
    
    var rowData = [file.getName(), date];
    sheet.appendRow(rowData);
  }
}

function extractFirstDate(text) {
  var dateRegex = /((0?[1-9]|[12]\d|3[01])[\s\.\-\/](0?[1-9]|1[0-2])[\s\.\-\/](\d{2}|\d{4}))|((0?[1-9]|[12]\d|3[01])[\s\.\-\/](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s\.\-\/](\d{2}|\d{4}))|((Sun|Mon|Tue|Wed|Thu|Fri|Sat)day?[\s\.\-\/](0?[1-9]|[12]\d|3[01])[\s\.\-\/](Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s\.\-\/](\d{2}|\d{4}))/ig;
  var match = text.match(dateRegex);
  
  if (match) {
    return match[0];
  } else {
    return "No date found";
  }
}
