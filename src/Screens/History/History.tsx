import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'; //@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import styles from './style';

const History = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    if (isFocused) {
      loadSearchHistory();
    }
  }, [isFocused]);

  const loadSearchHistory = async () => {
    try {
      const historyData = await AsyncStorage.getItem('searchHistory');
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const handleNavigateToHome = (selectedWord: any) => {
    //@ts-ignore
    navigation.navigate('Home', {selectedWord}); // Navigate to Home and pass the selected word
  };

  const handleDeleteItem = async (itemToDelete: any) => {
    try {
      const bookmarkData = await AsyncStorage.getItem('searchHistory');
      const boomarkString = bookmarkData ? JSON.parse(bookmarkData) : [];
      const updatedBookmark = boomarkString.filter(
        (item: any) => item !== itemToDelete,
      );
      setHistory(updatedBookmark);
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedBookmark),
      );
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleExplore = () => {
    //@ts-ignore
    navigation.navigate('Home'); // Navigate to Home and pass the selected word
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fff', '#e3d8f2']}
        style={styles.innerContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{flex: 1, marginBottom: 30}}>
          {history.length == 0 ||
          history.length == undefined ||
          history == undefined ? (
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
                  Words that you Explored
                </Text>
              </View>
              <View style={{marginBottom: 20, height: screenHeight / 1.4}}>
                <FlatList
                  data={history}
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
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}>
                <Text
                  style={{color: '#f04141', fontSize: 20, fontWeight: 'bold'}}
                  onPress={handleDeleteAll}>
                  Clear History
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default History;
