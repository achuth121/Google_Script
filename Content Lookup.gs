/**
 * Filters data based on a specified content.
 *
 * @param {string} The content which is to be filtered, to be given in "" (eg. "content").
 * @param {number} Column no. containing the contents (1=A, 2=B ...........).
 * @param {number} The output column number (1=A, 2=B ...........).
 * @param {string} Name of the sheet where the data is present to be given in ""(eg. "Sheet1").
 * @param {string} The method in which content is to be split(if it is in next line in the formula type "\n").
 * @return {Array} The filtered output names.
 *
 * @customfunction
 */

function clookup(content, content_column, output_name_column, sheet_name, criteria) 
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
  var filteredData = [];
  
  for (var i = 0; i < data.length; i++) 
{
    var contents = data[i][content_column-1].split(criteria); 
    if (contents.indexOf(content) !== -1) 
{
      filteredData.push(data[i][output_name_column-1]); 
    }
  }
  
  return filteredData;
}
