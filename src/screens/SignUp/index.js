import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import InputText from '../../components/Form/InputText';
import Auth from '../../components/Auth';
import Button from '../../components/Button';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, '*Username must be less than 5 characters')
    .max(50, '*Username must be less than 50 characters')
    .required('*Username is required'),
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .required('Password is required'),
});

class SignUp extends Component {
  onSubmit = values => {
    console.log(values);
    this.props.navigation.navigate('CreatePin');
  };
  render() {
    return (
      <Auth
        title="Sign Up"
        subTitle="Create your account to access Walletchip.">
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
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
                icon="user"
                placeholder="Enter your username"
                sizeIcon={25}
                onChange={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                error={errors.username && touched.username}
              />
              {errors.username && touched.username ? (
                <Text style={styles.textError}>{errors.username}</Text>
              ) : null}
              <View style={styles.gap(20)} />
              <InputText
                icon="mail"
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
              <View style={styles.gap(20)} />
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
              <View style={styles.gap(40)} />
              <Button
                onPress={handleSubmit}
                disabled={
                  values.username === '' ||
                  values.email === '' ||
                  values.password === ''
                }
                color={
                  values.username === '' ||
                  values.email === '' ||
                  values.password === ''
                    ? '#DADADA'
                    : '#6379F4'
                }
                textColor={
                  values.username === '' ||
                  values.email === '' ||
                  values.password === ''
                    ? '#88888F'
                    : 'white'
                }
                text="Sign Up"
              />
            </>
          )}
        </Formik>
        <View style={styles.row}>
          <Text style={styles.textAccount}>
            Already have an account? Let's{' '}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.signUp}>Login</Text>
          </TouchableOpacity>
        </View>
      </Auth>
    );
  }
}

const styles = StyleSheet.create({
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
  gap: value => ({
    height: value,
  }),
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
    color: 'red',
  },
});

export default SignUp;
