import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { Container, View } from "native-base";
import FloatingButtonHome from "./../../components/FloatingButtonHome/FloatingButtonHome";

import MenuButton from "./../../components/MenuButton/MenuButton";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ededed"
  },
  allContOpacity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
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
      <Container>
        <MenuButton navigation={this.props.navigation} />
        <View
          style={this.state.active ? styles.allContOpacity : styles.allCont}
        >
          <Text style={styles.text}>Home</Text>
          <FloatingButtonHome navigation={this.props.navigation} />
        </View>
      </Container>
    );
  }
}

export default Home;
