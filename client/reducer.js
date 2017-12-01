import _ from 'lodash'

export default function(state = { items: [] }, action) {

  if (action.type == 'ADD_ITEMS') {
    let newTab = [
      ...state.items,
      ..._(action.items).reject(({ remoteId: addedItemId }) => _(state.items).find(({ remoteId: existingItemId }) => addedItemId == existingItemId)).value()
    ]

    return {
      ...state,
      items: [
        ...state.items,
        ..._(action.items).reject(({ remoteId: addedItemId }) => _(state.items).find(({ remoteId: existingItemId }) => addedItemId == existingItemId)).value()
      ]
    }
  }

  return state
}