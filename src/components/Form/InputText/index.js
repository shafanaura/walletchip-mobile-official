import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class InputText extends Component {
  state = {
    isPasswordShown: false,
    isFocused: false,
  };
  togglePasswordVisiblity = () => {
    const {isPasswordShown} = this.state;
    this.setState({isPasswordShown: !isPasswordShown});
  };
  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});
  render() {
    const {isPasswordShown, isFocused} = this.state;
    return (
      <View style={isFocused ? styles.formFocus : styles.form}>
        <Icon
          name={this.props.icon}
          color={isFocused ? '#6379F4' : 'rgba(169, 169, 169, 0.6)'}
          size={this.props.sizeIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder={this.props.placeholder}
          secureTextEntry={
            this.props.password ? (isPasswordShown ? false : true) : false
          }
          onChangeText={this.props.onChange}
          defaultValue={this.props.value}
          onBlur={this.props.onBlur}
          onFocus={this.handleFocus}
        />
        {this.props.password && (
          <TouchableOpacity onPress={this.togglePasswordVisiblity}>
            <Icon
              name={isPasswordShown ? 'eye-slash' : 'eye'}
              color="rgba(169, 169, 169, 0.6)"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(169, 169, 169, 0.6)',
    borderBottomWidth: 1,
  },
  formFocus: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#6379F4',
    borderBottomWidth: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#3A3D42',
    marginLeft: 5,
  },
});
