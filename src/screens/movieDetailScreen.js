//screen to show the details of the movie
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import getMoviesGener from '../apis/getMoviesGener';
import getMovieCast from '../apis/getMoviesCast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as COLORS from '../constants/colors';
import WaitingAlert from '../components/waitingAlert';
import appInterstitial from '../ads/Interstitial';

const MovieDetailScreen = props => {
  const navigation = useNavigation();
  const [movieDetail, setMovieDetail] = useState(
    props.route.params.movieDetail,
  );
  const [favouriteMovieFlag, setFavouriteMovieFlag] = useState(false);
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: movieDetail.title,
    });
    appInterstitial(() => {});
    (async () => {
      const favouriteMovies = await AsyncStorage.getItem('favouriteMovies');
      if (favouriteMovies !== null) {
        const favouriteMoviesJson = JSON.parse(favouriteMovies);
        if (favouriteMoviesJson.find(movie => movie.id === movieDetail.id)) {
          setFavouriteMovieFlag(true);
        }
      }
    })();
    (async () => {
      const gener = await getMoviesGener(movieDetail.id);
      setLoading(false);
      setMovieDetail(gener);
      const cast = await getMovieCast(movieDetail.id);
      setMovieCast(cast.cast);
    })();
  }, []);

  //store favourite movie
  const favouriteMovieHandler = async () => {
    const favouriteMovies = await AsyncStorage.getItem('favouriteMovies');
    if (favouriteMovies !== null) {
      const favouriteMoviesJson = JSON.parse(favouriteMovies);
      if (favouriteMoviesJson.find(movie => movie.id === movieDetail.id)) {
        const newFavouriteMovies = favouriteMoviesJson.filter(
          movie => movie.id !== movieDetail.id,
        );
        await AsyncStorage.setItem(
          'favouriteMovies',
          JSON.stringify(newFavouriteMovies),
        );
      } else {
        const newFavouriteMovies = [...favouriteMoviesJson, movieDetail];
        await AsyncStorage.setItem(
          'favouriteMovies',
          JSON.stringify(newFavouriteMovies),
        );
      }
    } else {
      const newFavouriteMovies = [movieDetail];
      await AsyncStorage.setItem(
        'favouriteMovies',
        JSON.stringify(newFavouriteMovies),
      );
    }
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <WaitingAlert />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`,
          }}
        />
        {/**favourite movie icon */}
        <TouchableOpacity
          style={styles.favouriteIcon}
          onPress={() => {
            favouriteMovieHandler();
            setFavouriteMovieFlag(!favouriteMovieFlag);
          }}>
          <Icon
            name="heart"
            size={30}
            color={favouriteMovieFlag ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.overview}>{movieDetail.overview}</Text>
        <View style={{height: 10}} />
        <Text style={styles.releaseDate}>
          <Text style={{fontWeight: 'bold'}}>Release Date:</Text>{' '}
          {movieDetail.release_date}
        </Text>
        <Text style={styles.voteAverage}>
          <Text style={{fontWeight: 'bold'}}>Vote Average: </Text>
          {movieDetail.vote_average}
        </Text>
        <Text style={styles.voteCount}>
          <Text style={{fontWeight: 'bold'}}>Vote Count:</Text>{' '}
          {movieDetail.vote_count}
        </Text>
        <Text style={styles.popularity}>
          <Text style={{fontWeight: 'bold'}}>Popularity:</Text>{' '}
          {movieDetail.popularity}
        </Text>
        <Text style={styles.popularity}>
          <Text style={{fontWeight: 'bold'}}>Original Language:</Text>{' '}
          {movieDetail.original_language}
        </Text>
        <Text style={styles.popularity}>
          <Text style={{fontWeight: 'bold'}}>Original Title:</Text>{' '}
          {movieDetail.original_title}
        </Text>
      </View>
      <View style={styles.castContainer}>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={{height: 10}} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{}}
          horizontal={true}>
          {movieCast.map((cast, index) => {
            return (
              <View key={index} style={styles.cast}>
                <Image
                  style={styles.castImage}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
                  }}
                />
                <Text style={styles.castName} numberOfLines={2}>
                  {cast.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.generContainer}>
        <Text style={styles.generTitle}>Gener</Text>
        <View style={{height: 10}} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
          horizontal={true}>
          {movieDetail?.genres?.map((gener, index) => {
            return (
              <View key={index} style={styles.gener}>
                <Text style={styles.generName}>{gener.name}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{height: 50}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.screenBackGroundColor,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  textContainer: {
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
  },
  releaseDate: {
    fontSize: 16,
  },
  voteAverage: {
    fontSize: 16,
  },
  voteCount: {
    fontSize: 16,
  },
  popularity: {
    fontSize: 16,
  },
  castContainer: {
    width: '100%',
    padding: 10,
  },
  castTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  castList: {
    flexDirection: 'row',
    alignItems: 'center',
    //flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cast: {
    width: 100,
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    margin: 5,
  },
  castImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  castName: {
    fontSize: 16,
    textAlign: 'center',
  },
  generContainer: {
    width: '100%',
    padding: 10,
  },
  generTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  gener: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLORS.secondryColor,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  generName: {
    fontSize: 16,
    textAlign: 'center',
  },
  favouriteIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default MovieDetailScreen;
