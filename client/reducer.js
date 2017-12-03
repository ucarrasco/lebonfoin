import _ from 'lodash'

const defaultState = {
  items: [],
  navigation: undefined,
  showNavigation: false,
  activeQuery: "/ameublement/offres/languedoc_roussillon/herault/",
  queryInput: "/ameublement/offres/languedoc_roussillon/herault/",
  polling: false
}

export default function(state = defaultState, action) {

  if (action.type == 'ADD_ITEMS')
    return {
      ...state,
      items: [
        ...state.items,
        ..._(action.items).reject(({ remoteId: addedItemId }) => _(state.items).find(({ remoteId: existingItemId }) => addedItemId == existingItemId)).value()
      ]
    }
  
  if (action.type == 'UPDATE_QUERY_INPUT') {
    return {
      ...state,
      queryInput: action.text
    }
  }

  if (action.type == 'UPDATE_ACTIVE_QUERY') {
    return {
      ...state,
      items: [],
      activeQuery: action.text,
      queryInput: action.text
    }
  }

  if (action.type == 'TOGGLE_POLLING') {
    return {
      ...state,
      polling: !state.polling
    }
  }

  if (action.type == 'SET_NAVIGATION')
    return {
      ...state,
      navigation: action.navigation
    }

  if (action.type == 'TOGGLE_NAVIGATION_VISIBILITY')
    return {
      ...state,
      showNavigation: !state.showNavigation
    }

  return state
}