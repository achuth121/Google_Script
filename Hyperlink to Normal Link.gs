function ExtractLink() {
  // Open the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the sheet named "Consol"
  var sheet = spreadsheet.getSheetByName("Consol");

  // Get the range for column H
  // Number 2 represents the roẇnumber and number 8 represents the coloumn number
  var range = sheet.getRange(2,8, sheet.getLastRow()-1, 1);

  var g= range.getRichTextValues();

  // Iterate through each cell in column H
  for (var i = 0; i < g.length; i++) 
  {     
      Logger.log(g[i][0]);
      Logger.log( g[i][0].getLinkUrl());      
    
    var linkUrl = g[i][0].getLinkUrl();

    //  Write to column I
    //  Number 2 represents the roẇnumber and number 9 represents the coloumn number
    sheet.getRange(2 + i, 9).setValue(linkUrl);
  }
}
