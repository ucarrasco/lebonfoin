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

const defaultState = {
  items: [],
  navigation: undefined,
  showNavigation: false,
  activeQuery: "/ameublement/offres/languedoc_roussillon/herault/",
  queryInput: "/ameublement/offres/languedoc_roussillon/herault/",
  polling: false,
  itemsFetch: {
    fetching: false
  },
  pollingFrequencyMs: 3000
}

export default function(state = defaultState, action) {

  switch(action.type) {

    case ADD_ITEMS:
      return {
        ...state,
        items: [
          ...state.items,
          ..._(action.items).reject(({ remoteId: addedItemId }) => _(state.items).find(({ remoteId: existingItemId }) => addedItemId == existingItemId)).value()
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
        items: action.items
      }
  }

  return state
}