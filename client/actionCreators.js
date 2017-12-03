import request from 'request-promise-native'

export const ADD_ITEMS = 'ADD_ITEMS'
export const UPDATE_QUERY_INPUT = 'UPDATE_QUERY_INPUT'
export const UPDATE_ACTIVE_QUERY = 'UPDATE_ACTIVE_QUERY'
export const TOGGLE_POLLING = 'TOGGLE_POLLING'
export const SET_NAVIGATION = 'SET_NAVIGATION'
export const TOGGLE_NAVIGATION_VISIBILITY = 'TOGGLE_NAVIGATION_VISIBILITY'
export const FETCH_ITEMS = 'FETCH_ITEMS'
export const START_FETCHING_ITEMS = 'START_FETCHING_ITEMS'
export const END_FETCHING_ITEMS = 'END_FETCHING_ITEMS'
export const SET_ITEMS = 'SET_ITEMS'


export const updateQueryInput = text => ({ type: UPDATE_QUERY_INPUT, text })
export const togglePolling = _ => ({ type: TOGGLE_POLLING })
export const setNavigation = navigation => ({ type: SET_NAVIGATION, navigation })
export const toggleNavigationVisibility = _ => ({ type: TOGGLE_NAVIGATION_VISIBILITY })
export const startFetchingItems = _ => ({ type: START_FETCHING_ITEMS })
export const endFetchingItems = success => ({ type: END_FETCHING_ITEMS, success })
export const setItems = items => ({ type: SET_ITEMS, items })
export const addItems = items => ({ type: ADD_ITEMS, items })
export const updateActiveQuery = newQuery => ({ type: UPDATE_ACTIVE_QUERY, text: newQuery })

export const loadNewItems = _ => (dispatch, getState) => {
  let query = getState().activeQuery
  dispatch(startFetchingItems())
  return request(`${backendHost}${query}`)
    .then(
      res => {
        dispatch(endFetchingItems(true))
        dispatch(addItems(JSON.parse(res)))

        if (getState().polling)
          setTimeout(
            _ => {
              dispatch(loadNewItems(query))
            }, getState().pollingFrequencyMs
          )
      },
      err => {
        dispatch(endFetchingItems(false))
      }
    )
}

export const fetchItems = query => (dispatch, getState) => {
  let query = query || getState().activeQuery
  dispatch(startFetchingItems())
  return request(`${backendHost}${query}`)
    .then(
      res => {
        dispatch(endFetchingItems(true))
        dispatch(setItems(JSON.parse(res)))
        
        if (getState().polling)
          setTimeout(
            _ => {
              dispatch(loadNewItems(query))
            }, getState().pollingFrequencyMs
          )
      },
      err => {
        dispatch(endFetchingItems(false))
      }
    )
}

export const submitNewQuery = newQuery => (dispatch, getState) => {
  dispatch(updateActiveQuery(newQuery))
  return dispatch(fetchItems(newQuery))
}