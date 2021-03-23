const initialState = {
  results: null,
  amountTransaction: null,
  history: null,
  receiver: null,
  confirmation: null,
  pageInfo: null,
  // today
  pageInfoTransactionToday: null,
  todayTransaction: [],
  // week
  pageInfoTransactionWeek: null,
  weekTransaction: [],
  // month
  pageInfoTransactionMonth: null,
  monthTransaction: [],
  errorMsg: '',
  message: '',
  receiverDetail: null,
  transferData: [],
  receiverData: {},
  data: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RECEIVER_DETAIL': {
      return {
        ...state,
        receiverData: action.payload,
      };
    }
    case 'CREATE_TRANSFER_DATA': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'CREATE_TRANSFER': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'TRANSACTION_HISTORY_TODAY': {
      return {
        ...state,
        todayTransaction: action.payload,
        pageInfoTransactionToday: action.pageInfo,
      };
    }
    case 'PAGING_GET_ALL_TRANSACTION_TODAY': {
      const oldData = state.todayTransaction;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        todayTransaction: newData,
        pageInfoTransactionToday: action.pageInfo,
      };
    }
    case 'TRANSACTION_HISTORY_WEEK': {
      return {
        ...state,
        weekTransaction: action.payload,
        pageInfoTransactionWeek: action.pageInfo,
      };
    }
    case 'PAGING_GET_ALL_TRANSACTION_WEEK': {
      const oldData = state.weekTransaction;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        weekTransaction: newData,
        pageInfoTransactionWeek: action.pageInfo,
      };
    }
    case 'TRANSACTION_HISTORY_MONTH': {
      return {
        ...state,
        monthTransaction: action.payload,
        pageInfoTransactionMonth: action.pageInfo,
      };
    }
    case 'PAGING_GET_ALL_TRANSACTION_MONTH': {
      const oldData = state.monthTransaction;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        monthTransaction: newData,
        pageInfoTransactionMonth: action.pageInfo,
      };
    }
    case 'SELECT_RECEIVER': {
      return {
        ...state,
        receiver: action.payload,
      };
    }
    case 'CONFIRMATION': {
      return {
        ...state,
        confirmation: action.payload,
      };
    }
    case 'CLEAR_TRANSACTION': {
      return {
        ...state,
        results: null,
        amountTransaction: null,
        history: null,
        receiver: null,
        confirmation: null,
        pageInfo: null,
        errorMsg: '',
      };
    }
    case 'SET_TRANSACTION_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default transactionReducer;
