import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { Container, View, Fab, Button, Icon } from "native-base";

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
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <Container>
        <MenuButton navigation={this.props.navigation} />
        <View
          style={this.state.active ? styles.allContOpacity : styles.allCont}
        >
          <Text style={styles.text}>Home</Text>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#3c7d2c" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon
              name={this.state.active ? "ios-close" : "ios-add"}
              style={{ fontSize: 30 }}
            />
            <Button style={{ backgroundColor: "#56f" }}>
              <Text
                style={
                  this.state.active
                    ? {
                        display: "flex",
                        position: "absolute",
                        left: -94,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        padding: 5,
                        borderRadius: 5
                      }
                    : { display: "none" }
                }
              >
                Editar Conta
              </Text>
              <Icon type="AntDesign" name="edit" />
            </Button>
            <Button style={{ backgroundColor: "#516" }}>
              <Text
                style={
                  this.state.active
                    ? {
                        display: "flex",
                        position: "absolute",
                        left: -90,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#fff",
                        padding: 5,
                        borderRadius: 5
                      }
                    : { display: "none" }
                }
              >
                Nova Conta
              </Text>
              <Icon type="AntDesign" name="addfile" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}

export default Home;
