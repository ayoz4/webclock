import axios from "axios";
import { GET_TIMEZONES_SUCCESS } from "../../constants/redux";

export const getTimezones = () => async (dispatch) => {
  try {
    const msg = await axios({
      method: "GET",
      url: "http://localhost:8000/timezones",
    });

    dispatch({ type: GET_TIMEZONES_SUCCESS, data: msg.data });

    return msg.data;
  } catch (error) {
    throw error;
  }
};
