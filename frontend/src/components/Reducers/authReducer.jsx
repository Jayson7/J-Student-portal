import { ServerRouter } from "react-router-dom";

const initialState = {
  id: null,
  name: "",
  email: "",
  avatar: "",
  role: "",
  country: "",
  phone_number: "",
  preferences: {
    theme: "light",
    lang: "en",
  },
  loading: false,
  error: null,
};

export const USER_REQUEST = "user/REQUEST";
export const USER_SUCCESS = "user/SUCCESS";

export const USER_FAIL = "user/FAIL";

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload, // merge profile from API
      };

    case USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: USER_REQUEST });
  try {
    const res = await ServerRouter.get(`/users/${id}`); // your axios/fetch wrapper
    dispatch({ type: USER_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: USER_FAIL, payload: e.message });
  }
};
