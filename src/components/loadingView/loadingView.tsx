import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

import styles from './style';

const LoadingView = () => {
  return (
    <View style={styles.loadingContainer}>
      <View
        style={{
          backgroundColor: '#ad95cf',
          height: '15%',
          width: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
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
              Please wait ...
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: '85%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </View>
  );
};

export default LoadingView;
