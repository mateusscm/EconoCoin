import React, { Component } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { Icon, Header, Left, Body, Right, Button } from "native-base";
import { theme } from "../../config/_theme";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  menu: {
    height: 60,
    backgroundColor: theme.palette.primary,
    elevation: 4
  },
  menuIcon: {
    zIndex: 9,
    position: "absolute",
    top: 10,
    left: 20
  },
  icon: {
    color: theme.palette.fontColorIcon,
    fontSize: 32
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
          <StatusBar backgroundColor="black" barStyle="light-content" />
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Icon type="Ionicons" name="md-menu" style={styles.icon} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
      </React.Fragment>
    );
  }
}

export default MenuButton;
