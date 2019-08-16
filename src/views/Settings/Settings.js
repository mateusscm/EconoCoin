import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";

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
        <Text style={styles.text}>Settings</Text>
      </View>
    );
  }
}

export default Settings;
