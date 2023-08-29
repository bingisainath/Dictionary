import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Home from './src/Screens/Home/Home';
import History from './src/Screens/History/History';
import { DrawerContent } from './src/components/drawerContent/drawerContent';

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
            // screenOptions={{headerShown: false}}
            drawerContent={props => <DrawerContent {...props} />}
            >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="History" component={History} />
          </Drawer.Navigator>
        </NavigationContainer>
      ) : (
        <View style={style.container}>
          <Image
            source={require('./src/assests/Images/mainLogo.png')}
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
    backgroundColor: '#90F5E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '80%',
  },
});

export default App;

