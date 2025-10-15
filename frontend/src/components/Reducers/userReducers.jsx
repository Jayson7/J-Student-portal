// userSlice.js
// One-file, production-ready user reducer (classic Redux, no Toolkit)
// Handles profile fetch, partial update, reset, loading & error flags.
import ServiceApi from "../services/service";

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
  token: "",
  loading: false,
  error: null,
};

/* ===== action types ===================================================== */
export const USER_REQUEST = "user/REQUEST";
export const USER_SUCCESS = "user/SUCCESS";
export const USER_UPDATE = "user/UPDATE";
export const USER_FAIL = "user/FAIL";
export const USER_RESET = "user/RESET";

/* ===== reducer ========================================================== */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true, error: null };

    case USER_SUCCESS:
      return { ...state, loading: false, ...action.payload };

    case USER_UPDATE: // shallow merge allows partial update
      return { ...state, ...action.payload };

    case USER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_RESET:
      return initialState;

    default:
      return state;
  }
}

/* ===== action creators ================================================== */
// tiny axios singleton so this file stays self-contained

export const fetchUser = (id) => async (dispatch) => {
  dispatch({ type: USER_REQUEST });
  try {
    const { data } = await ServiceApi.get(`/users/${id}`);
    dispatch({ type: USER_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: USER_FAIL, payload: e.message || "Fetch failed" });
  }
};

export const updateUser = (changes) => ({
  type: USER_UPDATE,
  payload: changes,
});
export const clearUser = () => ({ type: USER_RESET });
