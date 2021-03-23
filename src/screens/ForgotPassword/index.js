import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

import InputText from '../../components/Form/InputText';
import Auth from '../../components/Auth';
import Button from '../../components/Button';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
});

class ForgotPassword extends Component {
  state = {
    loading: false,
  };
  onSubmit = async values => {
    this.setState({loading: true});
    const email = new URLSearchParams();
    email.append('email', values.email);
    try {
      const {data} = await http().post('api/auth/password', email);
      this.setState({loading: false});
      showMessage(data.message, 'success');
    } catch (error) {
      this.setState({loading: false});
      showMessage(error.response.data.message, 'danger');
    }
  };
  render() {
    return (
      <Auth
        title="Forgot Password"
        subTitle="Enter your Walletchip e-mail so we can send
        you a password reset link.">
        <Formik
          initialValues={{
            email: '',
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
              <View style={styles.gap} />
              {this.state.loading ? (
                <ActivityIndicator color="#000000" size="large" />
              ) : (
                <Button
                  onPress={handleSubmit}
                  disabled={values.email === ''}
                  color={values.email === '' ? '#DADADA' : '#6379F4'}
                  textColor={values.email === '' ? '#88888F' : 'white'}
                  text="Confirm"
                />
              )}
            </>
          )}
        </Formik>
      </Auth>
    );
  }
}

const styles = StyleSheet.create({
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
    color: 'red',
  },
  gap: {
    height: 175,
  },
});

export default ForgotPassword;
