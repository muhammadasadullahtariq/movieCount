import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {primary, screenColor} from '../constants/colors';
//import ButtonComponent from './buttonComponent';

const WaitingAlert = props => {
  return (
    <Modal visible={props.visible} transparent={true} style={{height: 3}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000080',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: 'white',
            marginBottom: '10%',
            borderRadius: 10,
          }}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <ActivityIndicator size="large" color={primary} />
            <Text style={styles.textContainer}>Please wait</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {fontSize: 20, padding: 10},
});

export default WaitingAlert;
