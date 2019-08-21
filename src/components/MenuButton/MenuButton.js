import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  menu: {
    height: 50,
    backgroundColor: "#3c7d2c",
    elevation: 4
  },
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 10,
    left: 20
  }
});

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.menu}>
        <Icon
          name="md-menu"
          color="#fff"
          size={32}
          style={styles.menuIcon}
          onPress={() => this.props.navigation.toggleDrawer()}
        />
      </View>
    );
  }
}

export default MenuButton;
