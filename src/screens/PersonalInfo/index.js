import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {updatePersonalInfo} from '../../redux/actions/user';
import {showMessage} from '../../helpers/showMessage';

import InputPersonal from '../../components/Form/InputPersonal';
import Button from '../../components/Button';

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, '*First name must be less than 3 characters')
    .max(50, '*First name must be less than 50 characters')
    .required('*First name is required'),
  lastname: Yup.string()
    .min(3, '*Last name must be less than 3 characters')
    .max(50, '*Last name must be less than 50 characters')
    .required('*Last name is required'),
  email: Yup.string()
    .email('*Must be a valid email address')
    .max(50, '*Email must be less than 50 characters')
    .required('*Email is required'),
});

class PersonalInfo extends Component {
  state = {
    loading: false,
  };
  onSubmit = async values => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    const {firstname, lastname, email} = values;
    await this.props.updatePersonalInfo(token, {
      first_name: firstname,
      last_name: lastname,
      email: email,
    });
    if (this.props.user.errorMsg === '') {
      this.setState({loading: false});
      showMessage(this.props.user.message, 'success');
      this.props.navigation.navigate('Profile');
    } else {
      this.setState({loading: false});
      showMessage(this.props.user.errorMsg);
    }
  };
  render() {
    const {first_name, last_name, email, phone} = this.props.user.results;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.text}>
            We got your personal information from the sign up proccess. If you
            want to make changes on your information, contact our support.
          </Text>
          <Formik
            initialValues={{
              firstname: first_name ? first_name : '',
              lastname: last_name ? last_name : '',
              email: email ? email : '',
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
                <InputPersonal
                  label="First Name"
                  placeholder="Enter your first name"
                  onChange={handleChange('firstname')}
                  onBlur={handleBlur('firstname')}
                  value={values.firstname}
                />
                {errors.firstname && touched.firstname ? (
                  <Text style={styles.textError}>{errors.firstname}</Text>
                ) : null}
                <View style={styles.gap} />
                <InputPersonal
                  label="Last Name"
                  placeholder="Enter your last name"
                  onChange={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  value={values.lastname}
                />
                {errors.lastname && touched.lastname ? (
                  <Text style={styles.textError}>{errors.lastname}</Text>
                ) : null}
                <View style={styles.gap} />
                <InputPersonal
                  label="Verified E-mail"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={styles.textError}>{errors.email}</Text>
                ) : null}
                <View style={styles.gap} />
                <View style={styles.input}>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.label}>Phone Number</Text>
                      <Text style={styles.value}>
                        {phone ? `+62 ${phone}` : '-'}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ManagePhone')
                      }>
                      <Text style={styles.manage}>Manage</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.gap} />
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#000000" />
                ) : (
                  <Button
                    text="Save"
                    textColor="white"
                    color="#6379F4"
                    onPress={handleSubmit}
                  />
                )}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updatePersonalInfo};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  input: {
    backgroundColor: 'white',
    elevation: 1,
    padding: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
  },
  value: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
    color: '#514F5B',
    marginTop: 10,
  },
  manage: {
    fontSize: 14,
    fontFamily: 'NunitoSans-SemiBold',
    color: '#6379F4',
  },
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
    color: 'red',
  },
});
