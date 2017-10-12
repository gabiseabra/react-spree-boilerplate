export const LOAD = "address/states/LOAD"
export const REQUEST = "address/states/REQUEST"
export const SUCCESS = "address/states/SUCCESS"
export const FAILURE = "address/states/FAILURE"

export const load = country => ({ type: LOAD, country })
export const request = country => ({ type: REQUEST, country })
export const succeed = (country, data) => ({ type: SUCCESS, country, data })
export const fail = (country, error) => ({ type: FAILURE, country, error })

const initialState = {
  data: {},
  loading: false,
  error: undefined
}

export default function states(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        data: {
          ...state.data,
          [action.country]: action.data
        },
        loading: false,
        error: undefined
      }
    case FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
