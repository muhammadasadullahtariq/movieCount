import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Text from '../components/text';
import * as COLORS from '../constants/colors';
import splashImage from '../assets/images/controller.png';
import {useNavigation} from '@react-navigation/native';



const Home = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainMenu');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
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
