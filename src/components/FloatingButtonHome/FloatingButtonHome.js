import React, { Component } from "react";
import { Text } from "react-native";

import { Fab, Icon, Button } from "native-base";

// const { width: WIDTH } = Dimensions.get("window");

class FloatingButtonHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (
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
        <Button
          style={{ backgroundColor: "#821d20" }}
          onPress={() => this.props.navigation.navigate("HomeNewExpense")}
        >
          <Text
            style={
              this.state.active
                ? {
                    display: "flex",
                    position: "absolute",
                    left: -115,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: 5,
                    borderRadius: 5
                  }
                : { display: "none" }
            }
          >
            Nova Despesa
          </Text>
          <Icon type="MaterialCommunityIcons" name="arrow-down" />
        </Button>
        <Button
          style={{ backgroundColor: "#259425" }}
          onPress={() => this.props.navigation.navigate("HomeNewIncome")}
        >
          <Text
            style={
              this.state.active
                ? {
                    display: "flex",
                    position: "absolute",
                    left: -110,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: 5,
                    borderRadius: 5
                  }
                : { display: "none" }
            }
          >
            Nova Receita
          </Text>
          <Icon type="MaterialCommunityIcons" name="arrow-up" />
        </Button>
        <Button
          style={{ backgroundColor: "#8f34eb" }}
          onPress={() => this.props.navigation.navigate("HomeNewTransf")}
        >
          <Text
            style={
              this.state.active
                ? {
                    display: "flex",
                    position: "absolute",
                    left: -140,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: 5,
                    borderRadius: 5
                  }
                : { display: "none" }
            }
          >
            Nova Tranferência
          </Text>
          <Icon type="MaterialCommunityIcons" name="swap-vertical" />
        </Button>
      </Fab>
    );
  }
}

export default FloatingButtonHome;
