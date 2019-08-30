import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
// import store from "./../utils/store";
// import { Provider } from "react-redux";

import DrawerNavigator from "./../navigation/DrawerNavigator";

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
