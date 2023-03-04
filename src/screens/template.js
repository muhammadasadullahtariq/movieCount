import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../components/text';
import * as COLORS from '../constants/colors';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBackGroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
