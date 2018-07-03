import { getQuerySearchHotels } from './js/queries/amadeus_hotels';
import { getCurrency } from './js/queries/currency';

export const CHECK_VALIDATION_FORM = 'CHECK_VALIDATION_FORM';
export function checkValidationFrom(validationForm) {
  const { currency } = validationForm;
  if(currency.value == ''){
    return {
      type: CHECK_VALIDATION_FORM,
      validationForm
    };
  }
  else return (dispatch) => {
    getCurrency(currency.value.toLowerCase())
      .then(res => res.json())
      .then(queryCurrencyResult => {
        const { status } = queryCurrencyResult
        dispatch( {
          type: CHECK_VALIDATION_FORM,
          status,
          validationForm
        });
      })
      .catch (function (error) {
        console.log('Request failed', error);
      });
  }
}

export const SET_HOTEL_INFO = 'SET_HOTEL_INFO';
export function setHotelsInfo(api_key, iata, checkInTime, checkOutTime, numberOfHotels, radius, currency, max_rate, amenity) {
  return (dispatch) => {
    getQuerySearchHotels(
      api_key,
      iata,
      checkInTime,
      checkOutTime,
      numberOfHotels,
      radius,
      currency,
      max_rate,
      amenity
    )
      .then(res => res.json())
      .then(hotelsInfo => {
        dispatch( {
          type: SET_HOTEL_INFO,
          hotelsInfo
        });
      })
      .catch (function (error) {
        console.log('Request failed', error);
      });
  }
}
