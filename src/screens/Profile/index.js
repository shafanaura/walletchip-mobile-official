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

import {connect} from 'react-redux';
import {updatePhoto, updatePersonalInfo} from '../../redux/actions/user';
import {logout} from '../../redux/actions/auth';
import {showMessage} from '../../helpers/showMessage';

class Profile extends Component {
  state = {
    modalVisible: false,
    profile: null,
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  toggleSwitch = async () => {
    const {token} = this.props.auth;
    const notification =
      Number(this.props.user.results.notification) === 0 ? 1 : 0;
    await this.props.updatePersonalInfo(token, {notification});
  };
  addPhotoGallery = () => {
    this.setState({modalVisible: false});
    const {token} = this.props.auth;
    launchImageLibrary({}, async response => {
      if (response.didCancel) {
        console.log('User cancelled upload image');
      } else if (response.errorMessage) {
        console.log('Image Error: ', response.errorMessage);
      } else if (response.fileSize >= 1 * 1024 * 1024) {
        console.log('Image to large');
      } else {
        this.setState({profile: response});
        await this.props.updatePhoto(token, this.state.profile);
        if (this.props.user.errorMsg === '') {
          this.setState({loading: false});
          showMessage(this.props.user.message, 'success');
        } else {
          this.setState({loading: false});
          showMessage(this.props.user.errorMsg);
        }
      }
    });
  };
  addPhotoCamera = () => {
    this.setState({modalVisible: false});
    const {token} = this.props.auth;
    launchCamera(
      {
        quality: 0.3,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled upload image');
        } else if (response.errorMessage) {
          console.log('Image Error: ', response.errorMessage);
        } else if (response.fileSize >= 1 * 1024 * 1024) {
          console.log('Image to large');
        } else {
          this.setState({profile: response});
          await this.props.updatePhoto(token, this.state.profile);
          if (this.props.user.errorMsg === '') {
            this.setState({loading: false});
            showMessage(this.props.user.message, 'success');
          } else {
            this.setState({loading: false});
            showMessage(this.props.user.errorMsg);
          }
        }
      },
    );
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.column}>
            {this.props.user.results.picture ? (
              <Image
                source={{uri: this.props.user.results.picture}}
                style={styles.image}
              />
            ) : (
              <Image source={Avatar} style={styles.image} />
            )}
            <TouchableOpacity
              style={styles.row}
              onPress={() => this.setModalVisible(true)}>
              <Icon name="edit-2" size={16} color="#7A7886" />
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            <Text style={styles.name}>
              {this.props.user.results.first_name
                ? `${this.props.user.results.first_name} ${
                    this.props.user.results.last_name
                      ? this.props.user.results.last_name
                      : ''
                  }`
                : this.props.user.results.username}
            </Text>
            <Text style={styles.phone}>
              {this.props.user.results.phone !== null
                ? this.props.user.results.phone
                : 'Phone number empty'}
            </Text>
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
          <CardInfoProfile
            title="Change Pin"
            onPress={() => this.props.navigation.navigate('ChangePin')}>
            <Icon name="arrow-right" size={20} color="#7A7886" />
          </CardInfoProfile>
          <View style={styles.gap} />
          <CardInfoProfile title="Notification">
            <Switch
              trackColor={{false: 'rgba(169, 169, 169, 0.4)', true: '#6379F4'}}
              thumbColor={
                this.props.user.results.notification === 0 ? 'white ' : 'white'
              }
              onValueChange={this.toggleSwitch}
              value={
                Number(this.props.user.results.notification) === 0
                  ? false
                  : true
              }
            />
          </CardInfoProfile>
          <View style={styles.gap} />
          <View style={{paddingBottom: 10}}>
            <CardInfoProfile
              title="Logout"
              position="center"
              textColor="#FF5B37"
              onPress={async () => {
                await this.props.logout();
              }}
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

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updatePhoto, updatePersonalInfo, logout};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
