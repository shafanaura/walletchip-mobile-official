import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
});

class ForgotPassword extends Component {
  onSubmit = values => {
    console.log(values);
    this.props.navigation.navigate('ResetPassword');
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
                icon="envelope"
                placeholder="Enter your e-mail"
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
              <Button
                onPress={handleSubmit}
                disabled={values.email === ''}
                color={values.email === '' ? '#DADADA' : '#6379F4'}
                textColor={values.email === '' ? '#88888F' : 'white'}
                text="Confirm"
              />
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
