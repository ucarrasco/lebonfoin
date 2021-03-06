import _ from 'lodash'
import {
  ADD_ITEMS,
  UPDATE_QUERY_INPUT,
  UPDATE_ACTIVE_QUERY,
  TOGGLE_POLLING,
  SET_NAVIGATION,
  TOGGLE_NAVIGATION_VISIBILITY,
  START_FETCHING_ITEMS,
  END_FETCHING_ITEMS,
  SET_ITEMS
} from './actionCreators'

import defaultState from './defaultState'

export default function(state = defaultState, action) {

  switch(action.type) {

    case ADD_ITEMS:
      return {
        ...state,
        items: [
          ..._(action.items).reject(({ remoteId: addedItemId }) => _(state.items).find(({ remoteId: existingItemId }) => addedItemId == existingItemId)).sortBy(item => 0-item.date).value(),
          ...state.items
        ]
      }
    
    case UPDATE_QUERY_INPUT: {
      return {
        ...state,
        queryInput: action.text
      }
    }

    case UPDATE_ACTIVE_QUERY: {
      return {
        ...state,
        items: [],
        activeQuery: action.text,
        queryInput: action.text
      }
    }

    case TOGGLE_POLLING: {
      return {
        ...state,
        polling: !state.polling
      }
    }

    case SET_NAVIGATION:
      return {
        ...state,
        navigation: action.navigation
      }

    case TOGGLE_NAVIGATION_VISIBILITY:
      return {
        ...state,
        showNavigation: !state.showNavigation
      }

    case START_FETCHING_ITEMS:
      return {
        ...state,
        itemsFetch: {
          ...state.itemsFetch,
          fetching: true
        }
      }

    case END_FETCHING_ITEMS:
      // success is stored in action.success, not used for now
      return {
        ...state,
        itemsFetch: {
          ...state.itemsFetch,
          fetching: false
        }
      }

    case SET_ITEMS:
      return {
        ...state,
        items: _(action.items).sortBy(item => 0-item.date).value()
      }
  }

  return state
}