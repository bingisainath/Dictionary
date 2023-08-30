import {View, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';

const SpeechToText = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['white', '#e3d8f2']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: '#000'}}>Speech To Text</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SpeechToText;
