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
  // TextInput
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/Octicons';

import Tts from 'react-native-tts';

const Home = () => {
  const textInputRef = useRef(null);

  const [newWord, setNewWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [definitionArr, setDefinitionArr] = useState('');
  const [partsOfSpeech, setPartsOfSpeech] = useState('');
  const [example, setExample] = useState('');
  const [res, setRes] = useState('');
  const [wordExist, setWordExist] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
  }, []);

  const focusTextInput = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const searchWord = (enteredWord: any) => {
    // getInfo();
    setNewWord(enteredWord);
  };

  const getInfo = () => {
    setRes('loading');

    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord;

    return fetch(url)
      .then(data => {
        return data.json();
      })
      .then(response => {
        setRes('');
        setState(true);
        console.log('=================== res =================');
        console.log(response);
        console.log('====================================');
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

          var def = response[0].meanings[0].definitions[0].definition;
          setDefinition(def);

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
    setDefinition('');
    setExample('');
    setNewWord('');
    setRes('');
    setState(false);
    setWordExist(false);
  };
  const dataArray = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginHorizontal: 20, height: '100%'}}>
        <View
          style={{
            height: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          <View style={styles.parent}>
            <TextInput
              label="Search a word..."
              value={newWord}
              onChangeText={searchWord}
              ref={textInputRef}
              mode="outlined"
              onEndEditing={() => getInfo()}
              style={styles.textInput}
              // caretHidden={true}
            />
          </View>
        </View>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <View
            style={{
              height: 55,
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
          <View
            style={{
              height: '60%',
              borderWidth: 2,
              marginHorizontal: 15,
              marginVertical: 22,
              borderRadius: 5,
              shadowColor: 'rgba(0,0,0, .9)', // IOS
              backgroundColor: '#fff',
              elevation: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ) : (
          <>
            {state == false ? (
              <View
                style={{
                  height: '60%',
                  borderWidth: 2,
                  marginHorizontal: 15,
                  marginVertical: 22,
                  borderRadius: 5,
                  shadowColor: 'rgba(0,0,0, .9)', // IOS
                  backgroundColor: '#fff',
                  elevation: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
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
            ) : (
              <>
                {wordExist == false ? (
                  <View
                    style={{
                      height: '60%',
                      borderWidth: 2,
                      marginHorizontal: 15,
                      marginVertical: 22,
                      borderRadius: 5,
                      shadowColor: 'rgba(0,0,0, .9)', // IOS
                      backgroundColor: '#fff',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
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
                      height: '60%',
                      borderWidth: 2,
                      marginHorizontal: 15,
                      marginVertical: 22,
                      borderRadius: 10,
                      shadowColor: 'rgba(0,0,0, .9)', // IOS
                      backgroundColor: '#fff',
                      elevation: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#9b75e6',
                        height: 45,
                        width: '100%',
                        borderTopRightRadius: 8,
                        borderTopLeftRadius: 8,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          padding: 10,
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
                            fontSize: 20,
                            fontStyle: 'italic',
                          }}>
                          {'  '}"{checkedWord}"
                        </Text>
                      </View>
                    </View>
                    <ScrollView style={{marginHorizontal: 10}}>
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
                              {definitionArr.map((item: any, index: any) => (
                                <View style={{flexDirection: 'row', margin: 5}}>
                                  <View style={{marginTop: 2, marginRight: 10}}>
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
                                {definitionArr.map((item: any, index: any) => (
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
                                ))}
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
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageDesign: {
    width: '80%',
    height: '120%',
    marginLeft: 50,
    marginTop: 30,
  },
  inputBox: {
    textAlign: 'center',
    justifyContent: 'center',
    height: 55,
    fontSize: 23,
  },
  buttonDesign: {
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    backgroundColor: '#fff',
    elevation: 10,
    height: 50,
    width: 106,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  // buttonText: {
  //   // fontSize: 1,
  //   alignSelf: 'center',
  //   marginTop: 5,
  //   color:'red'
  // },
  speakerButton: {
    width: 20,
    height: 20,
  },
  textDesign: {
    fontSize: 25,
    // backgroundColor: 'rgba(80, 235, 236,0.3)',
    marginTop: 10,
    alignSelf: 'center',
  },
  closeButton: {
    height: 25,
    width: 25,
    padding: 10,
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    // right: 35,
    // top: 2,
    backgroundColor: 'red',
    borderWidth: 2,
  },
  parent: {
    width: '95%',
    flexDirection: 'row',
    marginTop: 50,
  },
  textInput: {
    // height: 50,
    // width: '100%',
    flex: 1,
    textAlign: 'center',
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 0,
    // backgroundColor: '#fff',
    // color: '#424242',
  },
});
