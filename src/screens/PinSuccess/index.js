import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../../components/Button';

import Auth from '../../components/Auth';

export default class PinSuccess extends Component {
  render() {
    return (
      <Auth
        title="PIN Successfully Created"
        subTitle="Your PIN was successfully created and you can now access all the features in Zwallet. Login to your new account and start exploring!"
        success>
        <View style={styles.gap}>
          <Button
            text="Confirm"
            textColor="white"
            color="#6379F4"
            onPress={() => this.props.navigation.replace('SignIn')}
          />
        </View>
      </Auth>
    );
  }
}

const styles = StyleSheet.create({
  gap: {
    marginTop: 82,
  },
});
