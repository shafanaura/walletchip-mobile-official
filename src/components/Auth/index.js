import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Success from '../../assets/image/success.png';

import Logo from '../../assets/image/logo.png';

class Auth extends Component {
  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.rowImage}>
          <Image source={Logo} style={styles.image} />
        </View>
        <View style={styles.card}>
          {this.props.success && (
            <View style={styles.rowSuccess}>
              <Image source={Success} style={styles.success} />
            </View>
          )}
          <Text style={styles.title}>{this.props.title}</Text>
          <Text style={styles.subTitle}>{this.props.subTitle}</Text>
          {this.props.children}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowImage: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 75,
  },
  rowSuccess: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  image: {
    width: 150,
    resizeMode: 'contain',
  },
  success: {
    width: 80,
    height: 80,
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
    fontFamily: 'NunitoSans-ExtraBold',
    color: '#3A3D42',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: 'rgba(58, 61, 66, 0.6)',
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 53,
  },
});

export default Auth;
