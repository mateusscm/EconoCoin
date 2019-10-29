import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";
// import { contas } from "./../../data";

import MenuButtonBack from './../../components/MenuButtonBack/MenuButtonBack';
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
  DatePicker,
} from 'native-base';
import { theme } from '../../config/_theme';

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    backgroundColor: theme.palette.backgroundMain,
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary,
  },
  header: {
    height: 100,
    width: '100%',
    backgroundColor: '#8f34eb',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    paddingLeft: 10,
    marginTop: 0,
    marginLeft: 0,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
});

class HomeNewTransf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      selected2: "",
      contas: [],
      date: new Date(),
      desc: "",
      money: ""
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  onValueChange(event) {
    this.setState({ [event.target.selected]: event.target.value });
  }

  onValueChange2(event) {
    this.setState({ [event.target.selected2]: event.target.value });
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
    Reactotron.log('FFS GET PORRA');
    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
      this.setState({ contas: temp });
    }
  };

  simpleMov = async () => {
    try {
      const user = await FA.currentUser;

      let con = JSON.parse(this.state.selected2);
      let conR = JSON.parse(this.state.selected);

      let c = await FFS.collection('user_conta')
        .doc(user.uid)
        .collection('contas')
        .doc(con.id);

      let cr = await FFS.collection('user_conta')
        .doc(user.uid)
        .collection('contas')
        .doc(conR.id);

      let ref = await FFS.collection('user_movimentacao')
        .doc(user.uid)
        .collection('movimentacoes')
        .doc();

      await ref.set({
        id: ref.id,
        descricao: this.state.desc,
        balance: Math.abs(this.state.money),
        conta: con.nome,
        categoria: 'Transferencia',
        data: this.state.date.toISOString().split("T")[0],
        tipo: 'receita',
      });

      let ref2 = await FFS.collection('user_movimentacao')
        .doc(user.uid)
        .collection('movimentacoes')
        .doc();

      await ref2.set({
        id: ref2.id,
        descricao: this.state.desc,
        balance: -Math.abs(this.state.money),
        conta: conR.nome,
        categoria: 'Transferencia',
        data: this.state.date.toISOString().split("T")[0],
        tipo: 'despesa',
      });

      Reactotron.log('FAQUICARAI');

      return FFS.runTransaction(async transaction => {
        try {
          // This code may get re-run multiple times if there are conflicts.
          const sfDoc = await transaction.get(c);
          if (!sfDoc.exists) {
            Reactotron.log('DEU RUIM');

            throw new Error('Document does not exist!');
          }
          var newBal = parseFloat(sfDoc.data().balance);
          newBal += parseFloat(this.state.money);

          const sfDoc1 = await transaction.get(cr);
          if (!sfDoc1.exists) {
            Reactotron.log('DEU RUIM');
            throw new Error('Document does not exist!');
          }
          var newBal1 = parseFloat(sfDoc1.data().balance);
          newBal1 -= parseFloat(this.state.money);

          await transaction.update(c, { balance: newBal });
          await transaction.update(cr, { balance: newBal1 });
        } catch (err) {
          Reactotron.log('DEU RUIM');
          console.log('Transaction failed');
        }
        this.props.navigation.navigate('Extract');
      });
    } catch (err) {
      Reactotron.log(err);
    }
  };

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
              <Input
                placeholder="R$"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={{ color: "#fff", fontSize: 44, paddingLeft: 10 }}
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
              <Input
                style={{
                  fontSize: 24,
                  paddingLeft: 5
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
                Conta para remover
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
                <Picker.Item disabled label="Escolha uma conta" value={null} />
                {this.state.contas.map((c, i) => (
                  <Picker.Item
                    key={i}
                    label={c.nome}
                    value={JSON.stringify({ id: c.id, nome: c.nome })}
                  />
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
                Conta para adicionar
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
                  <Picker.Item
                    key={i}
                    label={c.nome}
                    value={JSON.stringify({ id: c.id, nome: c.nome })}
                  />
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
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"pt"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Selecione a data"
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}
              />
              <Text>Data: {this.state.date.toString().substr(4, 12)}</Text>
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

export default HomeNewTransf;
