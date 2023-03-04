import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from './text';
import * as COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
import Graduation from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const DetailBox = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(props.screen);
      }}
      style={[styles.container, props.container]}>
      <Text style={styles.text}>{props.title}</Text>
      {props.title == 'my\nStudents' && (
        <Graduation
          color={COLORS.white}
          name={props.icon}
          size={25}
          style={styles.iconContainer}
        />
      )}
      {props.title == 'add\nStudents' && (
        <Icon
          color={COLORS.white}
          name={props.icon}
          size={25}
          style={styles.iconContainer}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    backgroundColor: COLORS.redColor,
    width: '45%',
    borderRadius: 10,
  },
  text: {
    color: COLORS.white,
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 20,
  },
});

export default DetailBox;
