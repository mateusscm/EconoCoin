import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Header, Left, Body, Right, Button } from "native-base";
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
      <React.Fragment>
        <Header style={styles.menu}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon name="md-menu" color="#fff" size={32} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
      </React.Fragment>
      // <View style={styles.menu}>
      //   <Icon
      //     name="md-menu"
      //     color="#fff"
      //     size={32}
      //     style={styles.menuIcon}
      //     onPress={() => this.props.navigation.toggleDrawer()}
      //   />
      // </View>
    );
  }
}

export default MenuButton;
