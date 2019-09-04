import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import ExtractSummary from "./../../components/ExtractSummary/ExtractSummary";
import MenuButton from "./../../components/MenuButton/MenuButton";
import { Container, Content, View } from "native-base";
import { theme } from "../../config/_theme";
import { infos } from "./../../data";
import { ScrollView } from "react-native-gesture-handler";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.backgroundMain
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e",
    fontSize: 16
  }
});

class Extract extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <MenuButton view="Extrato" navigation={this.props.navigation} />
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.allCont}>
            <ExtractSummary
              view="Extract"
              infos={infos}
              total={this.state.total}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Extract;
