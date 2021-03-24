import http from '../../helpers/http';

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
      dispatch({
        type: 'LOGIN',
        payload: response.data.results.token,
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
