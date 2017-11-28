export default function(state = { items: [] }, action) {

  if (action.type == 'ADD_ITEMS') {
    return {
      ...state,
      items: [
        ...state.items,
        ...action.items
      ]
    }
  }

  return state
}