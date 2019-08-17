import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";
import AsyncStorage from "@react-native-community/async-storage";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 30
  }
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.allCont}>
        <MenuButton navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Settings;
