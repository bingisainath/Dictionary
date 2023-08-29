import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export function DrawerContent(props:any) {
  const paperTheme = useTheme();

  const {navigation} = props;

  const [userData, setUserData] = React.useState([{}]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrb7XeVpElaj3yF0M2zBadpBwR1H32HQQumw&usqp=CAU',
                }}
                size={70}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Guest</Title>
                {/* <Caption style={styles.caption}>email</Caption> */}
              </View>
            </View>

            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  Address:
                </Paragraph>
                <Caption style={styles.caption}>address</Caption>
              </View>
            </View> */}
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({focused}) => (
                <Ionicons name="home-outline" color={'#009387'} size={20} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <Entypo name="back-in-time" color={'#009387'} size={20} />
              )}
              label="History"
              onPress={() => {
                props.navigation.navigate('History');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <Ionicons name="today-outline" color={'#009387'} size={20} />
              )}
              label="Word Of the Day"
              onPress={() => {
                props.navigation.navigate('WOD');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <MaterialCommunityIcons name="text-to-speech" color={'#009387'} size={22} />
              )}
              label="Speech To Text"
              onPress={() => {
                props.navigation.navigate('STT');
              }}
            />
            <DrawerItem
              icon={({focused}) => (
                <FontAwesome5 name="headset" color={'#009387'} size={20} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
            //   onPress={() => {
            //     toggleTheme();
            //   }}
              >
              <View style={styles.preference}>
                <Text style={{fontWeight: 'bold', color: '#009387'}}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <FontAwesome5 name="user-lock" color={'#009387'} size={20} />
          )}
          label="Quit App"
          onPress={() => console.log("Logout")}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#009387',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
