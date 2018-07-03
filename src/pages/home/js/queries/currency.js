export function getCurrency(currencyCode)
{
  let requestString = 
    'https://restcountries.eu/rest/v2/currency/'+ 
    currencyCode;      
  return fetch(requestString, {
   	method: 'GET',
  });  
}