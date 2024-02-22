function FIRSTSAT(input, offset) 
{
  offset = offset || 0; // Set default offset to 0 if not provided
  var date;
  // Check if input is a valid date string
  if (typeof input === 'string') 
  
  {
    date = new Date(input);
    // Check if the parsed date is valid
    if (isNaN(date.getTime())) 
    {
      return "Invalid Date";
    }
  } 
  else if (input instanceof Date) 
  {
    date = input;
  } 
  else 
  {
    return "Invalid Input";
  }
  
  var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth() + offset, 1);
  var dayOfWeek = firstDayOfMonth.getDay();
  var daysToAdd = (dayOfWeek <= 6) ? (6 - dayOfWeek) : (13 - dayOfWeek);
  var firstSaturday = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() + daysToAdd));
  
  return firstSaturday;
}
