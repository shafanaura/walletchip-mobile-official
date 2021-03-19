import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SignIn,
  SignUp,
  CreatePin,
  ResetPassword,
  ForgotPassword,
} from '../screens';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="CreatePin" component={CreatePin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Router;
