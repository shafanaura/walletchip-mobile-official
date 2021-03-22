const initialState = {
  token: null,
  errorMsg: null,
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
        token: action.token,
        errorMsg: action.errorMsg,
      };
    }
    case 'SET_AUTH_MESSAGE': {
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

export default authReducer;
