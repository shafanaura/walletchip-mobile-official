import http from '../../helpers/http';

export const getUser = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
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
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message,
      });
    }
  };
};

export const getReceiverData = (token, id) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: '',
      });
      const response = await http(token).get(`api/receiver/${id}`);
      dispatch({
        type: 'GET_RECEIVER_DETAIL',
        payload: response.data.results,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
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
    if (data.date) {
      params.append('date', data.date);
    }
    if (data.note) {
      params.append('note', data.note);
    }
    if (data.pin) {
      params.append('pin', data.pin);
    }
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: '',
      });
      dispatch({
        type: 'CREATE_TRANSFER_DATA',
        payload: data,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message,
      });
    }
  };
};

export const transfer = (token, data) => {
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
        type: 'SET_TRANSACTION_MESSAGE',
        payload: '',
      });
      const response = await http(token).post('api/transfer', params);
      dispatch({
        type: 'CREATE_TRANSFER',
        payload: response.data.message,
      });
    } catch (err) {
      const {message} = err.response.data;
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: message,
      });
    }
  };
};

export const selectReceiver = receiver => ({
  type: 'SELECT_RECEIVER',
  payload: receiver,
});

export const confirmation = value => ({
  type: 'CONFIRMATION',
  payload: value,
});

export const clearTransaction = () => ({
  type: 'CLEAR_TRANSACTION',
});
