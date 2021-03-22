const initialState = {
  results: null,
  message: '',
  errorMsg: null,
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
    case 'SET_USER_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
        message: '',
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
