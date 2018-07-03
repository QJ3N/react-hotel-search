import React, { PropTypes } from 'react';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { push } from 'react-router-redux';

import { 
    setNextPage,
    setPrevPage,
    setFirstPage,
    setLastPage,
    setPage,
    setNumberPages
  } from './actions';
import './style.css';

class HotelsPage extends React.Component { 

 static path = '/hotels';
 static propTypes = {
	  hotels: PropTypes.object.isRequired,
    hotelsInfo: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
	  dispatch: PropTypes.func.isRequired
 };

  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        numberOfPages: 0,
        lengthHotelsInfo: 0,
        perPage: 0,
        currentPage: 0
      }            
    }
  }
  componentWillReceiveProps(nextProps) {
    const { pagination } = nextProps.hotels;
    this.setState({ pagination });
    const { 
      currentPage,
      numberOfPages,
      perPage,
      lengthHotelsInfo
    } = pagination;

    const { 
     hotelsInfo,
    } = this.props;

    const page = this.state.pagination.currentPage;

    if(lengthHotelsInfo != hotelsInfo.length) {
      this.props.dispatch( setNumberPages(hotelsInfo.length) );
    }
    if (typeof pagination != 'undefined' && currentPage!=page) { 
      this.props.dispatch( push('/hotels?page='+currentPage) );
    }
  }
  changePage(page,e) {
    this.props.dispatch( setPage(page) );
  }
  changePageFirst(e) {        
    this.props.dispatch( setFirstPage() );
  }
  changePageLast(e) {
    this.props.dispatch( setLastPage() );
  }
  changePagePrev(e) {
    const { page} = this.props;
    this.props.dispatch( setPrevPage(page) ); 
  }
  changePageNext(e) {     
    const { page } = this.props;
    this.props.dispatch( setNextPage(page) ); 
  }
  render(){
      //pagination  
    const { hotelsInfo } = this.props;
    const { perPage, currentPage, numberOfPages  } = this.state.pagination;
    const startOffset = (currentPage - 1) * perPage;
    let startCount = 0;
    let items = [];
    for (let number = 1; number <= numberOfPages; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          onClick={this.changePage.bind(this,number)} 
          active={number === currentPage}>{number}
        </Pagination.Item>
      );
    }
    return(
      <div>
          <div className="container-fluid">
            { 
              hotelsInfo.map((hotel, index) => {
                if(index >= startOffset && startCount < perPage) {
                  let imgURL
                  if(hotel.images.length > 0)
                    imgURL = hotel.images[0].url;
                  else imgURL='./img/hotel.jpg';
                  startCount++;
                  return(
                    <div key={index} className='margin hotel'>
                      <div  className='row'>
                        <div className='col-md-6'>
                          <img src={imgURL} className="img-responsive" alt="Responsive image"/>  
                        </div>
                        <div className='col-md-6'>
                            <h4 className='text-center'>{ hotel.property_name } </h4>
                            <address>
                              Адрес: { hotel.address.line1 } <br/>
                              Телефон: { hotel.contacts[0].detail } <br/>
                              Удобства: { 
                                hotel.amenities.map((amenity,key2) => {                     
                                      return(
                                        hotel.amenities.length > key2+1 ?
                                        <span key={key2}>{amenity.description+', '}</span> :
                                        <span key={key2}>{amenity.description+'.'}</span>
                                      );                                                
                                })
                              }
                            </address> 
                            <strong>Доступные номера:</strong><br/> 
                            { 
                              hotel.rooms.map((room, key3) => {  
                                let booking_code, room_type, number_of_beds, total_amount, day_amount;                                                           
                                booking_code = 'Код бронировки: ' + room.booking_code;
                                day_amount = 'Цена за день: ' + room.rates[0].price + ' ' + room.rates[0].currency_code;
                                total_amount = 'Цена за все время: ' + room.total_amount.amount + ' ' + room.total_amount.currency;
                                if(room.room_type_info.room_type)
                                  room_type = 'Тип комнаты: ' +  room.room_type_info.room_type
                                if(room.room_type_info.number_of_beds)
                                  number_of_beds = 'Кол. кроватей: ' + room.room_type_info.number_of_beds;
                                return(                                                
                                  <p key={key3}>
                                    { booking_code } <br/>
                                    { day_amount } <br/>
                                    { total_amount }<br/>                                        
                                    {  room_type ? <span>{room_type} <br/></span> : ''}
                                    { number_of_beds ? <span>{number_of_beds}<br/></span>: '' }
                                  </p>                                                                      
                                );
                              })
                            }                        
                        </div>                 
                      </div>
                    </div>
                  );
                }
              })
            }
            <a href='/'><button className="margin btn btn-primary" >Назад</button></a>        
          </div>
          <div className="text-center">
              <Pagination bsSize='medium'>
                <Pagination.First onClick={this.changePageFirst.bind(this)}/>
                <Pagination.Prev onClick={this.changePagePrev.bind(this)}/>
                {items}
                <Pagination.Next onClick={this.changePageNext.bind(this)}/>
                <Pagination.Last onClick={this.changePageLast.bind(this)}/>
              </Pagination>
          </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    hotels: state.hotels,
    hotelsInfo: state.home.hotelsInfo,
    page: Number(state.routing.locationBeforeTransitions.query.page) || 1
  };
}

export default connect(mapStateToProps)(HotelsPage);