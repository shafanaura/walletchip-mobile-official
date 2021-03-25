import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';

import linking from './src/router/linking';

import persistedStore from './src/redux/store';
import {Root} from './src/screens';

const App = () => {
  const {persistor, store} = persistedStore();

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer linking={linking}>
          <Root>
            <Router />
          </Root>
          <FlashMessage position="top" duration={3000} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
