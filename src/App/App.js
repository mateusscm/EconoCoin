import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import DrawerNavigator from "./../navigation/DrawerNavigator";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <DrawerNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
