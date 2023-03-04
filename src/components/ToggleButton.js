import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import * as COLORS from '../constants/colors';

const ToggleButton = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        disabled={props.disabled}
        activeOpacity={0.6}
        onPress={() => props.onPress(true)}
        style={[
          styles.leftButtonContainer,
          {
            backgroundColor: props.movie
              ? COLORS.primary
              : COLORS.secondryColor,
          },
        ]}>
        <View>
          <Text>Movies</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={props.disabled}
        activeOpacity={0.6}
        onPress={() => props.onPress(false)}
        style={[
          styles.rightButtonContainer,
          ,
          {
            backgroundColor: !props.movie
              ? COLORS.primary
              : COLORS.secondryColor,
          },
        ]}>
        <View>
          <Text>Dramas</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leftButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    width: '50%',
  },
  rightButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: '50%',
  },
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

export default ToggleButton;
