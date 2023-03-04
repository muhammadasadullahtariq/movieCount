import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import * as COLORS from '../constants/colors';

const Button = props => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      activeOpacity={0.6}
      onPress={props.onPress}
      style={props.style1}>
      <View
        opacity={props.disabled ? 0.5 : 1}
        style={[styles.buttonContainer, props.style]}>
        <Text style={styles.textContainer}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    fontFamily: 'Roboto',
    fontSize: 22,
    height: 27,
    color: COLORS.white,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 50,
  },
});

export default Button;
