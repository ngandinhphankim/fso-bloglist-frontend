import { RESET_NOTI, SET_NOTI } from "./actionTypes"

export const setNoti = ({ message, isError }) => {
    return {
        type: SET_NOTI,
        payload: { message, isError }
    }
}

export const resetNoti = () => {
    return { type: RESET_NOTI }
}