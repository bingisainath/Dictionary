import {View, Text, Animated, Image} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import {TouchableOpacity} from 'react-native-gesture-handler';//@ts-ignore
import StarRating from 'react-native-star-rating';

const Support = () => {
  const [rating, setRating] = useState(0);

  const onStarRatingPress = (rating: any) => {
    setRating(rating);
    // You can add code here to send the rating to your backend or perform other actions
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
          {/* <View
            style={{
              alignItems: 'center',
              height: '40%',
              // backgroundColor: 'red',
              width: '100%',
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                margin: 10,
                marginTop: 140,
              }}>
              Contact Us:
            </Text>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <View
                style={{
                  margin: 10,
                  // backgroundColor: 'red',
                }}>
                <Image
                  style={{height: 15, width: 20}}
                  source={require('../../assests/Images/gmail.png')}
                />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 19,
                  fontWeight: '600',
                  fontStyle: 'italic',
                  margin: 8,
                  // backgroundColor: 'red',
                }}>
                bingisainath@gmail.com
              </Text>
            </TouchableOpacity>
          </View> */}
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
      </LinearGradient>
    </View>
  );
};

export default Support;
