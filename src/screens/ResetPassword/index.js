import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import jwtdecode from 'jwt-decode';

import {connect} from 'react-redux';
import {setEmailForgotPassword} from '../../redux/actions/auth';

import InputText from '../../components/Form/InputText';
import Auth from '../../components/Auth';
import Button from '../../components/Button';

import http from '../../helpers/http';
import {showMessage} from '../../helpers/showMessage';

class ResetPassword extends Component {
  state = {
    id: null,
  };
  componentDidMount() {
    const {route} = this.props;
    if (route.params.token) {
      const {id} = jwtdecode(route.params.token);
      console.log(id);
      this.setState({id});
    }
  }
  onSubmit = async values => {
    this.setState({loading: true});
    const credentials = new URLSearchParams();
    credentials.append('email', this.props.email);
    credentials.append('password', values.password);
    try {
      const {data} = await http().patch(
        `api/auth/password/${this.state.id}`,
        credentials,
      );
      showMessage(data.message, 'success');
      this.setState({loading: false});
      this.props.setEmailForgotPassword(null);
      this.props.navigation.navigate('SignIn');
    } catch (error) {
      this.setState({loading: false});
      showMessage(error.response.data.message);
    }
  };
  passwordValidation(values) {
    const errors = {};
    const {password, confirmPassword} = values;

    if (!password) {
      errors.msg = 'New Password Required';
    } else if (!confirmPassword) {
      errors.msg = 'Repeat your new password';
    } else if (password.length < 8 || confirmPassword.length < 8) {
      errors.msg = 'Password have at least 8 characters';
    } else if (password !== confirmPassword) {
      errors.msg = 'New password & repeat password not same';
    }
    return errors;
  }
  render() {
    return (
      <Auth
        title="Reset Password"
        subTitle="Create and confirm your new password so
        you can login to Walletchip.">
        <Formik
          initialValues={{
            password: '',
            confirmPassword: '',
          }}
          validate={values => this.passwordValidation(values)}
          onSubmit={values => this.onSubmit(values)}>
          {({handleChange, handleSubmit, handleBlur, values, errors}) => (
            <>
              <InputText
                icon="lock"
                placeholder="Create new password"
                password
                sizeIcon={25}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.msg}
              />
              {errors.password ? (
                <Text style={styles.textError}>{errors.password}</Text>
              ) : null}
              <View style={styles.gap(20)} />
              <InputText
                icon="lock"
                placeholder="Confirm new password"
                password
                sizeIcon={25}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={errors.msg}
              />
              {errors.msg ? (
                <Text style={styles.textError}>{errors.msg}</Text>
              ) : null}
              <View style={styles.gap(105)} />
              <Button
                onPress={handleSubmit}
                disabled={
                  values.password === '' || values.confirmPassword === ''
                }
                color={
                  values.password === '' || values.confirmPassword === ''
                    ? '#DADADA'
                    : '#6379F4'
                }
                textColor={
                  values.password === '' || values.confirmPassword === ''
                    ? '#88888F'
                    : 'white'
                }
                text="Reset Password"
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
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
  gap: value => ({
    height: value,
  }),
});

const mapStateToProps = state => ({
  email: state.auth.email,
});

const mapDispatchToProps = {setEmailForgotPassword};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
