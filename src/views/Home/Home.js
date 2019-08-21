import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed"
  },
  text: {
    fontSize: 30
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.allCont}>
          <Text style={styles.text}>Home</Text>
        </View>
      </React.Fragment>
    );
  }
}

export default Home;
