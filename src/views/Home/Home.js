import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.allCont}>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
