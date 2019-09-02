import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import PreviewBalance from "./../../components/PreviewBalance/PreviewBalance";
import MenuButton from "./../../components/MenuButton/MenuButton";
import { Button, Icon } from "native-base";
import { theme } from "../../config/_theme";
import Accounts from "../../components/Accounts/Accounts";
import { ScrollView } from "react-native-gesture-handler";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.backgroundMain
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  fontColor: {
    color: "#fff",
    fontSize: 32
  }
});

const contas = [
  {
    nome: "Banco do Brasil",
    saldo: 43.0,
    sigla: "BB"
  },
  {
    nome: "Banco Itaú",
    saldo: 43.0,
    sigla: "I"
  },
  {
    nome: "Carteira",
    saldo: 43.0,
    sigla: "Ca"
  },
  {
    nome: "Caixa",
    saldo: 43.0,
    sigla: "Cx"
  },
  {
    nome: "Cofre",
    saldo: 43.0,
    sigla: "Co"
  }
];

class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView>
        <Button
          style={{
            position: "absolute",
            right: 10,
            top: 35,
            zIndex: 1000,
            width: 40,
            height: 40,
            backgroundColor: "red",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
          transparent
          onPress={() => alert("add")}
        >
          <Text style={styles.fontColor}>+</Text>
        </Button>
        <MenuButton navigation={this.props.navigation} />
        <View style={styles.allCont}>
          <PreviewBalance />
          <Accounts contas={contas} />
        </View>
      </ScrollView>
    );
  }
}

export default AccountBalance;
