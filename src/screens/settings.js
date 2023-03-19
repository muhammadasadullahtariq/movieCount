import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Share,
} from 'react-native';
import * as COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import settings from '../constants/settings';
import Banner from '../ads/Banner';

const Home = ({navigation}) => {
  useEffect(() => {}, []);

  const SettingLayout = (title, icon, screen) => {
    console.log(title);
    console.log(icon);
    return (
      <TouchableOpacity
        key={title}
        activeOpacity={0.8}
        style={styles.setttingContainer}
        onPress={() => {
          if (screen == 'Share') {
            Share.share({
              message: 'Movie app is awesome',
            });
          } else navigation.navigate(screen);
        }}>
        <Icon name={icon} size={20} color={COLORS.primary} />
        <Text style={styles.settingText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {settings.map((items, index) =>
        SettingLayout(items.title, items.icon, items.screen),
      )}
      <Banner />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackGroundColor,
  },
  text: {
    color: COLORS.textColor,
    fontFamily: 'Roboto',
    fontSize: 20,
  },
  profileContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    backgroundColor: COLORS.imageBackgroundColor,
  },
  profileDetails: {
    //padding: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    color: COLORS.textColor,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  phone: {
    color: COLORS.textColor,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  setttingContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    paddingLeft: 20,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  settingText: {
    color: COLORS.textColor,
    fontFamily: 'Roboto',

    marginLeft: 20,
  },
});

export default Home;
