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

export const transfer = (
  token,
  receiverId,
  amount,
  transactionDate,
  note,
  pin,
) => {
  return async dispatch => {
    const params = new URLSearchParams();
    params.append('receiverId', receiverId);
    params.append('amount', amount);
    params.append('transactionDate', transactionDate);
    params.append('note', note);
    params.append('pin', pin);
    const data = {receiverId, amount, transactionDate, note, pin};
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: '',
      });
      const response = await http(token).post('api/transfer', data);
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

export const transactionHistory = token => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_TRANSACTION_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('api/transaction-history');
      dispatch({
        type: 'TRANSACTION_HISTORY',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
        message: response.data.message,
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

export const pagingGetTransaction = (token, page) => {
  return async dispatch => {
    try {
      dispatch({
        type: 'SET_USER_MESSAGE',
        payload: '',
      });
      const response = await http(token).get('api/transaction-history?page=2');
      dispatch({
        type: 'PAGING_GET_ALL_TRANSACTION',
        payload: response.data.results,
        pageInfo: response.data.pageInfo,
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
