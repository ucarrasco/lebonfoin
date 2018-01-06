// reading from global scope as the value would be injected in html by backend
const queryFromServer = (typeof query !== 'undefined') && query

const queryFromCurrentUrl = (typeof window !== 'undefined') && window.location.pathname
const defaultArbitraryQuery = "/ameublement/offres/languedoc_roussillon/herault/"

let initialQueryToUse = queryFromServer || queryFromCurrentUrl || defaultArbitraryQuery

export default {
  items: [],
  navigation: undefined,
  showNavigation: false,
  activeQuery: initialQueryToUse,
  queryInput: initialQueryToUse,
  polling: false,
  itemsFetch: {
    fetching: false
  },
  pollingFrequencyMs: 3000
}