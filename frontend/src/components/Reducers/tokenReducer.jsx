// tokenReducer.js
import ServiceApi from "../services/service";

/* 1.  initial state ----------------------------------------------------- */
const initialState = {
  token: null,
  refresh: null,
  loading: false,
  error: null,
};

/* 2.  action types ------------------------------------------------------ */
export const TOKEN_REQUEST = "token/REQUEST";
export const TOKEN_SUCCESS = "token/SUCCESS";
export const TOKEN_UPDATE = "token/UPDATE";
export const TOKEN_FAIL = "token/FAIL";
export const TOKEN_RESET = "token/RESET";
export const LOGOUT_REQUEST = "token/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "token/LOGOUT_SUCCESS";

/* 3.  reducer ----------------------------------------------------------- */
export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_REQUEST:
      return { ...state, loading: true, error: null };

    case TOKEN_SUCCESS: {
      const { access, refresh } = action.payload;
      return { ...state, loading: false, token: access, refresh };
    }

    case TOKEN_UPDATE:
      return { ...state, ...action.payload };

    case TOKEN_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LOGOUT_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGOUT_SUCCESS:
    case TOKEN_RESET:
      return initialState;

    default:
      return state;
  }
}

/* 4.  action creators --------------------------------------------------- */
export const fetchToken = (credentials) => async (dispatch) => {
  dispatch({ type: TOKEN_REQUEST });
  try {
    const { data } = await ServiceApi.post("/auth/login", credentials);
    dispatch({ type: TOKEN_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: TOKEN_FAIL, payload: e.message || "Login failed" });
  }
};

export const updateToken = (changes) => ({
  type: TOKEN_UPDATE,
  payload: changes,
});
export const clearToken = () => ({ type: TOKEN_RESET });

/* 5.  logout – single dispatch clears everything ------------------------ */
export const logout = () => async (dispatch, getState) => {
  const refreshToken = getState().token.refresh; // <-- refresh, not access
  if (refreshToken) {
    try {
      await ServiceApi.post("/auth/logout", { refresh: refreshToken });
    } catch (e) {
      // silent – refresh may already be black-listed or expired
    }
  }
  dispatch({ type: LOGOUT_SUCCESS });
  const { persistor } = await import("../Storage/store");
  persistor.purge();
};
