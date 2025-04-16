// User action types
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';

// Action creators
export const logout = () => ({
  type: USER_LOGOUT
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token
}); 