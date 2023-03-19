import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, SafeAreaView, View} from 'react-native';
import MovieListItem from '../components/movieItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as COLORS from '../constants/colors';
import {useIsFocused} from '@react-navigation/native';

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const likedMovies = await AsyncStorage.getItem('favouriteMovies');
      if (likedMovies !== null) {
        const likedMoviesJson = JSON.parse(likedMovies);
        setLikedMovies(likedMoviesJson);
      }
    })();
  }, [isFocused]);
  return likedMovies.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.noLikedDramaText}>No Liked Movies</Text>
    </View>
  ) : (
    <SafeAreaView>
      <FlatList
        data={likedMovies}
        ListHeaderComponent={
          <View>
            <View
              style={{
                height: 10,
              }}
            />
            <Banner />
            <View
              style={{
                height: 10,
              }}
            />
          </View>
        }
        renderItem={({item}) => <MovieListItem {...item} />}
        columnWrapperStyle={styles.contentContainer}
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
  contentContainer: {
    justifyContent: 'space-evenly',
  },
});

export default LikedMovies;
