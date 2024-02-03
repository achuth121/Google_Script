 //The google slide ID where template is present
  var templateId = 'TEMPLATE_ID';

  //The drive folder to which the certificate output is to be generated
  var folderId = 'FOLDER_ID';


function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
     .addItem('Generate Certificates', 'generateCertificates')
     .addItem('Generate Certificates With QR', 'generateCertificatesWithAQR')
     .addToUi();
}

function  generateCertificates()
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  var headers = data[0];

  for (var i = 1; i < data.length; i++) 
  {
    var row = data[i];
    var name = row[headers.indexOf('Name')];
    // Add more placeholders as needed

    var newSlide = DriveApp.getFileById(templateId).makeCopy(name + ' Certificate');
    var copiedSlide = SlidesApp.openById(newSlide.getId());
    var slides = copiedSlide.getSlides();

    for (var j = 0; j < slides.length; j++) 
    {
      var slide = slides[j];
      var shapes = slide.getShapes();
      for (var k = 0; k < shapes.length; k++) 
      {
        var shape = shapes[k];
        var text = shape.getText().asString();
        
        for (var headerIndex = 0; headerIndex < headers.length; headerIndex++) 
        {
          var placeholder = '{{' + headers[headerIndex] + '}}';
          var value = row[headerIndex]; // Assuming the order matches the headers

          if (text.indexOf(placeholder) !== -1) {
            shape.getText().replaceAllText(placeholder, value);
          }
        }
      }
    }
  copiedSlide.saveAndClose();

    var pdfBlob = newSlide.getAs('application/pdf');
    var pdfFileName = name + ' Certificate.pdf';
    var pdfFile = DriveApp.getFolderById(folderId).createFile(pdfBlob.setName(pdfFileName));

    newSlide.setTrashed(true);
  }  
}


function generateCertificatesWithAQR() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getDisplayValues();
  var headers = data[0];

  var qrColumnHeader = 'QRCode'; // Change this to the header name of the QR code column

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var name = row[headers.indexOf('Name')];
    var qrCellValue = row[headers.indexOf(qrColumnHeader)];
    // Add more placeholders as needed

    var newSlide = DriveApp.getFileById(templateId).makeCopy(name + ' Certificate');
    var copiedSlide = SlidesApp.openById(newSlide.getId());
    var slides = copiedSlide.getSlides();

    for (var j = 0; j < slides.length; j++) {
      var slide = slides[j];
      var shapes = slide.getShapes();
      for (var k = 0; k < shapes.length; k++) {
        var shape = shapes[k];
        var text = shape.getText().asString();

        for (var headerIndex = 0; headerIndex < headers.length; headerIndex++) {
          var placeholder = '{{' + headers[headerIndex] + '}}';
          var value = row[headerIndex]; // Assuming the order matches the headers

          if (text.indexOf(placeholder) !== -1 && placeholder !== '{{QRCode}}') {
            shape.getText().replaceAllText(placeholder, value);
          }
        }

        if (text.indexOf('{{QRCode}}') !== -1) {
          var qrCodeUrl = "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=" + qrCellValue;
          shape.getText().replaceAllText('{{QRCode}}', ''); // Remove the placeholder text
          shape.getFill().setSolidFill('#ffffff'); // Clear the shape background
          var image = slide.insertImage(qrCodeUrl);
          image.setWidth(shape.getWidth()).setHeight(shape.getHeight());
          image.setLeft(shape.getLeft());
          image.setTop(shape.getTop());
        }
      }
    }

    copiedSlide.saveAndClose();

    var pdfBlob = newSlide.getAs('application/pdf');
    var pdfFileName = name + ' Certificate.pdf';
    var pdfFile = DriveApp.getFolderById(folderId).createFile(pdfBlob.setName(pdfFileName));

    newSlide.setTrashed(true);
  }
}
