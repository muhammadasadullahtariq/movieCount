import React from 'react';
import {Text, StyleSheet} from 'react-native';
import * as COLORS from '../constants/colors';

const TextComponent = props => {
  return <Text style={[styles.text, props.style]} numberOfLines={props.numberOfLines} >{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.textColor,
    fontFamily: 'Roboto',
    fontSize: 20,
  },
});

export default TextComponent;
