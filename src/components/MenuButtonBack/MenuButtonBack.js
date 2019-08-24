import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

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

class MenuButtonBack extends Component {
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
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon
                type="MaterialIcons"
                name="keyboard-arrow-left"
                style={{ color: "#fff", fontSize: 30 }}
              />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
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

export default MenuButtonBack;
