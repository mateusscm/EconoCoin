import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";

// import { contas } from "./../../data";

import MenuButtonBack from "./../../components/MenuButtonBack/MenuButtonBack";
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Content,
  Picker,
  Button,
  Text,
  DatePicker
} from "native-base";
import { theme } from "../../config/_theme";

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
    backgroundColor: "#14c6cc",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 0,
    marginTop: 0,
    marginLeft: 0,
    paddingLeft: 10,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)"
  },
  description: {
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 0,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.5)"
  }
});

class HomeNewIncome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      selected2: null,
      contas: [],
      categorias: [],
      date: new Date(),
      desc: "",
      money: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const user = await FA.currentUser;
    let temp = [];
    let resp = await FFS.collection("user_conta")
      .doc(user.uid)
      .collection("contas")
      .get();
    Reactotron.log("FFS GET PORRA");
    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
      this.setState({ contas: temp });
    }
    temp = [];
    resp = await FFS.collection("user_categoria")
      .doc(user.uid)
      .collection("categorias")
      .get();
    Reactotron.log("FFS GET PORRA");
    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
      this.setState({ categorias: temp });
    }
  };

  simpleMov = async () => {
    const user = await FA.currentUser;

    let c = await FFS.collection("user_conta")
      .doc(user.uid)
      .collection("contas")
      .doc(this.state.selected2)
      .get();
    alert(this.state.selected2);

    let ref = FFS.collection("user_movimentacao")
      .doc(user.uid)
      .collection("movimentacoes")
      .doc();

    await ref.set({
      id: ref.id,
      descricao: this.state.desc,
      balance: this.state.money,
      conta: this.state.selected2,
      categoria: this.state.selected,
      data: this.state.date.toISOString().split("T")[0],
      tipo: "receita" //MUDAR "despesa"
    });

    if (c.exists) {
      var newBal = parseFloat(c.data().balance);

      newBal += parseFloat(this.state.money); //mudar para -=
      await FFS.collection("user_conta")
        .doc(user.uid)
        .collection("contas")
        .doc(this.state.selected2)
        .update({ balance: newBal });
    }
    this.props.navigation.navigate("Extract");
  };

  setDate(newDate) {
    this.setState({ date: newDate });
  }

  onValueChange(event) {
    this.setState({ selected: event.target.value });
  }

  onValueChange2(event) {
    this.setState({ selected2: event.target.value });
  }

  render() {
    return (
      <Container>
        <MenuButtonBack view="Receita" navigation={this.props.navigation} />
        <Content style={styles.allCont}>
          {/* <View style={styles.header}>
            <Text>dwqdqwdqwd</Text>
          </View> */}
          <Form>
            <Item stackedLabel underline style={styles.header}>
              <Label style={{ color: "#fff", fontSize: 16 }}>Valor</Label>
              <TextInput
                placeholder="R$"
                keyboardType={"numeric"}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={{
                  color: "#fff",
                  fontSize: 44,
                  paddingLeft: 10,
                  width: "100%"
                }}
                value={this.state.money}
                onChangeText={money => {
                  this.setState({ money });
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
                Breve descrição
              </Label>
              <TextInput
                style={{
                  fontSize: 24,
                  paddingLeft: 5,
                  width: "100%"
                }}
                value={this.state.desc}
                onChangeText={desc => {
                  this.setState({ desc });
                }}
              />
            </Item>
            <Item picker stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Categoria
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: "100%", paddingLeft: 0 }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected}
                onValueChange={ev => {
                  this.setState({ selected: ev });
                }}
              >
                <Picker.Item
                  disabled
                  label="Escolha uma Categoria"
                  value={null}
                />
                {this.state.categorias.map((c, i) => (
                  <Picker.Item key={i} label={c.value} value={c.value} />
                ))}
              </Picker>
            </Item>
            <Item picker stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Conta
              </Label>
              <Picker
                mode="dropdown"
                style={{ width: "100%", paddingLeft: 0 }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={ev => {
                  this.setState({ selected2: ev });
                }}
              >
                <Picker.Item disabled label="Escolha uma conta" value={null} />
                {this.state.contas.map((c, i) => (
                  <Picker.Item key={i} label={c.nome} value={c.id} />
                ))}
              </Picker>
            </Item>
            <Item picker stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Data
              </Label>
              <DatePicker
                // defaultDate={new Date(2018, 4, 4)}
                // minimumDate={new Date(2018, 1, 1)}
                // maximumDate={new Date(2018, 12, 31)}
                locale={"pt"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={`Data: ${this.state.date
                  .toString()
                  .substr(4, 12)}`}
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "#000" }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
          </Form>
        </Content>
        <Button
          transparent
          light
          style={{ position: "absolute", zIndex: 10, right: 5, top: 7 }}
          onPress={this.simpleMov}
        >
          <Text>SALVAR</Text>
        </Button>
      </Container>
    );
  }
}

export default HomeNewIncome;
