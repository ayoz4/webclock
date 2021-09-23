import { GET_TIMEZONES_SUCCESS } from "../../constants/redux";

const timezones = (state = [], action) => {
  switch (action.type) {
    case GET_TIMEZONES_SUCCESS:
      return action.data;

    default:
      return state;
  }
};

export default timezones;
