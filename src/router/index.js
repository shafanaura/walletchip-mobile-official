import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SignIn,
  SignUp,
  CreatePin,
  ResetPassword,
  ForgotPassword,
  HomePage,
} from '../screens';
import HeaderHome from '../components/HeaderHome';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="CreatePin" component={CreatePin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SignUp" component={SignUp} /> */}
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          header: props => <HeaderHome {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
