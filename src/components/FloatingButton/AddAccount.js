import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Button } from "native-base";
// import logo from "./../../assets/img/logo.png";

import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../config/_theme";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
});

class AddAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.content}>
        <Button
          style={{
            height: 54,
            width: 54,
            backgroundColor: theme.palette.button,
            borderRadius: 27,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 12
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24
          }}
          onPress={() => this.props.navigation.navigate("DialogAccount")}
        >
          <Icon name="ios-add" size={24} color="#FFF" />
        </Button>
      </View>
    );
  }
}

export default AddAccount;
