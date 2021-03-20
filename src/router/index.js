import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SignIn,
  SignUp,
  CreatePin,
  ResetPassword,
  ForgotPassword,
  HomePage,
  DetailTransaction,
  TransactionHistory,
  SearchReceiver,
} from '../screens';
import HeaderHome from '../components/HeaderHome';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: 'NunitoSans-SemiBold',
        },
      }}>
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
      <Stack.Screen
        name="DetailTransaction"
        component={DetailTransaction}
        options={{
          title: 'Transaction',
        }}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{
          title: 'History',
        }}
      />
      <Stack.Screen
        name="SearchReceiver"
        component={SearchReceiver}
        options={{
          title: 'Find Receiver',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
