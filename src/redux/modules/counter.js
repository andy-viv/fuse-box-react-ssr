const COUNTER_UP = 'COUNTER_UP'
const COUNTER_DOWN = 'COUNTER_DOWN'

const initialState = {
  count: 0
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case COUNTER_UP:
      return {
        ...state,
        count: state.count + 1
      }
    case COUNTER_DOWN:
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

export function up () {
  return {
    type: COUNTER_UP
  }
}

export function down () {
  return {
    type: COUNTER_DOWN
  }
}
