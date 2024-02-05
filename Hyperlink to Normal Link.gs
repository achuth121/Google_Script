function ExtractLink() {
  var sheetName = "Sheet 1";
  var startRow = 2;
  var valueCol = 1;
  var resultCol = 2;

  // Open the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the sheet
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Get the range for column A
  var range = sheet.getRange(startRow, valueCol, sheet.getLastRow()-1, 1);

  var g= range.getRichTextValues();

  // Iterate through each cell in column
  for (var i = 0; i < g.length; i++) 
  {     
    var linkUrl = g[i][0].getLinkUrl();

    //  Write to column B
    sheet.getRange(startRow + i, resultCol).setValue(linkUrl);
  }

}
