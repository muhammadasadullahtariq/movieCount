import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const DramaEpisodes = props => {
  const navigation = useNavigation();
  const [dramaDetail, setDramaDetail] = useState({
    name: props.route.params.dramaName,
    season: props.route.params.seasonNumber,
  });
  const [episodes, setEpisodes] = useState([]);
  const [dramaSeasons, setDramaSeasons] = useState([]);

  useEffect(() => {
    navigation.setOptions({title: dramaDetail.name});
    (async () => {
      const episodes = await AsyncStorage.getItem(dramaDetail.name);
      if (episodes !== null) {
        const episodesJson = await JSON.parse(episodes);
        setDramaSeasons(episodesJson);
        setEpisodes(episodesJson[dramaDetail.season]);
      }
    })();
  }, []);

  return (
    // <View style={styles.container}></View>
    <FlatList
      data={episodes?.episodes}
      renderItem={({item}) => (
        <View style={[styles.container]}>
          <Text style={styles.title}>Epsiode + {item.episode}</Text>
          <CheckBox
            animationDuration={0.5}
            value={item.watched}
            onValueChange={newValue => {
              item.watched = newValue;
              dramaSeasons[dramaDetail.season] = episodes;
              setDramaSeasons(dramaSeasons);
              AsyncStorage.setItem(
                dramaDetail.name,
                JSON.stringify(dramaSeasons),
              );
              console.log(episodes);
            }}
          />
        </View>
      )}
      keyExtractor={item => item.episode}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingVertical: 12,
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    width: '97%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DramaEpisodes;
