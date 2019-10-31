import React, { Component } from "react";
import { StyleSheet } from "react-native";

// import { contas } from "./../../data";

import MenuButtonBack from "./../../components/MenuButtonBack/MenuButtonBack";
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Content,
  Text,
  Button
} from "native-base";
import { theme } from "../../config/_theme";
import { FA, FFS } from "../../Firebase";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    backgroundColor: theme.palette.backgroundMain
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  header: {
    height: 100,
    width: "100%",
    backgroundColor: "#4ecc54",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
    paddingLeft: 10,
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)"
  },
  description: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)"
  }
});

class DialogAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conta: "",
      balance: "",
      id: "",
      inicial: ""
    };
    this.createAccount = this.createAccount.bind(this);
  }

  async createAccount() {
    try {
      let user = await FA.currentUser;
      let ref = await FFS.collection("user_conta")
        .doc(user.uid)
        .collection("contas")
        .doc();
      ref.set({
        id: ref.id,
        balance: this.state.balance,
        value: this.state.conta,
        sigla: this.state.sigla
      });
      this.props.navigation.goBack();
    } catch (err) {
      alert(err);
    }
  }

  render() {
    return (
      <Container>
        <MenuButtonBack view="Conta" navigation={this.props.navigation} />
        <Content style={styles.allCont}>
          <Form>
            <Item stackedLabel underline style={styles.header}>
              <Label style={{ color: "#fff", fontSize: 16 }}>
                Valor Inicial
              </Label>
              <Input
                placeholder="R$"
                keyboardType={"numeric"}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={{ color: "#fff", fontSize: 44, paddingLeft: 10 }}
                value={this.state.balance}
                onChangeText={balance => {
                  this.setState({ balance });
                }}
              />
            </Item>
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Nome da Conta
              </Label>
              <Input
                style={{
                  fontSize: 24,
                  paddingLeft: 5
                }}
                value={this.state.conta}
                onChangeText={conta => {
                  this.setState({ conta });
                }}
              />
            </Item>
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Sigla da Conta (Ex: "BB")
              </Label>
              <Input
                maxLength={2}
                autoCapitalize="words"
                style={{
                  fontSize: 24,
                  paddingLeft: 5
                }}
                value={this.state.sigla}
                onChangeText={sigla => {
                  this.setState({ sigla });
                }}
              />
            </Item>
          </Form>
        </Content>
        <Button
          onPress={this.createAccount}
          transparent
          light
          style={{ position: "absolute", zIndex: 10, right: 5, top: 7 }}
        >
          <Text>SALVAR</Text>
        </Button>
      </Container>
    );
  }
}

export default DialogAccount;
