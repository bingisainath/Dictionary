import {StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    elevation: 15,
    height: 50,
    width: '28.5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    marginLeft: 10,
    borderRadius: 10,
  },
  speakerButton: {
    width: 20,
    height: 20,
  },
  textDesign: {
    fontSize: 25,
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
    //   marginTop: 50,
  },
  textInput: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loadingContainer: {
    height: screenHeight / 2.5,
    borderWidth: 3,
    marginHorizontal: 15,
    marginVertical: 22,
    borderRadius: 23,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    backgroundColor: '#fff',
    elevation: 20,
  },
});

export default styles;
