import React, { Component } from "react";
import { ImageBackground, View, Text, StyleSheet } from "react-native";

import bgImage from "./../../assets/img/background.jpg";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: null,
    height: null
  },
  allCont: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",

    alignItems: "center"
  }
});

class Forget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground
        source={bgImage}
        style={styles.backgroundContainer}
        imageStyle={{ opacity: 0.7 }}
      >
        <View style={styles.allCont}>
          <Text>Forget</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default Forget;
