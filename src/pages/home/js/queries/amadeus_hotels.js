export function getQuerySearchHotels(api_key, location, check_in, check_out, number_of_results, radius, currency, max_rate, amenity)
{
  let requestString = 
    'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?' +
    'apikey='+ api_key +
    '&location=' + location +
    '&check_in='+ check_in +
    '&check_out=' + check_out;    
  if (radius !== ''){
    requestString += '&radius=' + radius;
  }
  if (currency !== ''){
    requestString+='&currency=' + currency;
  }
  if (max_rate !== ''){
    requestString+='&max_rate=' + max_rate;
  }
  if (number_of_results !== ''){
    requestString += '&number_of_results=' + number_of_results;
  }
  else if (number_of_results === ''){
    requestString += '&number_of_results=10';
  }

  const amenityMass = amenity.split('&');
  if (amenityMass.length > 0 && amenity != '' ) { 
    for (var i = 0; i < amenityMass.length; i++) {
      requestString += '&amenity=' + amenityMass[i];
    }
  }
  

  return fetch(requestString, {
    method: 'GET',
  })  
}