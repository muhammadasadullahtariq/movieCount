import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, SafeAreaView, View} from 'react-native';
import MovieListItem from '../components/movieItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as COLORS from '../constants/colors';

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const likedMovies = await AsyncStorage.getItem('favouriteMovies');
      if (likedMovies !== null) {
        const likedMoviesJson = JSON.parse(likedMovies);
        setLikedMovies(likedMoviesJson);
      }
    })();
  }, []);
  return likedMovies.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.noLikedDramaText}>No Liked Movies</Text>
    </View>
  ) : (
    <SafeAreaView>
      <FlatList
        data={likedMovies}
        renderItem={({item}) => <MovieListItem {...item} />}
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
  noLikedDramaText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
});

export default LikedMovies;
