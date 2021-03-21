import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import InputText from '../../components/Form/InputText';
import Auth from '../../components/Auth';
import Button from '../../components/Button';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .required('Password is required'),
});

class SignIn extends Component {
  onSubmit = values => {
    console.log(values);
    this.props.navigation.replace('HomePage');
  };
  render() {
    return (
      <Auth
        title="Login"
        subTitle="Login to your existing account to access
      all the features in Walletchip.">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => this.onSubmit(values)}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <>
              <InputText
                icon="envelope"
                placeholder="Enter your e-mail"
                keyboardType="email-address"
                sizeIcon={20}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={errors.email && touched.email}
              />
              {errors.email && touched.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
              <View style={styles.gap} />
              <InputText
                icon="lock"
                placeholder="Enter your password"
                password
                sizeIcon={25}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.password && touched.password}
              />
              {errors.password && touched.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <Text style={styles.textForgot}>Forgot password?</Text>
              </TouchableOpacity>
              <Button
                onPress={handleSubmit}
                disabled={values.email === '' || values.password === ''}
                color={
                  values.email === '' || values.password === ''
                    ? '#DADADA'
                    : '#6379F4'
                }
                textColor={
                  values.email === '' || values.password === ''
                    ? '#88888F'
                    : 'white'
                }
                text="Login"
              />
            </>
          )}
        </Formik>
        <View style={styles.row}>
          <Text style={styles.textAccount}>Don't have an account? Let's </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Auth>
    );
  }
}

const styles = StyleSheet.create({
  textForgot: {
    fontSize: 14,
    fontFamily: 'NunitoSans-Regular',
    color: 'rgba(58, 61, 66, 0.8)',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  textAccount: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: 'rgba(58, 61, 66, 0.8)',
  },
  signUp: {
    fontSize: 16,
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#6379F4',
  },
  gap: {
    height: 20,
  },
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
    color: 'red',
  },
});

export default SignIn;
