const initialState = {
  token: null,
  errorMsg: null,
  email: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: null,
        errorMsg: '',
      };
    }
    case 'SET_AUTH_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload,
      };
    }
    case 'EMAIL_FORGOT_PASSWORD': {
      return {
        ...state,
        email: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default authReducer;
