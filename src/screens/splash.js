import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '../components/text';
import * as COLORS from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {requestTrackingPermission} from 'react-native-tracking-transparency';
import appInterstitial from '../ads/Interstitial';

const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    showAds();
  }, []);

  const reset = () => {
    navigation.navigate('MainMenu');
  };

  const showAds = async () => {
    await requestTrackingPermission();
    appInterstitial(reset);
  };

  return (
    <View style={styles.container}>
      <Text>Movie App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
