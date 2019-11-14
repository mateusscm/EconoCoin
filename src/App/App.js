import React, { Component } from "react";
import { View, StyleSheet, StatusBar, YellowBox } from "react-native";
import Reactotron from "reactotron-react-native";
import _ from "lodash";

import { store, persistor } from "../Store/";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// import * as firebase from "firebase";

import DrawerNavigator from "./../navigation/DrawerNavigator";

// var firebaseConfig = {
//   apiKey: "AIzaSyDNWr8ZawjMF3ndaChNRGozTecjUkTJ2C0",
//   authDomain: "econocoin-web.firebaseapp.com",
//   databaseURL: "https://econocoin-web.firebaseio.com",
//   projectId: "econocoin-web",
//   storageBucket: "econocoin-web.appspot.com",
//   messagingSenderId: "79453815661",
//   appId: "1:79453815661:web:c78b81ace8155bda"
// };

// firebase.initializeApp(firebaseConfig);

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default class App extends Component {
  render() {
    Reactotron.log("hello FUCKERS");
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <DrawerNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
