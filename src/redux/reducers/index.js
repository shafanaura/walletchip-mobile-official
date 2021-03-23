import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

// Import All Reducer
import authReducer from './auth';
import userReducer from './user';
import transactionReducer from './transaction';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['auth', 'user', 'transaction'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const transactionPersistConfig = {
  key: 'transaction',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, userReducer),
  transaction: persistReducer(transactionPersistConfig, transactionReducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
