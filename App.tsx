import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import {DrawerContent} from './src/components/drawerContent/drawerContent';
import Home from './src/Screens/Home/Home';
import History from './src/Screens/History/History';
import BookMark from './src/Screens/Favorites/Favorites';
import SpeechToText from './src/Screens/SpeechToText/SpeechToText';
import Support from './src/Screens/Support/Support';

const Drawer = createDrawerNavigator();

const App = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(true);
    }, 1500);
  }, []);

  return (
    <>
      {state ? (
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#fff',
                width: 220,
              },
              headerTitleAlign: 'center',
              headerTintColor:'#000',
              headerStyle: {
                height: 60,
                backgroundColor: 'white'
              },
            }}
            drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="BookMark" component={BookMark} />
            <Drawer.Screen name="SpeechToText" component={SpeechToText} />
            <Drawer.Screen name="Support" component={Support} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <View style={style.container}>
          <Image
            source={require('./src/assests/Images/Group_Black.png')}
            style={style.image}
            resizeMode="contain"
          />
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ae9bc9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: '70%',
  },
});

export default App;
