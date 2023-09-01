// import {View, Text} from 'react-native';
// import React from 'react';
// import LinearGradient from 'react-native-linear-gradient';

// import styles from './style';

// const SpeechToText = () => {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['white', '#e3d8f2']}
//         style={styles.container}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 1}}>
//         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//           <Text style={{color: '#000'}}>Speech To Text</Text>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// };

// export default SpeechToText;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'; //@ts-ignore
import Voice from '@react-native-community/voice';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const SpeechToText = () => {
  const isFocused = useIsFocused();
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [isFocused]);

  const speechToTextStartHandler = (e:any) => {
    console.log('speechStart successful', e);
  };
  const speechToTextEndHandler = (e:any) => {
    setLoading(false);
    console.log('stop handler', e);
  };
  const speechToTextResultsHandler = (e:any) => {

    console.log("WTF is wrong");
    

    const text = e.value[0];
    setResult(text);
    console.log('================= tesxt ===================');
    console.log(text);
    console.log('====================================');
  };
  const startSpeechRecording = async () => {

    setLoading(true);
    try {
      await Voice.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopSpeechRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
      Voice.destroy().then(Voice.removeAllListeners)
    } catch (error) {
      console.log('error', error);
    }
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  };
  const clear = () => {
    setResult('');
  };
  useEffect(() => {

    console.log("useefecdfvsd")

    Voice.onSpeechStart = speechToTextStartHandler;
    Voice.onSpeechEnd = speechToTextEndHandler;
    Voice.onSpeechResults = speechToTextResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>
          <Text style={{color: '#000'}}>{result}</Text>
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startSpeechRecording} style={styles.speak}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Speak</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.stop} onPress={stopSpeechRecording}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Stop</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.clear} onPress={clear}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Clear</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});
export default SpeechToText;
