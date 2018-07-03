
export const SET_NEXT_PAGE = 'SET_NEXT_PAGE';
export function setNextPage(page) {
	return {
		type: SET_NEXT_PAGE,
    page
	};
}

export const SET_PREV_PAGE = 'SET_PREV_PAGE';
export function setPrevPage(page) {
  return {
    type: SET_PREV_PAGE,
    page
  };
}

export const SET_FIRST_PAGE = 'SET_FIRST_PAGE';
export function setFirstPage() {
  return {
    type: SET_FIRST_PAGE
  };
}

export const SET_LAST_PAGE = 'SET_LAST_PAGE';
export function setLastPage() {
  return {
    type: SET_LAST_PAGE
  };
}

export const SET_PAGE = 'SET_PAGE';
export function setPage(page) {
    return {
      type: SET_PAGE,
      page
    };
}

export const SET_NUMBER_PAGES = 'SET_NUMBER_PAGES';
export function setNumberPages(lengthHotelsInfo) {
  return {
    type: SET_NUMBER_PAGES,
    lengthHotelsInfo
  };
}
