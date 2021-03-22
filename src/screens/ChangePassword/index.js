import React, {Component} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {updatePassword} from '../../redux/actions/user';
import {showMessage} from '../../helpers/showMessage';

import InputText from '../../components/Form/InputText';
import Button from '../../components/Button';

class ChangePassword extends Component {
  state = {
    loading: false,
  };
  onSubmit = async values => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    const {id} = this.props.user.results;
    const {password, newPassword} = values;
    await this.props.updatePassword(token, id, password, newPassword);
    if (this.props.user.errorMsg === '') {
      this.setState({loading: false});
      showMessage(this.props.user.message, 'success');
      this.props.navigation.navigate('Profile');
    } else {
      this.setState({loading: false});
      showMessage(this.props.user.errorMsg);
    }
  };
  passwordValidation(values) {
    const errors = {};
    const {password, newPassword, repeatPassword} = values;

    if (!password) {
      errors.msg = 'Current Password Required';
    } else if (!newPassword) {
      errors.msg = 'New Password Required';
    } else if (!repeatPassword) {
      errors.msg = 'Repeat your new password';
    } else if (
      password.length < 8 ||
      newPassword.length < 8 ||
      repeatPassword.length < 8
    ) {
      errors.msg = 'Password have at least 8 characters';
    } else if (password === newPassword) {
      errors.msg = 'Cant same with current password';
    } else if (newPassword !== repeatPassword) {
      errors.msg = 'New password & repeat password not same';
    }
    return errors;
  }
  render() {
    return (
      <Formik
        initialValues={{
          password: '',
          newPassword: '',
          repeatPassword: '',
        }}
        validate={values => this.passwordValidation(values)}
        onSubmit={values => this.onSubmit(values)}>
        {({handleChange, handleSubmit, handleBlur, values, errors}) => (
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>
                You must enter your current password and then type your new
                password twice.
              </Text>
              <InputText
                icon="lock"
                placeholder="Current password"
                password
                sizeIcon={25}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={errors.msg}
              />
              <View style={styles.gap} />
              <InputText
                icon="lock"
                placeholder="New password"
                password
                sizeIcon={25}
                onChange={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.newPassword}
                error={errors.msg}
              />
              <View style={styles.gap} />
              <InputText
                icon="lock"
                placeholder="Repeat password"
                password
                sizeIcon={25}
                onChange={handleChange('repeatPassword')}
                onBlur={handleBlur('repeatPassword')}
                value={values.repeatPassword}
                error={errors.msg}
              />
              <View style={styles.gap} />
              {errors.msg ? (
                <Text style={styles.textError}>{errors.msg}</Text>
              ) : null}
              <View style={styles.gap} />
            </View>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <Button
                onPress={handleSubmit}
                disabled={
                  values.password === '' ||
                  values.newPassword === '' ||
                  values.repeatPassword === ''
                }
                color={
                  values.password === '' ||
                  values.newPassword === '' ||
                  values.repeatPassword === ''
                    ? '#DADADA'
                    : '#6379F4'
                }
                textColor={
                  values.password === '' ||
                  values.newPassword === '' ||
                  values.repeatPassword === ''
                    ? '#88888F'
                    : 'white'
                }
                text="Change Password"
              />
            )}
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updatePassword};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  text: {
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginBottom: 40,
  },
  gap: {
    height: 20,
  },
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});
