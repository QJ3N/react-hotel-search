import { 
	SET_NEXT_PAGE,
	SET_PREV_PAGE,
	SET_FIRST_PAGE,
	SET_LAST_PAGE,
	SET_PAGE,
	SET_NUMBER_PAGES
} from './actions';

const initialState= {
	pagination: {
		numberOfPages:0,
        lengthHotelsInfo:0,
        perPage: 10,
        currentPage:1
	}
}
function hotelsReducer(state = initialState, action) {
	const { page, lengthHotelsInfo } = action;
	const { numberOfPages, perPage } = state.pagination;

	switch (action.type) {
		case SET_NEXT_PAGE:
			const nextPage = page+1;  
			if(numberOfPages >= nextPage){
        return Object.assign({}, state, { 
					pagination: {
						...state.pagination,
						currentPage:nextPage
					}
				});
      }
      else return state;      
		case SET_PREV_PAGE:             
      const prevPage = page-1;
      if(numberOfPages-prevPage > 0){
        return Object.assign({}, state, { 
					pagination: {
						...state.pagination,
						currentPage:prevPage
					}
				});
      }
      else return state;
		case SET_FIRST_PAGE:       
			return Object.assign({}, state, { 
				pagination: {
					...state.pagination,
					currentPage:1
				}
			});
		case SET_LAST_PAGE:
			return Object.assign({}, state, { 
				pagination: {
					...state.pagination,
					currentPage:numberOfPages
				}
			});
		case SET_PAGE:
			return Object.assign({}, state, { 
				pagination: {
					...state.pagination,
					currentPage:action.page
				}
			});
		case SET_NUMBER_PAGES:
			let newNumberOfPages = Math.ceil(lengthHotelsInfo / perPage);
			return Object.assign({}, state, { 
				pagination: {
					...state.pagination,
					numberOfPages:newNumberOfPages,
					lengthHotelsInfo
				}
			});
		 default:
			 return state;
	}
}


const HotelsReducer = {
    hotels: hotelsReducer
};

export default HotelsReducer;
