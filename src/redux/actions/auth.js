import http from '../../helpers/http';
import jwt from 'jwt-decode';

export const login = (email, password) => {
  return async dispatch => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    try {
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: '',
      });
      const response = await http().post('api/auth/login', params);
      const token = response.data.results.token;
      const user = jwt(token);
      dispatch({
        type: 'LOGIN',
        payload: token,
        user: user,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_AUTH_MESSAGE',
        payload: message,
      });
    }
  };
};

export const setEmailForgotPassword = email => {
  return async dispatch => {
    dispatch({
      type: 'EMAIL_FORGOT_PASSWORD',
      payload: email,
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT',
});
