import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, Icon, Button } from "native-base";
// import logo from "./../../assets/img/logo.png";

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
            backgroundColor: "red",
            borderRadius: 27,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => this.props.navigation.navigate("DialogAccount")}
        >
          <Icon type="Ionicons" name="ios-add" style={{ fontSize: 32 }} />
        </Button>
      </View>
    );
  }
}

export default AddAccount;
