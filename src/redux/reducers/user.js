const initialState = {
  results: null,
  errorMsg: null,
  allContact: [],
  quickAccessContact: [],
  receiverDetail: {},
  transferData: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER': {
      return {
        ...state,
        results: action.payload,
      };
    }
    case 'GET_ALL_CONTACT': {
      return {
        ...state,
        allContact: action.payload,
      };
    }
    case 'GET_CONTACT_QUICK_ACCESS': {
      return {
        ...state,
        quickAccessContact: action.payload,
        message: action.message,
      };
    }
    case 'GET_RECEIVER_DETAIL': {
      return {
        ...state,
        receiverDetail: action.payload,
      };
    }
    case 'CREATE_TRANSFER_DATA': {
      return {
        ...state,
        transferData: action.payload,
      };
    }
    case 'CREATE_TRANSFER': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'SET_USER_MESSAGE': {
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

export default userReducer;
