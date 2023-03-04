import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, Platform} from 'react-native';
import * as COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export const InputText = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 2,
        paddingLeft: 10,
      }}>
      <Icon name={'search'} size={20} color={COLORS.primary} />
      <TextInput
        autoCorrect={false}
        placeholder={props.placeholder}
        value={props.text}
        returnKeyType="go"
        multiline={props.multiLine}
        numberOfLines={props.numberOfLines}
        maxLength={props.maxLength}
        keyboardType={props.Keyboard == null ? 'default' : props.Keyboard}
        onChangeText={props.onChangeText}
        style={[style.textCointaner, props.style]}
        textAlignVertical={props.flag ? 'top' : 'center'}
        placeholderTextColor={COLORS.placeholderText}
        editable={props.editable || props.editable == null ? true : false}
        selectionColor={COLORS.primary}
        secureTextEntry={props.secureTextEntry || false}
        onSubmitEditing={props.onSubmit}></TextInput>
    </View>
  );
};

const style = StyleSheet.create({
  textCointaner: {
    width: '80%',
    padding: 5,
    ...Platform.select({
      ios: {
        paddingTop: 5,
      },
      android: {},
    }),
    color: COLORS.black,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    height: 48,
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: '500',

    paddingLeft: 18,
  },
});

// #a {
//   width: 187px;
//   height: 15px;
//   color: #092058;
//   font-family: Montserrat;
//   font-size: 15px;
//   font-weight: 500;
//   line-height: 19.5px;
//   text-align: center;
// }

// #input {
//   width: 312px;
//   height: 50px;
// }

// #rectangle {
//   width: 311px;
//   height: 50px;
//   border-radius: 11px;
//   background: #ffffff;
// }

// #enteryourp {
//   width: 135px;
//   height: 20px;
//   color: #7d90aa;
//   font-family: Montserrat;
//   font-size: 13px;
//   font-weight: 400;
//   line-height: 19.5px;
//   text-align: center;
// }

export default InputText;
