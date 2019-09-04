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
    backgroundColor: "#8f34eb",
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

class HomeNewTransf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selected2: undefined,
      chosenDate: new Date()
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

  render() {
    return (
      <Container>
        <MenuButtonBack
          view="Transferência"
          navigation={this.props.navigation}
          screen="HomeNewTransf"
        />
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
                onValueChange={this.onValueChange}
              >
                <Picker.Item label="Sem Categoria" value="" />
                <Picker.Item label="Alimentação" value="alimentacao" />
                <Picker.Item label="Roupas" value="roupas" />
                <Picker.Item label="Animal de Estimação" value="animal" />
                <Picker.Item label="Casa" value="casa" />
                <Picker.Item label="Educação" value="educacao" />
                <Picker.Item label="Gastos Pessoais" value="pessoal" />
                <Picker.Item label="Impostos" value="impostos" />
                <Picker.Item label="Lazer" value="lazer" />
                <Picker.Item label="Saúde" value="saude" />
                <Picker.Item label="Receita" value="receita" />
                <Picker.Item label="Seguros" value="seguros" />
                <Picker.Item label="Transporte" value="transportes" />
                <Picker.Item label="Outros" value="outros" />
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
                onValueChange={this.onValueChange2}
              >
                <Picker.Item label="Nenhum" value="" />
                {/* {contas.map(conta => {
                  <Picker.Item label={conta.nome} value={conta.sigla} />;
                })} */}
                <Picker.Item label="Banco do Brasil" value="BB" />
                <Picker.Item label="Itau" value="I" />
                <Picker.Item label="Carteira" value="Ca" />
                <Picker.Item label="Caixa" value="Cx" />
                <Picker.Item label="Cofre" value="Co" />
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
              <Text>
                Data: {this.state.chosenDate.toString().substr(4, 12)}
              </Text>
            </Item>
          </Form>
        </Content>
        <Button
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

export default HomeNewTransf;
