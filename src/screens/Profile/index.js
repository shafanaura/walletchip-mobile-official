import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import Avatar from '../../assets/image/default-profile.png';

import CardInfoProfile from '../../components/CardInfoProfile';
import Button from '../../components/Button';
import {ScrollView} from 'react-native-gesture-handler';

export default class Profile extends Component {
  state = {
    isEnabled: false,
    modalVisible: false,
    profile: null,
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  toggleSwitch = () => this.setState({isEnabled: !this.state.isEnabled});
  addPhotoGallery = () => {
    this.setState({modalVisible: false});
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled upload image');
      } else if (response.errorMessage) {
        console.log('Image Error: ', response.errorMessage);
      } else if (response.fileSize >= 1 * 1024 * 1024) {
        console.log('Image to large');
      } else {
        this.setState({profile: response.uri});
      }
    });
  };
  addPhotoCamera = () => {
    this.setState({modalVisible: false});
    launchCamera(
      {
        quality: 0.3,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled upload image');
        } else if (response.errorMessage) {
          console.log('Image Error: ', response.errorMessage);
        } else if (response.fileSize >= 1 * 1024 * 1024) {
          console.log('Image to large');
        } else {
          this.setState({profile: response.uri});
        }
      },
    );
  };
  render() {
    const {modalVisible, profile} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.column}>
            {profile ? (
              <Image source={{uri: profile}} style={styles.image} />
            ) : (
              <Image source={Avatar} style={styles.image} />
            )}
            <TouchableOpacity
              style={styles.row}
              onPress={() => this.setModalVisible(true)}>
              <Icon name="edit-2" size={16} color="#7A7886" />
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.name}>Robert Chandler</Text>
            <Text style={styles.phone}>+62 813-9387-7946</Text>
          </View>
          <CardInfoProfile
            title="Personal Information"
            onPress={() => this.props.navigation.navigate('PersonalInfo')}>
            <Icon name="arrow-right" size={20} color="#7A7886" />
          </CardInfoProfile>
          <View style={styles.gap} />
          <CardInfoProfile
            title="Change Password"
            onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Icon name="arrow-right" size={20} color="#7A7886" />
          </CardInfoProfile>
          <View style={styles.gap} />
          <CardInfoProfile title="Change Pin">
            <Icon name="arrow-right" size={20} color="#7A7886" />
          </CardInfoProfile>
          <View style={styles.gap} />
          <CardInfoProfile title="Notification">
            <Switch
              trackColor={{false: 'rgba(169, 169, 169, 0.4)', true: '#6379F4'}}
              thumbColor={this.state.isEnabled ? 'white ' : 'white'}
              onValueChange={this.toggleSwitch}
              value={this.state.isEnabled}
            />
          </CardInfoProfile>
          <View style={styles.gap} />
          <View style={{paddingBottom: 10}}>
            <CardInfoProfile
              title="Logout"
              position="center"
              textColor="#FF5B37"
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.rowModal}>
              <Button
                text="Camera"
                textColor="white"
                color="#6379F4"
                onPress={() => this.addPhotoCamera()}
              />
              <View style={styles.gapModal} />
              <Button
                text="Gallery"
                textColor="white"
                color="#6379F4"
                onPress={() => this.addPhotoGallery()}
              />
              <View style={styles.gapModal} />
              <Button
                text="Cancel"
                textColor="white"
                color="red"
                onPress={() => this.setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginLeft: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 24,
    fontFamily: 'NunitoSans-Bold',
    color: '#4D4B57',
  },
  phone: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginBottom: 45,
  },
  gap: {
    height: 25,
  },
  gapModal: {
    height: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  rowModal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});
