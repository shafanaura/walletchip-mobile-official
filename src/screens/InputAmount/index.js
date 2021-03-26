import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../components/Button';
import CardContact from '../../components/CardContact';
import InputText from '../../components/Form/InputText';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {getContact, getUser} from '../../redux/actions/user';
import {
  getReceiverData,
  selectReceiver,
  createTransferData,
} from '../../redux/actions/transaction';

const date = new Date();

export class InputAmount extends Component {
  amountValidation(values) {
    const errors = {};
    const {balance} = this.props.user.results;
    if (!values.amount) {
      errors.amount = 'Amount Required';
    } else if (values.amount > balance) {
      errors.amount = 'Balance not enough';
    } else if (values.amount < 5000) {
      errors.amount = 'Minimun Transfer Rp. 5000';
    }

    if (!values.note) {
      errors.note = 'Notes Required!';
    } else if (values.amount.length < 2) {
      errors.note = 'must have at least 2 characters!';
    }

    return errors;
  }
  componentDidMount() {
    this.props.getUser(this.props.auth.token);
    this.props.getReceiverData(
      this.props.auth.token,
      this.props.transaction.receiver,
    );
  }
  onSubmit = values => {
    this.props.createTransferData({
      receiverId: this.props.transaction.receiver,
      amount: parseInt(values.amount),
      note: values.note,
      date: date,
    });
    this.props.navigation.navigate('Confirmation');
  };
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  render() {
    const {
      picture,
      first_name,
      last_name,
      username,
      phone,
    } = this.props.transaction.receiverData;
    const {balance} = this.props.user.results;
    return (
      <View style={styles.container}>
        <CardContact
          picture={picture}
          firstName={first_name === null ? username : first_name}
          lastName={last_name !== null && last_name}
          detail={phone ? `+62 ${phone}` : 'No phone number'}
        />
        <Formik
          initialValues={{
            amount: '',
            note: '',
          }}
          validate={values => this.amountValidation(values)}
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
              <View style={styles.center}>
                <Text style={styles.amount}>
                  Rp{this.onChangeRupiah(balance)} Available
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.input}
                  placeholder="0.00"
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                  error={errors.amount && touched.amount}
                />
                {errors.amount && touched.amount ? (
                  <Text style={styles.textError}>{errors.amount}</Text>
                ) : null}
              </View>
              <InputText
                style={styles.inputNote}
                icon="edit-2"
                placeholder="Add some notes"
                onChange={handleChange('note')}
                onBlur={handleBlur('note')}
                value={values.note}
                error={errors.note && touched.note}
              />
              {errors.note && touched.note ? (
                <Text style={styles.textError}>{errors.note}</Text>
              ) : null}
              <View style={{paddingTop: 20}}>
                <Button
                  onPress={handleSubmit}
                  disabled={values.amount === '' || values.note === ''}
                  color={
                    values.amount === '' || values.note === ''
                      ? '#DADADA'
                      : '#6379F4'
                  }
                  textColor={
                    values.amount === '' || values.note === ''
                      ? '#88888F'
                      : 'white'
                  }
                  text="Continue"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  amount: {
    fontFamily: 'NunitoSans-Bold',
    color: '#7C7895',
    fontSize: 16,
    paddingTop: 10,
  },
  input: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 42,
    textAlign: 'center',
    width: '100%',
    color: '#6379F4',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 12,
    color: 'red',
  },
  inputNote: {
    marginBottom: 10,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  getContact,
  getUser,
  getReceiverData,
  selectReceiver,
  createTransferData,
};

export default connect(mapStateToProps, mapDispatchToProps)(InputAmount);
