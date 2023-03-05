//screen to show the details of the drama
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import getdramasGener from '../apis/getDramaGener';
import getdramaCast from '../apis/getDramaCast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../components/button';
import * as COLORS from '../constants/colors';

const DramaDetailScreen = props => {
  const navigation = useNavigation();
  const [dramaDetail, setdramaDetail] = useState(
    props.route.params.dramaDetail,
  );
  const [favouritedramaFlag, setFavouritedramaFlag] = useState(false);
  const [dramaGener, setdramaGener] = useState([]);
  const [dramaCast, setdramaCast] = useState([]);
  const [dramaSeasons, setDramaSeasons] = useState();

  useEffect(() => {
    (async () => {
      const favouritedramas = await AsyncStorage.getItem('favouritedramas');
      if (favouritedramas !== null) {
        const favouritedramasJson = JSON.parse(favouritedramas);
        if (favouritedramasJson.find(drama => drama.id === dramaDetail.id)) {
          setFavouritedramaFlag(true);
        }
      }
    })();
    (async () => {
      const gener = await getdramasGener(dramaDetail.id);
      setdramaGener(gener.genres);
      setDramaSeasons(gener.seasons);
      const cast = await getdramaCast(dramaDetail.id);
      setdramaCast(cast.cast);
    })();
  }, []);

  //store favourite drama
  const favouritedramaHandler = async () => {
    const favouritedramas = await AsyncStorage.getItem('favouritedramas');
    if (favouritedramas !== null) {
      const favouritedramasJson = JSON.parse(favouritedramas);
      if (favouritedramasJson.find(drama => drama.id === dramaDetail.id)) {
        const newFavouritedramas = favouritedramasJson.filter(
          drama => drama.id !== dramaDetail.id,
        );
        await AsyncStorage.removeItem(dramaDetail.name);
        await AsyncStorage.setItem(
          'favouritedramas',
          JSON.stringify(newFavouritedramas),
        );
      } else {
        const newFavouritedramas = [...favouritedramasJson, dramaDetail];
        dramaSeasonsHandler();
        await AsyncStorage.setItem(
          'favouritedramas',
          JSON.stringify(newFavouritedramas),
        );
      }
    } else {
      const newFavouritedramas = [dramaDetail];
      dramaSeasonsHandler();
      await AsyncStorage.setItem(
        'favouritedramas',
        JSON.stringify(newFavouritedramas),
      );
    }
  };

  //store drama season with episode and status watched or not
  const dramaSeasonsHandler = async () => {
    dramaSeasons.forEach(element => {
      const array = [];
      for (let i = 1; i <= element.episode_count; i++) {
        array.push({episode: i, watched: false});
      }
      element.episodes = array;
    });
    const dramaSeasonsJson = JSON.stringify(dramaSeasons);
    await AsyncStorage.setItem(dramaDetail.name, dramaSeasonsJson);
  };

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${dramaDetail.poster_path}`,
          }}
        />
        {/**favourite drama icon */}
        <TouchableOpacity
          style={styles.favouriteIcon}
          onPress={() => {
            favouritedramaHandler();
            setFavouritedramaFlag(!favouritedramaFlag);
          }}>
          <Icon
            name="heart"
            size={30}
            color={favouritedramaFlag ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{dramaDetail.title}</Text>
        <Text style={styles.overview}>{dramaDetail.overview}</Text>
        <View style={{height: 10}} />
        <Text style={styles.releaseDate}>
          <Text style={{fontWeight: 'bold'}}>Release Date:</Text>{' '}
          {dramaDetail.release_date}
        </Text>
        <Text style={styles.voteAverage}>
          <Text style={{fontWeight: 'bold'}}>Vote Average: </Text>
          {dramaDetail.vote_average}
        </Text>
        <Text style={styles.voteCount}>
          <Text style={{fontWeight: 'bold'}}>Vote Count:</Text>{' '}
          {dramaDetail.vote_count}
        </Text>
        <Text style={styles.popularity}>
          <Text style={{fontWeight: 'bold'}}>Popularity:</Text>{' '}
          {dramaDetail.popularity}
        </Text>
      </View>
      {favouritedramaFlag && (
        <Button
          style={{margin: 10}}
          text={'Seasons'}
          onPress={() => {
            navigation.navigate('DramaSeasons', {
              dramaName: dramaDetail.name,
            });
          }}
        />
      )}
      <View style={styles.castContainer}>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={{height: 10}} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{}}
          horizontal={true}>
          {dramaCast.map((cast, index) => {
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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 10,
          }}
          horizontal={true}>
          {dramaGener.map((gener, index) => {
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
    flexWrap: 'wrap',
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

export default DramaDetailScreen;
