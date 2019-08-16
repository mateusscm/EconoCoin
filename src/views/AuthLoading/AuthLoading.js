import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadApp();
  }

  loadApp = async () => {
    const userToken = await AsyncStorage.getItem("userToken");

    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoading;
