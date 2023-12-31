import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
  // TextInput
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {TextInput} from 'react-native-paper'; //@ts-ignore
import Icon from 'react-native-vector-icons/Octicons'; //@ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute, useIsFocused} from '@react-navigation/native';
import Voice from '@react-native-community/voice';
import NetInfo from '@react-native-community/netinfo';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import LoadingView from '../../components/loadingView/loadingView';

const Home = () => {
  const isFocused = useIsFocused();
  const textInputRef = useRef(null);
  const route = useRoute();

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [newWord, setNewWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [definitionArr, setDefinitionArr] = useState('');
  const [partsOfSpeech, setPartsOfSpeech] = useState('');
  const [example, setExample] = useState('');
  const [res, setRes] = useState('');
  const [wordExist, setWordExist] = useState(false);
  const [state, setState] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const [inputValidation, setInputValidation] = useState('');
  const [internet, setInternet] = useState(false);

  useEffect(() => {
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
  }, []);

  useEffect(() => {
    if (isFocused) {
      checkInternet();
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [isFocused]);

  const checkInternet = () => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Network state changed', state);
      setInternet(state?.isConnected);
    });
    // Unsubscribe
    return () => {
      unsubscribe();
    };
  };

  const focusTextInput = () => {
    if (textInputRef.current) {
      //@ts-ignore
      textInputRef.current.focus();
    }
  };

  const searchWord = (enteredWord: any) => {
    // getInfo();
    setNewWord(enteredWord);
  };

  const LoadWordFromDiffScreem = async (item: any) => {
    if (internet) {
      setBookmark(false);
      setRes('loading');
      setInputValidation('false');

      var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+item;

      return fetch(url)
        .then(data => {
          return data.json();
        })
        .then(response => {
          setRes('');
          setState(true);
          storingWords(newWord);
          bookmarkHandle(newWord);
          if (
            response.message ==
            "Sorry pal, we couldn't find definitions for the word you were looking for."
          ) {
            console.log('Not found');
            setWordExist(false);
          } else {
            setWordExist(true);

            var word = response[0].word;
            setCheckedWord(word);

            var defs = response[0].meanings[0].definitions;
            setDefinitionArr(defs);

            defs.forEach((element: any) => {
              console.log(element);
            });

            var pos = response[0].meanings[0].partOfSpeech;
            setPartsOfSpeech(pos);

            var eg = response[0].meanings[0].definitions[0].example;
            setExample(eg);
          }
        })
        .catch(e => {
          console.log('Catch error == > ', e);
        });
    } else {
      Alert.alert('Connect to internet');
    }
  };

  const getInfo = () => {
    if (internet) {
      setSpeaking(true);
      if (newWord == '') {
        setInputValidation('true');
      } else {
        setRes('loading');
        setInputValidation('false');

        var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord;

        return fetch(url)
          .then(data => {
            return data.json();
          })
          .then(response => {
            setRes('');
            setState(true);
            storingWords(newWord);
            bookmarkHandle(newWord);
            if (
              response.message ==
              "Sorry pal, we couldn't find definitions for the word you were looking for."
            ) {
              console.log('Not found');
              setWordExist(false);
            } else {
              setWordExist(true);

              var word = response[0].word;
              setCheckedWord(word);

              var defs = response[0].meanings[0].definitions;
              setDefinitionArr(defs);

              defs.forEach((element: any) => {
                console.log(element);
              });

              var pos = response[0].meanings[0].partOfSpeech;
              setPartsOfSpeech(pos);

              var eg = response[0].meanings[0].definitions[0].example;
              setExample(eg);
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    } else {
      Alert.alert('Connect to Internet');
    }
  };

  const speak = () => {
    Tts.getInitStatus()
      .then(() => {
        if (checkedWord) {
          Tts.speak(checkedWord);
        } else {
          Tts.speak('Search, SomeThing!');
        }
      })
      .catch(err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });
  };

  const clear = () => {
    setCheckedWord('');
    setExample('');
    setNewWord('');
    setRes('');
    setState(false);
    setWordExist(false);
    // setInputValidation('');
    setBookmark(false);
    setDefinitionArr('');
    setPartsOfSpeech('');
    Voice.destroy().then(Voice.removeAllListeners);
    if (textInputRef.current == null) {
    } else {
      //@ts-ignore
      textInputRef.current.blur();
    }
  };

  const storingWords = async (searchTerm: any) => {
    if (searchTerm.trim() !== '') {
      try {
        const historyData = await AsyncStorage.getItem('searchHistory');
        const history = historyData ? JSON.parse(historyData) : [];

        // Check if the word already exists in history
        if (!history.includes(searchTerm)) {
          history.unshift(searchTerm); // Add the new search term to the beginning
          await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
        }
      } catch (error) {
        console.error('Error updating search history:', error);
      }
    }
  };

  const storingBookMark = async (searchTerm: any) => {
    if (searchTerm.trim() !== '') {
      try {
        const bookMarkData = await AsyncStorage.getItem('bookMark');
        const bookMarkString = bookMarkData ? JSON.parse(bookMarkData) : [];

        // Check if the word already exists in history
        if (!bookMarkString.includes(searchTerm)) {
          bookMarkString.unshift(searchTerm); // Add the new search term to the beginning
          await AsyncStorage.setItem(
            'bookMark',
            JSON.stringify(bookMarkString),
          );
        }
        setBookmark(true);
        Alert.alert('Info', 'Word Added In Bookmark', [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
          },
        ]);
      } catch (error) {
        console.error('Error updating Bookmark:', error);
      }
    }
  };

  const bookmarkHandle = async (Item: any) => {
    try {
      await setBookmark(false);
      const historyData = await AsyncStorage.getItem('bookMark');
      const history = historyData ? JSON.parse(historyData) : [];

      const lowercaseSearchTerm = Item.toLowerCase();

      let bool = false;
      history.some((item: any) => {
        item.toLowerCase() === lowercaseSearchTerm;
        if (item == lowercaseSearchTerm) {
          setBookmark(true);
          bool = true;
          return;
        }
      });
      if (bool == false) {
        setBookmark(false);
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  useEffect(() => {
    //@ts-ignore
    if (route.params && route.params.selectedWord) {
      //@ts-ignore
      setNewWord(route.params.selectedWord);
      setBookmark(false); //@ts-ignore
      LoadWordFromDiffScreem(route.params.selectedWord);
    }
  }, [route.params]);

  // const [result, setResult] = useState('');
  const [speaking, setSpeaking] = useState(true);

  const speechStartHandler = (e: any) => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = (e: any) => {
    setSpeaking(false);
    console.log('stop handler', e);
  };
  const speechResultsHandler = (e: any) => {
    const text = e.value[0];
    setNewWord(text);
    // setResult(text);
  };
  const startRecording = async () => {
    setSpeaking(false);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setSpeaking(true);
    } catch (error) {
      console.log('error', error);
    }
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  };

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // const clearVoice = () => {
  //   setResult('');
  // };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['white', '#b6a1d4']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{marginHorizontal: 20, flex: 1}}>
          <View
            style={{
              height: 220,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <View style={{marginVertical: 20}}>
              <Image
                style={{height: 100, width: 200}}
                source={require('../../assests/Images/Group_Gray.png')}
              />
            </View>
            <View style={styles.parent}>
              <TextInput
                label="Search a word"
                value={newWord}
                onChangeText={searchWord}
                ref={textInputRef}
                mode="outlined"
                onEndEditing={() => {
                  getInfo();
                }}
                style={[styles.textInput, {}]}
                textColor="#000"
                theme={{colors: {primary: '#1e0342'}}}
                outlineStyle={{
                  borderWidth: 2,
                  borderColor:
                    inputValidation == 'true' || inputValidation == undefined
                      ? 'red'
                      : '#000',
                  borderRadius: 10,
                }}
                // caretHidden={true}
              />
              {speaking ? (
                <TouchableOpacity
                  style={{marginTop: 10, marginLeft: 5}}
                  onPress={startRecording}>
                  <MaterialIcons name="mic" color="#000" size={40} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{marginTop: 10, marginLeft: 5}}
                  onPress={stopRecording}>
                  <MaterialIcons name="pause" color="red" size={40} />
                </TouchableOpacity>
              )}
            </View>
            {inputValidation == 'true' || inputValidation == undefined ? (
              <View style={{marginTop: 10}}>
                <Text style={{color: 'red', fontWeight: 'bold', fontSize: 16}}>
                  "Search Input is Empty"
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{marginRight: 10, height: 60}}>
            <View
              style={{
                // flex:1,
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  getInfo();
                }}>
                <Image
                  style={styles.speakerButton}
                  source={require('../../assests/Images/search.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  clear();
                }}>
                <Image
                  style={styles.speakerButton}
                  source={require('../../assests/Images/delete.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  speak();
                }}>
                <Image
                  style={styles.speakerButton}
                  source={require('../../assests/Images/speak.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {res == 'loading' ? (
            <LoadingView />
          ) : (
            <>
              {state == false ? (
                <View style={styles.initialContainer}>
                  <View style={{}}>
                    <View style={{alignItems: 'center'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 19,
                          fontStyle: 'italic',
                          fontWeight: 'bold',
                        }}>
                        Defination(s) will appear here!
                      </Text>
                      <TouchableOpacity onPress={focusTextInput}>
                        <Text
                          style={{
                            color: '#0ca8eb',
                            margin: 10,
                            fontSize: 17,
                            fontStyle: 'italic',
                          }}>
                          Tap Here Start Exploration
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <>
                  {wordExist == false ? (
                    <View style={styles.initialContainer}>
                      <ScrollView style={{}}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 19,
                              fontStyle: 'italic',
                              fontWeight: 'bold',
                            }}>
                            Oops! This word does not exist
                          </Text>
                          <TouchableOpacity onPress={focusTextInput}>
                            <Text
                              style={{
                                color: '#0ca8eb',
                                margin: 10,
                                fontStyle: 'italic',
                                fontSize: 17,
                              }}>
                              Tap to try another word
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: '45%',
                        borderWidth: 2,
                        marginHorizontal: 15,
                        marginVertical: 22,
                        borderRadius: 10,
                        shadowColor: 'rgba(0,0,0, .9)', // IOS
                        backgroundColor: '#fff',
                        elevation: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#ad95cf',
                          height: 45,
                          width: '100%',
                          borderTopRightRadius: 8,
                          borderTopLeftRadius: 8,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            padding: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <View
                            style={{
                              width: '80%',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                              }}>
                              Word -
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 24,
                                fontStyle: 'italic',
                                fontWeight: 'bold',
                                marginTop: -3,
                              }}>
                              {' '}
                              "{checkedWord}"
                            </Text>
                          </View>
                          {bookmark ? (
                            <TouchableOpacity
                              style={{}}
                              onPress={() => storingBookMark(checkedWord)}>
                              <MaterialIcons
                                name="favorite"
                                color={'black'}
                                size={20}
                              />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{}}
                              onPress={() => storingBookMark(checkedWord)}>
                              <MaterialIcons
                                name="favorite-border"
                                color={'#000'}
                                size={20}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                      <ScrollView
                        style={{marginHorizontal: 10, marginBottom: 15}}>
                        <View style={{marginHorizontal: 5, marginRight: 10}}>
                          <View
                            style={{flexDirection: 'row', marginVertical: 10}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                              }}>
                              Parts of Speech -
                            </Text>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontStyle: 'italic',
                              }}>
                              {'  '}
                              {partsOfSpeech}
                            </Text>
                          </View>
                          <View style={{marginRight: 30, marginVertical: 10}}>
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginBottom: 10,
                              }}>
                              Definitions :
                            </Text>
                            {definitionArr?.length != 0 &&
                            definitionArr != undefined ? (
                              <View>
                                {/*@ts-ignore*/}
                                {definitionArr.map((item: any, index: any) => (
                                  <View
                                    style={{flexDirection: 'row', margin: 5}}>
                                    <View
                                      style={{marginTop: 2, marginRight: 10}}>
                                      <Icon
                                        name="dot-fill"
                                        size={15}
                                        color="#000"></Icon>
                                    </View>
                                    <View>
                                      <Text
                                        key={index}
                                        style={{
                                          color: 'black',
                                          fontSize: 16,
                                          fontStyle: 'italic',
                                        }}>
                                        {item?.definition}
                                      </Text>
                                    </View>
                                  </View>
                                ))}
                              </View>
                            ) : null}
                          </View>
                          {example == '' || example == undefined ? null : (
                            <View style={{marginRight: 30, marginVertical: 10}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 20,
                                  fontWeight: 'bold',
                                  marginBottom: 10,
                                }}>
                                Examples :
                              </Text>
                              {definitionArr?.length != 0 &&
                              definitionArr != undefined ? (
                                <View>
                                  {/*@ts-ignore*/}
                                  {definitionArr.map(
                                    (item: any, index: any) => (
                                      <View>
                                        {item?.example == '' ||
                                        item?.example == undefined ? null : (
                                          <View
                                            style={{
                                              flexDirection: 'row',
                                              margin: 5,
                                            }}>
                                            <View
                                              style={{
                                                marginTop: 2,
                                                marginRight: 10,
                                              }}>
                                              <Icon
                                                name="arrow-right"
                                                size={15}
                                                color="#000"></Icon>
                                            </View>
                                            <View>
                                              <Text
                                                key={index}
                                                style={{
                                                  color: 'black',
                                                  fontSize: 16,
                                                  fontStyle: 'italic',
                                                }}>
                                                {item?.example}
                                              </Text>
                                            </View>
                                          </View>
                                        )}
                                      </View>
                                    ),
                                  )}
                                </View>
                              ) : null}
                            </View>
                          )}
                        </View>
                      </ScrollView>
                    </View>
                  )}
                </>
              )}
            </>
          )}
          {internet ? (
            <>
              {speaking ? (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    // marginTop: -10,
                  }}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    (Tip : Press the Mic to Speak the word you want to search)
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'red', fontSize: 14}}>
                    (Tip : press pause to stop speaking)
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                Please check your Internet Connection
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
