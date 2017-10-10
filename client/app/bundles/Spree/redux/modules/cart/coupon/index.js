export const APPLY = "cart/coupon/APPLY"
export const REQUEST = "cart/coupon/REQUEST"
export const SUCCESS = "cart/coupon/SUCCESS"
export const FAILURE = "cart/coupon/FAILURE"

export const apply = code => ({ type: APPLY, code })
export const request = () => ({ type: REQUEST })
export const succeed = () => ({ type: SUCCESS })
export const fail = error => ({ type: FAILURE, error })

const initialState = {
  message: undefined,
  loading: false,
  error: undefined
}

export default function coupon(state = initialState, action) {
  switch(action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        loading: false,
        error: undefined
      }
    case FAILURE:
      return {
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
