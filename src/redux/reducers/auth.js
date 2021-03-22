const initialState = {
  token: null,
  errorMsg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        token: action.token,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        token: action.token,
        errorMsg: action.errorMsg,
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
