import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';

const History = () => {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const isFocused = useIsFocused();

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

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fff', '#e3d8f2']}
        style={styles.innerContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{flex: 1,marginBottom:30}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 25}}>
              Words that you Explored
            </Text>
          </View>
          <View style={{marginBottom:20}}>
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
                  {/* <TouchableOpacity
                    onPress={() => handleDeleteItem(item)}
                    style={{
                      width: '10%',
                      marginTop: 25,
                    }}>
                    <MaterialIcons name="delete" color={'#000'} size={20} />
                  </TouchableOpacity> */}
                </View>
              )}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default History;
