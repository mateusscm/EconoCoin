import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Card,
  CardItem,
  Body,
  Text,
  Right,
  Thumbnail,
  Icon,
  Button
} from "native-base";
import { theme } from "../../config/_theme";
import {
  TouchableOpacity,
  TouchableHighlight
} from "react-native-gesture-handler";
// import logo from "./../../assets/img/logo.png";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    width: 390,
    marginRight: 60
  },
  align: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  subtext: {
    color: "grey"
  },
  border: {
    borderTopColor: "#cdcdcd",
    borderTopWidth: 0.5
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e"
  }
});

class PreviewBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={styles.mainTitle}>SALDO TOTAL DE CONTAS</Text>
        <Card style={{ zIndex: 0 }}>
          <CardItem header>
            <Body style={styles.align}>
              <Text style={styles.title}>R$540,20</Text>
              <Text style={styles.subtext}>Atualização: 06/09/2019</Text>
            </Body>
            <Right>
              <Thumbnail source={require("./../../assets/img/logo.png")} />
            </Right>
          </CardItem>
          {this.props.view === "Home" ? (
            <CardItem
              style={[styles.align, styles.border]}
              footer
              bordered
              button
              onPress={() => this.props.navigation.navigate("AccountBalance")}
            >
              <Text>Conferir Contas</Text>
            </CardItem>
          ) : null}
        </Card>
      </View>
    );
  }
}

export default PreviewBalance;
