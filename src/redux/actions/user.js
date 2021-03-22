import http from '../../helpers/http';

export const getUser = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('api/dashboard/profile');
      dispatch({
        type: 'GET_USER',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const updatePersonalInfo = (token, data) => {
  return async dispatch => {
    const params = new URLSearchParams();
    if (data.first_name) {
      params.append('first_name', data.first_name);
    }
    if (data.last_name) {
      params.append('last_name', data.last_name);
    }
    if (data.email) {
      params.append('email', data.email);
    }
    if (data.balance) {
      params.append('balance', data.balance);
    }
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
        message: '',
      });
      const response = await http(token).patch(
        'api/dashboard/update-profile',
        params,
      );
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: response.data.results,
        message: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
        message: '',
      });
    }
  };
};

export const updatePassword = (token, id, currentPassword, newPassword) => {
  return async dispatch => {
    const params = new URLSearchParams();
    params.append('currentPassword', currentPassword);
    params.append('newPassword', newPassword);
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
        message: '',
      });
      const response = await http(token).patch(
        `api/user/password/${id}`,
        params,
      );
      dispatch({
        type: 'UPDATE_PASSWORD',
        payload: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
        message: '',
      });
    }
  };
};

export const updatePin = (token, pin) => {
  return async dispatch => {
    const params = new URLSearchParams();
    params.append('pin', pin);
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
        message: '',
      });
      const response = await http(token).patch('api/auth/pin', params);
      dispatch({
        type: 'UPDATE_PIN',
        payload: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
        message: '',
      });
    }
  };
};

export const comparePin = (token, pin, id) => {
  return async dispatch => {
    const params = new URLSearchParams();
    params.append('pin', pin);
    params.append('id', id);
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
        message: '',
      });
      const response = await http(token).post('api/auth/currentPin', params);
      dispatch({
        type: 'COMPARE_PIN',
        payload: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
        message: '',
      });
    }
  };
};

export const getContact = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('api/user');
      dispatch({
        type: 'GET_ALL_CONTACT',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const getContactQuickAccess = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('api/user/quick-access');
      dispatch({
        type: 'GET_CONTACT_QUICK_ACCESS',
        payload: response.data.results,
        message: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const getReceiverData = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const response = await http(token).get(`api/receiver/${id}`);
      dispatch({
        type: 'GET_RECEIVER_DETAIL',
        payload: response.data.results,
        message: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const createTransferData = data => {
  return async dispatch => {
    const params = new URLSearchParams();
    if (data.receiverId) {
      params.append('receiverId', data.receiverId);
    }
    if (data.amount) {
      params.append('amount', data.amount);
    }
    if (data.transactionDate) {
      params.append('transactionDate', data.transactionDate);
    }
    if (data.note) {
      params.append('note', data.note);
    }
    if (data.pin) {
      params.append('pin', data.pin);
    }
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      dispatch({
        type: 'CREATE_TRANSFER_DATA',
        payload: data,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};

export const createTransfer = (token, data) => {
  return async dispatch => {
    const params = new URLSearchParams();
    if (data.receiverId) {
      params.append('receiverId', data.receiverId);
    }
    if (data.amount) {
      params.append('amount', data.amount);
    }
    if (data.transactionDate) {
      params.append('transactionDate', data.transactionDate);
    }
    if (data.note) {
      params.append('note', data.note);
    }
    if (data.pin) {
      params.append('pin', data.pin);
    }
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('api/transfer', params);
      dispatch({
        type: 'CREATE_TRANSFER',
        payload: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: message,
      });
    }
  };
};
