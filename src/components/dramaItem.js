import React, {useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Text from './text';
import * as COLORS from '../constants/colors';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import reverseDate from '../utils/reverseDate';
import {IMAGE_URL} from '../constants/apiKeys';

const DramaListItem = props => {
  const navigation = useNavigation();
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <TouchableOpacity
      key={props.id}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('DramaDetailScreen', {
          dramaDetail: props,
        });
      }}
      style={styles.container}>
      <Image
        source={{uri: IMAGE_URL + props.poster_path}}
        style={{
          height: 250,
          width: '100%',
          resizeMode: 'stretch',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
        }}
      />
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Text style={styles.name} numberOfLines={1}>
            {props.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="star" size={20} color={'#F5B642'} />
              <Text style={styles.phone}>{'  ' + props.vote_average}</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 310,
    width: '45%',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginBottom: 15,
  },
  profileContainer: {
    padding: 10,
    paddingLeft: 5,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  profileDetails: {
    marginLeft: 0,
    //justifyContent: 'center',
    //backgroundColor: 'red',
    height: 100,
    width: '100%',
    justifyContent: 'center',
    padding: 0,
  },
  name: {
    color: COLORS.textColor,
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  phone: {
    color: COLORS.textLight,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  iconContainer: {
    backgroundColor: COLORS.imageBackgroundColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: COLORS.imageBackgroundColor,
  },
});

export default DramaListItem;
