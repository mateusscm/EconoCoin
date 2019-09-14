import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
// import store from "./../utils/store";
// import { Provider } from "react-redux";
import * as firebase from "firebase";

import DrawerNavigator from "./../navigation/DrawerNavigator";

var firebaseConfig = {
  apiKey: "AIzaSyDNWr8ZawjMF3ndaChNRGozTecjUkTJ2C0",
  authDomain: "econocoin-web.firebaseapp.com",
  databaseURL: "https://econocoin-web.firebaseio.com",
  projectId: "econocoin-web",
  storageBucket: "econocoin-web.appspot.com",
  messagingSenderId: "79453815661",
  appId: "1:79453815661:web:c78b81ace8155bda"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <DrawerNavigator />
      </View>
      // </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
