import React, { Component } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { Container } from "native-base";
import { theme } from "../../config/_theme";
import Charts from "../../components/Charts/Charts";
import { ScrollView } from "react-native-gesture-handler";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.palette.backgroundMain
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  }
});

class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue: false
    };
  }
  render() {
    return (
      <Container>
        <MenuButton view="Indicadores" navigation={this.props.navigation} />
        <ScrollView style={styles.allCont}>
          <Charts />
          <Charts />
          <Charts />
          <Charts />
          <Charts />
          <Charts />
        </ScrollView>
      </Container>
    );
  }
}

export default Indicators;
