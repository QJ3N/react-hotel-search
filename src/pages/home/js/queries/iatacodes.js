export function getQuerySearchIATACode(city, airport)
{
    let requestString = 
        'https://api.havail.sabre.com/v1/lists/supported/cities/NYC/airports';
       
    let options = {
        method: 'GET',
        Access_token : 'ejg1c242cXdhbmtmNTdkdz09OkdFMEk2bnl5PQ'
    } ;
    return fetch(requestString, options)  ;
}