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
