export const INCREMENT = "counter/INCREMENT"
export const DECREMENT = "counter/DECREMENT"
export const INCREMENT_ASYNC = "counter/INCREMENT_ASYNC"
export const DECREMENT_ASYNC = "counter/DECREMENT_ASYNC"

export const increment = sync => ({ type: INCREMENT, sync })
export const decrement = sync => ({ type: DECREMENT, sync })
export const incrementAsync = () => ({ type: INCREMENT_ASYNC })
export const decrementAsync = () => ({ type: DECREMENT_ASYNC })

const initialState = {
  count: 0,
  synched: true
}

export default function counter(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return {
        count: state.count + 1,
        synched: action.sync === true || state.synched
      }
    case DECREMENT:
      return {
        count: state.count - 1,
        synched: action.sync === true || state.synched
      }
    case INCREMENT_ASYNC:
    case DECREMENT_ASYNC:
      return {
        ...state,
        synched: false
      }
    default:
      return state
  }
}
