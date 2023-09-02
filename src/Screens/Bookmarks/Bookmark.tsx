import {View, Text, FlatList, TouchableOpacity, Button, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native'; //@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NetInfo from '@react-native-community/netinfo';

import styles from './style';

const BookMark = () => {
  const navigation = useNavigation();
  const [BookMark, setBookMark] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadBookMark();
    }
  }, [isFocused]);

  const handleDeleteItem = async (itemToDelete: any) => {
    try {
      const bookmarkData = await AsyncStorage.getItem('bookMark');
      const boomarkString = bookmarkData ? JSON.parse(bookmarkData) : [];
      const updatedBookmark = boomarkString.filter(
        (item: any) => item !== itemToDelete,
      );
      setBookMark(updatedBookmark);
      await AsyncStorage.setItem('bookMark', JSON.stringify(updatedBookmark));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const loadBookMark = async () => {
    try {
      const historyData = await AsyncStorage.getItem('bookMark');
      if (historyData) {
        setBookMark(JSON.parse(historyData));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const handleNavigateToHome = (selectedWord: any) => {
    //@ts-ignore
    navigation.navigate('Home', {selectedWord}); // Navigate to Home and pass the selected word
  };

  const handleExplore = () => {
    //@ts-ignore
    navigation.navigate('Home'); // Navigate to Home and pass the selected word
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['white', '#e3d8f2']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{flex: 1}}>
          {BookMark.length == 0 ||
          BookMark.length == undefined ||
          BookMark == undefined ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  style={{height: 200, width: 250}}
                  source={require('../../assests/Images/ImageWithoutBG.png')}
                />
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{color: 'black', fontSize: 20, marginVertical: 20}}>
                  Start Exporing the world of words
                </Text>
                <TouchableOpacity onPress={handleExplore}>
                  <Text style={{color: '#0ca8eb', fontSize: 18}}>
                    Click Here to Explore
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 30,
                }}>
                <Text
                  style={{color: 'black', fontWeight: 'bold', fontSize: 25}}>
                  Words that you Marked
                </Text>
              </View>
              <View style={{}}>
                <FlatList
                  data={BookMark}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View
                      style={{
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        marginHorizontal: 30,
                      }}>
                      <TouchableOpacity
                        onPress={() => handleNavigateToHome(item)}
                        style={{
                          margin: 10,
                          padding: 8,
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            marginLeft: 10,
                            color: 'black',
                            fontSize: 15,
                            width: '10%',
                          }}>
                          {index + 1} .
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            marginLeft: 10,
                            fontSize: 15,
                            fontStyle: 'italic',
                            fontWeight: '500',
                            width: '70%',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteItem(item)}
                        style={{
                          width: '10%',
                          marginTop: 25,
                        }}>
                        <MaterialIcons
                          name="delete"
                          color={'#e86464'}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default BookMark;
