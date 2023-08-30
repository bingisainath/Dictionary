import { StyleSheet } from "react-native";

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
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth:2,
      marginLeft:10,
      borderRadius:10
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
    //   marginTop: 50,
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
      fontWeight:'bold',
      fontSize:20
    },
  });

  
export default styles;