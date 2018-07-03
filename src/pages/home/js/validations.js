export function iataIsValid(iata, formIsValid){

  if(iata.value === '') {
    formIsValid = false;
    iata = { value: '', error:'Заполните поле' };
  }

  return { formIsValid, iata };
}

export function radiusIsValid(radiusOfArea, formIsValid){
  //radius
  if(Number(radiusOfArea.value) < 0) {
    formIsValid = false
    radiusOfArea = {value: '', error:'Радиус не может быть меньше нуля' };
  }

  return { radiusOfArea, formIsValid };
}

export function inTimeIsValid(checkInTime, formIsValid, currDate, dateInTime, dateInTimeMass){
  //radius
  let validDays = ((currDate - dateInTime)/1000/60/60/24);
  if(checkInTime.value === ''){
      formIsValid = false
      checkInTime = {value: '', error:'Заполните поле' };
  } else if(dateInTimeMass.length !== 3) {
      formIsValid = false
      checkInTime = {value: '', error:'Неверная запись' };
  } else if (validDays > 1){
      formIsValid = false
      checkInTime = {value: '', error:'Старая дата, запишите правельно' };
  }
  return { checkInTime, formIsValid };
}

export function outTimeIsValid(checkOutTime, formIsValid, dateOutTime, dateInTime, dateOutTimeMass){
  //radius
  let validDays = ((dateOutTime - dateInTime)/1000/60/60/24);
  if(checkOutTime.value === ''){
    formIsValid = false
    checkOutTime = {value: '', error:'Заполните поле' };
  } else if(dateOutTimeMass.length !== 3) {
    formIsValid = false
    checkOutTime = {value: '', error:'Неверная запись' };
  } else if(validDays < 0) {
    formIsValid = false
    checkOutTime = {value: '', error:'Дата прибытия раньше отправки' };
  }
  return { checkOutTime, formIsValid };
}

export function numberOfHotelsIsValid(numberOfHotels, formIsValid){
  //number of hotels
  if(numberOfHotels.value < 0){
    formIsValid = false
    numberOfHotels = {value: '', error:'Число отелей не может быть меньше нуля' };          
  }

  return { numberOfHotels, formIsValid };
}
export function maxCostIsValid(maxCost, formIsValid){
  //max cost
  if(maxCost.value < 0){
    formIsValid = false
    maxCost = {value: '', error:'Стоимость не может быть отрецательной' };       
  }

  return { maxCost, formIsValid };
}

export function currencyIsValid(status, currency, formIsValid){
  if(status){
    formIsValid = false
    currency = {value: '', error:'Введите валюту коректно!' };       
  }
  
  return { currency, formIsValid };
}