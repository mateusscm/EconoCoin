import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";

import Icon from "react-native-vector-icons";
import { FloatingAction } from "react-native-floating-action";

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
    const actions = [
      {
        text: "Bob",
        icon: require("./../../assets/img/android.png"),
        name: "bt_language",
        position: 1
      },
      {
        text: "Esponja",
        icon: require("./../../assets/img/ic_accessibility_white.png"),
        name: "bt_accessibility",
        position: 2
      },
      {
        text: "Calça Quadrada",
        icon: require("./../../assets/img/feedback.png"),
        name: "bt_room",
        position: 3
      }
    ];
    return (
      <React.Fragment>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.allCont}>
          <Text style={styles.text}>Home</Text>
          <FloatingAction
            color="#3c7d2c"
            actions={actions}
            onPressItem={name => {
              console.log(`selected button: ${name}`);
            }}
          />
        </View>
      </React.Fragment>
    );
  }
}

export default Home;
