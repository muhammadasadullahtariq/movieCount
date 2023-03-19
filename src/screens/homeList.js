import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, Text, View, SafeAreaView} from 'react-native';
import * as COLORS from '../constants/colors';
import MovieListItem from '../components/movieItem';
import gamesList from '../utils/gamesList';
import InputComponent from '../components/textInput';
import ToggleButton from '../components/ToggleButton';
import getMoviesList from '../apis/getComingSoonMovies';
import getComingSoonDramas from '../apis/getComingSoonDramas';
import searchDramas from '../apis/searchDramas';
import searchMovies from '../apis/searchMovies';
import DramaListItem from '../components/dramaItem';
import WaitingAlert from '../components/waitingAlert';
import Banner from '../ads/Banner';

const GamesList = () => {
  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [dramas, setDramas] = useState([]);
  const [dramaPage, setDramaPage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(true);
  const [dramasLoading, setDramasLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setMoviesLoading(true);
      const moviesList = await getMoviesList(moviePage);
      setMovies(moviesList.results);
      setMoviesLoading(false);
    })();
    (async () => {
      setDramasLoading(true);
      const dramasList = await getComingSoonDramas(dramaPage);
      setDramas(dramasList.results);
      setDramasLoading(false);
    })();
  }, []);

  const [searchText, setSearchText] = useState('');

  const searchDramaMovieHandler = async text => {
    console.log('searchDramaMovieHandler' + text);
    if (text.length > 0) {
      if (selectedMovie) {
        setMoviesLoading(true);
        setMoviePage(1);
        const moviesList = await searchMovies(text, 1);
        setMovies(moviesList.results);
        setMoviesLoading(false);
      } else {
        setDramasLoading(true);
        setDramaPage(1);
        const dramasList = await searchDramas(text, 1);
        setDramas(dramasList.results);
        setDramasLoading(false);
      }
    } else if (text.length === 0) {
      if (selectedMovie) {
        setMoviesLoading(true);
        const moviesList = await getMoviesList(moviePage);
        setMovies(moviesList.results);
        setMoviesLoading(false);
      } else {
        setDramasLoading(true);
        const dramasList = await getComingSoonDramas(dramaPage);
        setDramas(dramasList.results);

        setDramasLoading(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        {selectedMovie ? (
          <WaitingAlert visible={moviesLoading} />
        ) : (
          <WaitingAlert visible={dramasLoading} />
        )}
        <InputComponent
          placeholder={'Search'}
          onChangeText={text => {
            searchDramaMovieHandler(text);
            setSearchText(text);
          }}
          value={searchText}
        />
        <View style={{height: 20}} />
        <ToggleButton
          movie={selectedMovie}
          onPress={flag => {
            if (flag !== selectedMovie) {
              setSelectedMovie(flag);
              setSearchText('');
            }
          }}
        />
        <View style={{height: 20}} />
        <Banner />
        <View style={{height: 20}} />
      </View>

      {selectedMovie ? (
        <FlatList
          data={movies}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.contentContainer}
          renderItem={({item}) => <MovieListItem {...item} />}
          keyExtractor={item => item.id}
          style={styles.container}
          onEndReached={() => {
            setMoviePage(moviePage + 1);
            (async () => {
              setMoviesLoading(true);
              if (searchText.length > 0) {
                const moviesList = await searchMovies(searchText, moviePage);
                setMovies([...movies, ...moviesList.results]);
                setMoviesLoading(false);
                return;
              }
              const moviesList = await getMoviesList(moviePage);
              setMovies([...movies, ...moviesList.results]);
              setMoviesLoading(false);
            })();
          }}
        />
      ) : (
        <FlatList
          data={dramas}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.contentContainer}
          renderItem={({item}) => <DramaListItem {...item} />}
          keyExtractor={item => item.id}
          style={styles.container}
          onEndReached={() => {
            setDramaPage(dramaPage + 1);
            (async () => {
              setDramasLoading(true);
              if (searchText.length > 0) {
                const dramasList = await searchDramas(searchText, dramaPage);
                setDramas([...dramas, ...dramasList.results]);
                setDramasLoading(false);
                return;
              }
              const dramasList = await getComingSoonDramas(dramaPage);
              setDramas([...dramas, ...dramasList.results]);
              setDramasLoading(false);
            })();
          }}
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
