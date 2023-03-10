import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, Text, View, SafeAreaView} from 'react-native';
import * as COLORS from '../constants/colors';
import MovieListItem from '../components/movieItem';
import ToggleButton from '../components/ToggleButton';
import getMoviesList from '../apis/getComingSoonMovies';
import getComingSoonDramas from '../apis/getComingSoonDramas';
import DramaListItem from '../components/dramaItem';
import WaitingAlert from '../components/waitingAlert';
import firestore from '@react-native-firebase/firestore';

const GamesList = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [dramas, setDramas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(true);
  const [dramasLoading, setDramasLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setMoviesLoading(true);
      const moviesList = await firestore().collection('movies').get();
      console.log(moviesList.docs);
      setMovies(moviesList.docs);
      setMoviesLoading(false);
    })();
    (async () => {
      setDramasLoading(true);
      const dramasList = await firestore().collection('dramas').get();
      console.log(dramasList.docs);
      setDramas(dramasList.docs);
      setDramasLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView>
      <View>
        {selectedMovie ? (
          <WaitingAlert visible={moviesLoading} />
        ) : (
          <WaitingAlert visible={dramasLoading} />
        )}
        <View style={{height: 20}} />
        <ToggleButton
          movie={selectedMovie}
          onPress={flag => {
            if (flag !== selectedMovie) {
              setSelectedMovie(flag);
            }
          }}
        />
        <View style={{height: 20}} />
      </View>

      {selectedMovie ? (
        <FlatList
          data={movies}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.contentContainer}
          renderItem={({item}) => <MovieListItem {...item.data()} />}
          keyExtractor={item => item.id}
          style={styles.container}
        />
      ) : (
        <FlatList
          data={dramas}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.contentContainer}
          renderItem={({item}) => <DramaListItem {...item.data()} />}
          keyExtractor={item => item.id}
          style={styles.container}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.screenBackGroundColor,
  },
  contentContainer: {
    justifyContent: 'space-evenly',
  },
});

export default GamesList;
