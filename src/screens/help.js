import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../components/text';
import * as COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Help = () => {
  const Navigation = useNavigation();
  const supportData = [
    {
      title: 'email',
      data: 'asadullahtariq89@gamil',
    },
    {title: 'CellPhone', data: '3045622878'},
    {title: 'address', data: 'Pakistan'},
  ];
  const SupportListRender = item => {
    return (
      <View style={{marginBottom: 10}} key={item.title}>
        <Text style={styles.titleContainer}>
          {item.title[0].toUpperCase() + item.title.slice(1)}
        </Text>
        <Text style={styles.dataContainner}>{item.data}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.supportContactConatiner}>Support contact</Text>
      <View style={styles.supportContainer}>
        {supportData.map(item => SupportListRender(item))}
      </View>
      <View style={{flex: 1}} />
      <TouchableOpacity
        style={styles.ticketContainer}
        activeOpacity={0.8}
        onPress={() => Navigation.navigate('Support')}>
        <Text>Contect support for query/Help</Text>
        <Icon
          name="support-agent"
          color={COLORS.primary}
          size={20}
          style={styles.iconContainer}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackGroundColor,
  },
  ticketContainer: {
    width: '100%',
    height: 70,
    //backgroundColor: COLORS.white,
    justifyContent: 'center',
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  supportContactConatiner: {
    padding: 10,
  },
  supportContainer: {
    width: '100%',
    //height: 200,
    backgroundColor: COLORS.white,
    padding: 10,
    paddingVertical: 20,
  },
  iconContainer: {marginLeft: 10},
  titleContainer: {color: COLORS.placeholderText},
  dataContainner: {marginLeft: 10},
});

export default Help;
