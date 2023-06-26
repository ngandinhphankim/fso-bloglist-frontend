import { SET_NOTI, RESET_NOTI } from "../actionTypes";

const initialState = {
  message: null,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NOTI: {
      const { message, isError } = action.payload;
      return {
        ...state,
        message,
        isError
      }
    }
    case RESET_NOTI: {
      return {
        ...state,
        ...initialState
      };
    }
    default:
      return state;
  }
}