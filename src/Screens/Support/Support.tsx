import {View, Text, Animated, Image, Linking, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler'; //@ts-ignore
import StarRating from 'react-native-star-rating';
import Rate, {AndroidMarket} from 'react-native-rate';
import NetInfo from '@react-native-community/netinfo';
import {useRoute, useIsFocused} from '@react-navigation/native';

const Support = () => {
  const isFocused = useIsFocused();
  const [rating, setRating] = useState(0);
  const [internet, setInternet] = useState(false);

  useEffect(() => {
    if (isFocused) {
      checkInternet();
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

  const onStarRatingPress = (rating: any) => {
    setRating(rating);
    // You can add code here to send the rating to your backend or perform other actions
  };

  const handleSubmit = () => {
    const GOOGLE_PACKAGE_NAME = 'com.fugo.wow';

    Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
      Alert.alert('Please check for the Google Play Store'),
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['white', '#e3d8f2']}
        style={styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              // marginTop: 150,
              margin: 40,
            }}>
            <Text
              style={{
                color: 'black',
                marginBottom: 20,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Your Opinion matters to us!
            </Text>
            <Text
              style={{
                color: 'black',
                // marginBottom: 20,
                fontSize: 17,
                fontWeight: '500',
                fontStyle: 'italic',
                alignSelf: 'center',
              }}>
              We work super hard to serve you better and
            </Text>
            <Text
              style={{
                color: 'black',
                // marginBottom: 10,
                fontSize: 17,
                fontWeight: '500',
                fontStyle: 'italic',
                alignSelf: 'center',
              }}>
              would love to know you rate our app?
            </Text>
          </View>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(rating: any) => onStarRatingPress(rating)}
            starSize={40}
            fullStarColor="#FFD700"
            emptyStarColor="#C0C0C0"
            style={{marginHorizontal: 8}}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 20,
              backgroundColor: 'purple',
              padding: 10,
              height: 40,
              width: 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        {internet ? null : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 20,
            }}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>
              Please check your Internet Connection
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default Support;
