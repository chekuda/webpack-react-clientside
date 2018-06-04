export const CHANGE_TEXT = 'app/CHANGE_TEXT'

export const changeText = (text) => {
  return {
    type: CHANGE_TEXT,
    payload: text
  }
}

const reducer = (state = {}, action = {}) => {
  switch (action.type) {
    case CHANGE_TEXT:
      const { text } = action.payload

      return {
        ...state,
        text
      }
    default:
      return state
  }
}

export default reducer
