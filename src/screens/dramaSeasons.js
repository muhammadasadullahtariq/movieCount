import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DramaSeasons = props => {
  const navigation = useNavigation();
  const [dramaName, setDramaName] = useState(props.route.params.dramaName);
  const [dramaSeasons, setDramaSeasons] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: dramaName,
    });
    (async () => {
      const season = await AsyncStorage.getItem(dramaName);
      if (season !== null) {
        const seasonJson = JSON.parse(season);
        console.log(seasonJson);
        setDramaSeasons(seasonJson);
      }
    })();
  }, []);

  return (
    <FlatList
      data={dramaSeasons}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <TouchableOpacity
          style={[
            styles.bodyContentItem,
            {
              marginBottom: dramaSeasons.length - 1 === index ? 40 : 10,
            },
          ]}
          onPress={() => {
            navigation.navigate('DramaEpisodes', {
              dramaName: dramaName,
              seasonNumber: index,
            });
          }}>
          <Text style={styles.bodyContentItemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.season}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  body: {
    flex: 9,
  },
  bodyHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyHeaderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyContent: {
    flex: 9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  bodyContentItem: {
    width: '97%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  bodyContentItemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  bodyContentItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DramaSeasons;
