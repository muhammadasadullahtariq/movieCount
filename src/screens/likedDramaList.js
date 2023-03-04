import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import DramaListItem from '../components/dramaItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as COLORS from '../constants/colors';

const LikedDramas = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const likedMovies = await AsyncStorage.getItem('favouritedramas');
      if (likedMovies !== null) {
        const likedMoviesJson = JSON.parse(likedMovies);
        setLikedMovies(likedMoviesJson);
      }
    })();
  }, []);
  return likedMovies.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.noLikedMoviesText}>No Liked Dramas</Text>
    </View>
  ) : (
    <SafeAreaView>
      <FlatList
        data={likedMovies}
        renderItem={({item}) => <DramaListItem {...item} />}
        keyExtractor={item => item.id}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.screenBackGroundColor,
  },
  noLikedMoviesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
});

export default LikedDramas;
