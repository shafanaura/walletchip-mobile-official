import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import InputText from '../../components/Form/InputText';

import Logo from '../../assets/images/logo.png';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
  password: Yup.string()
    .min(8, '*Password must have at least 8 characters')
    .required('Password is required'),
});

const SignIn = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.rowImage}>
        <Image source={Logo} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>
          Login to your existing account to access all the features in
          Walletchip.
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => null}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            isValid,
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
                onBlur={handleBlur('email')}
                value={values.password}
              />
              <TouchableOpacity>
                <Text style={styles.textForgot}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.button}>
                  <Text style={styles.textButton}>Login</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <View style={styles.row}>
          <Text style={styles.textAccount}>Don't have an account? Let's </Text>
          <TouchableOpacity>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowImage: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 75,
  },
  image: {
    width: 150,
    resizeMode: 'contain',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 40,
    marginTop: 60,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A3D42',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: 'rgba(58, 61, 66, 0.6)',
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 53,
  },
  textForgot: {
    fontSize: 14,
    color: 'rgba(58, 61, 66, 0.8)',
    textAlign: 'right',
    marginTop: 15,
    marginBottom: 50,
  },
  button: {
    paddingVertical: 16,
    backgroundColor: '#DADADA',
    borderRadius: 12,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#88888F',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  textAccount: {
    fontSize: 16,
    color: 'rgba(58, 61, 66, 0.8)',
  },
  signUp: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6379F4',
  },
  gap: {
    height: 20,
  },
});

export default SignIn;
