import React from 'react';
import {Modal, Pressable, StyleSheet, View, Text} from 'react-native';
import ButtonComponent from './button';
import * as COLORS from '../constants/colors';

const SingleButtonAlert = props => {
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
            width: '85%',
            backgroundColor: COLORS.white,
            marginBottom: '20%',
            borderRadius: 12,
            borderWidth: 0.25,
            borderColor: COLORS.primary,
            justifyContent: 'center',
          }}>
          <Text style={styles.textContainer}>{props.text}</Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}>
            <View style={{width: '40%'}}>
              <ButtonComponent
                text="OK"
                style={{
                  width: '90%',
                  marginBottom: 20,
                  paddingHorizontal: 15,
                  backgroundColor: COLORS.primary,
                }}
                onPress={props.onPress}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {
    fontSize: 18,
    padding: 10,
    paddingBottom: 30,
    marginTop: 40,
    fontFamily: 'Roboto',
    color: COLORS.darkBrownColor,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SingleButtonAlert;
