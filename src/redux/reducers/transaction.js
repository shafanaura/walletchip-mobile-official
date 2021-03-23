const initialState = {
  results: null,
  amountTransaction: null,
  history: null,
  receiver: null,
  confirmation: null,
  pageInfo: null,
  pageInfoTransaction: null,
  allTransaction: [],
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
    case 'TRANSACTION_HISTORY': {
      return {
        ...state,
        allTransaction: action.payload,
        pageInfoTransaction: action.pageInfo,
      };
    }
    case 'PAGING_GET_ALL_TRANSACTION': {
      const oldData = state.allTransaction;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        allTransaction: newData,
        pageInfoTransaction: action.pageInfo,
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
