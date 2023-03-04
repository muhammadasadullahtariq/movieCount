import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import * as COLORS from '../constants/colors';
import Text from './text';
import {useNavigation} from '@react-navigation/native';

const NotificationListItem = props => {
  const Navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        {opacity: props.item.status == 'read' ? 0.5 : 1},
      ]}
      activeOpacity={0.8}
      onPress={() => {
        Navigation.navigate('NotificationDetail', {
          message: props.item.message,
          title: props.item.title,
          id: props.item._id,
        });
      }}>
      <Text style={[styles.titleContainer, {}]}>{props.item.title}</Text>
      <Text style={styles.messageContainer} numberOfLines={2}>
        {props.item.message}
      </Text>
      <View style={styles.dateContainer}>
        <View style={{flex: 1}}></View>
        <Text style={styles.date}>29-02-2022</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 90,
    backgroundColor: COLORS.white,
    marginBottom: 1,
  },
  titleContainer: {
    padding: 5,
    paddingLeft: 10,
    color: COLORS.primary,
    fontWeight: '500',
    paddingBottom: 0,
  },
  messageContainer: {
    paddingLeft: 12,
    fontSize: 17,
    paddingRight: 5,
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  date: {
    color: COLORS.placeholderText,
    fontSize: 15,
    paddingRight: 10,
  },
});

export default NotificationListItem;
