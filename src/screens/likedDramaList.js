import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import DramaListItem from '../components/dramaItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as COLORS from '../constants/colors';
import {useIsFocused} from '@react-navigation/native';

const LikedDramas = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const likedMovies = await AsyncStorage.getItem('favouritedramas');
      if (likedMovies !== null) {
        const likedMoviesJson = JSON.parse(likedMovies);
        setLikedMovies(likedMoviesJson);
      }
    })();
  }, [isFocused]);
  return likedMovies.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={styles.noLikedMoviesText}>No Liked Dramas</Text>
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
        renderItem={({item}) => <DramaListItem {...item} />}
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
  noLikedMoviesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
  contentContainer: {
    justifyContent: 'space-evenly',
  },
});

export default LikedDramas;
