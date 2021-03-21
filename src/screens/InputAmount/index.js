import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Button from '../../components/Button';
import CardContact from '../../components/CardContact';
import InputText from '../../components/Form/InputText';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  amount: Yup.number('*Number only'),
});

export class InputAmount extends Component {
  state = {
    value: '200000',
  };
  onSubmit = values => {
    console.log(values);
    this.props.navigation.navigate('Confirmation');
  };
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  render() {
    return (
      <View style={styles.container}>
        <CardContact
          picture="https://matamatamusik.com/wp-content/uploads/2020/01/Niall-Horan-nov-7-2019-bbc-radio-one-billboard-1548.jpg"
          firstName="Niall"
          lastName="Horan"
          detail="085656888775"
        />
        <Formik
          initialValues={{
            amount: '',
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
              <View style={styles.center}>
                <Text style={styles.amount}>
                  Rp{this.onChangeRupiah(250000)} Available
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.input}
                  placeholder="0.00"
                  onChange={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  value={values.amount}
                  error={errors.amount && touched.amount}
                />
              </View>
              <InputText
                style={styles.inputNote}
                icon="edit-2"
                placeholder="Add some notes"
              />
              {errors.amount && touched.amount ? (
                <Text style={styles.textError}>{errors.amount}</Text>
              ) : null}
              <Button
                style={{marginTop: 10}}
                onPress={handleSubmit}
                disabled={values.amount === ''}
                color={values.amount === '' ? '#DADADA' : '#6379F4'}
                textColor={values.amount === '' ? '#88888F' : 'white'}
                text="Continue"
              />
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
    marginBottom: 100,
  },
});

export default InputAmount;
