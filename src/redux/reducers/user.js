const initialState = {
  results: null,
  message: '',
  errorMsg: null,
  allContact: [],
  quickAccessContact: [],
  pageInfoContact: null,
  pageInfoQA: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER': {
      return {
        ...state,
        results: action.payload,
      };
    }
    case 'UPDATE_PERSONAL_INFO': {
      return {
        ...state,
        results: {
          ...state.results,
          ...action.payload,
        },
        message: action.message,
      };
    }
    case 'UPDATE_PASSWORD': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'UPDATE_PIN': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'COMPARE_PIN': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'GET_ALL_CONTACT': {
      return {
        ...state,
        allContact: action.payload,
        pageInfoContact: action.pageInfo,
      };
    }
    case 'PAGING_GET_ALL_CONTACT': {
      const oldData = state.allContact;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        allContact: newData,
        pageInfoContact: action.pageInfo,
      };
    }
    case 'GET_CONTACT_QUICK_ACCESS': {
      return {
        ...state,
        quickAccessContact: action.payload,
        pageInfoQA: action.pageInfo,
      };
    }
    case 'PAGING_GET_CONTACT_QUICK_ACCESS': {
      const oldData = state.quickAccessContact;
      const newData = [...oldData, ...action.payload];
      return {
        ...state,
        quickAccessContact: newData,
        pageInfoQA: action.pageInfo,
      };
    }
    case 'SET_USER_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
        message: '',
      };
    }
    case 'UPDATE_PHONE': {
      return {
        ...state,
        results: {
          ...state.results,
          ...action.payload,
        },
        message: action.message,
      };
    }
    case 'UPDATE_PICTURE': {
      return {
        ...state,
        results: {
          ...state.results,
          picture: action.payload,
        },
        message: action.message,
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
