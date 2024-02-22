// Replace 'SHEET_ID' with the ID of your Google Sheet
var sheetId = 'YOUR SHEET ID';  
// Replace 'SHEET_NAME' with the name of the sheet containing your contacts
var sheetName = 'Sheet1';

function importContactsFromSheet() 
{
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  var dataRange = sheet.getDataRange();
  var headerRow = dataRange.offset(0, 0, 1).getValues()[0];
  var nameIndex = -1;
  var emailIndex = -1;
  var phoneIndex = -1;
  
  for (var i = 0; i < headerRow.length; i++) 
  {
    var header = headerRow[i].toLowerCase(); 
    
    if (header.includes('name')) 
    {
      nameIndex = i;
    }

    else if (header.includes('email')) 
    {
      emailIndex = i;
    } 
    
    else if (header.includes('phone') || header.includes('number') || header.includes('mobile')) 
    {
      phoneIndex = i;
    }
  }
  
  if (nameIndex === -1 || emailIndex === -1 || phoneIndex === -1) 
  
  {
    Logger.log('Missing required columns (Name, Email, Phone) in the sheet header.');
    return;
  }
  
  for (var i = 1; i < dataRange.getNumRows(); i++) 
  
  {
    var rowValues = dataRange.offset(i, 0, 1).getValues()[0];
    var name = rowValues[nameIndex];
    var email = rowValues[emailIndex];
    var phone = rowValues[phoneIndex];
    
    // Create contact
    ContactsApp.createContact(name, '', email).addPhone(ContactsApp.Field.MOBILE_PHONE, phone);
  }
  
  Logger.log('Contacts imported successfully.');

}
