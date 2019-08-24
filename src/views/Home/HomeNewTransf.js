import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import MenuButtonBack from "./../../components/MenuButtonBack/MenuButtonBack";
import { Container } from "native-base";

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

class HomeNewTransf extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <MenuButtonBack
          navigation={this.props.navigation}
          screen="HomeNewTransf"
        />
        <View style={styles.allCont}>
          <Text style={styles.text}>Transferência</Text>
        </View>
      </Container>
    );
  }
}

export default HomeNewTransf;
