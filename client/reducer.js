import _ from 'lodash'

const defaultState = {
  activeQuery: "/ameublement/offres/languedoc_roussillon/herault/",
  queryInput: "/ameublement/offres/languedoc_roussillon/herault/",
  items: []
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
      activeQuery: action.text
    }
  }

  return state
}