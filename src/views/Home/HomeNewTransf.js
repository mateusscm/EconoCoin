import React from "react";
import { StyleSheet, TextInput, Alert } from "react-native";
import { connect, useDispatch } from "react-redux";
import { get_info } from "../../Store/Action/info";

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
  DatePicker,
  Spinner
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
    alignItems: "flex-start",
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
function HomeNewTransf(props) {
  const [selected, setSelected] = React.useState(null);
  const [selected2, setSelected2] = React.useState(null);
  const [contas, setContas] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [desc, setDesc] = React.useState("");
  const [money, setMoney] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getInfo();
  }, []);

  function setDate_(newDate) {
    setDate(newDate);
  }

  const getInfo = async () => {
    const user = await FA.currentUser;
    let temp = [];
    let resp = await FFS.collection("user_conta")
      .doc(user.uid)
      .collection("contas")
      .get();
    // Reactotron.log("FFS GET PORRA");
    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
      setContas(temp);
    }
  };

  const simpleMov = async () => {
    try {
      setLoading(true);
      const user = await FA.currentUser;

      let con = JSON.parse(selected2);
      let conR = JSON.parse(selected);

      let c = await FFS.collection("user_conta")
        .doc(user.uid)
        .collection("contas")
        .doc(con.id);

      let cr = await FFS.collection("user_conta")
        .doc(user.uid)
        .collection("contas")
        .doc(conR.id);

      let ref = await FFS.collection("user_movimentacao")
        .doc(user.uid)
        .collection("movimentacoes")
        .doc();

      await ref.set({
        id: ref.id,
        descricao: desc,
        balance: Math.abs(money),
        conta: con.nome,
        categoria: "Transferencia",
        data: date.toISOString().split("T")[0],
        tipo: "receita"
      });

      let ref2 = await FFS.collection("user_movimentacao")
        .doc(user.uid)
        .collection("movimentacoes")
        .doc();

      await ref2.set({
        id: ref2.id,
        descricao: desc,
        balance: -Math.abs(money),
        conta: conR.nome,
        categoria: "Transferencia",
        data: date.toISOString().split("T")[0],
        tipo: "despesa"
      });

      // Reactotron.log("FAQUICARAI");

      return FFS.runTransaction(async transaction => {
        try {
          // This code may get re-run multiple times if there are conflicts.
          const sfDoc = await transaction.get(c);
          if (!sfDoc.exists) {
            // Reactotron.log("DEU RUIM");

            throw new Error("Document does not exist!");
          }
          var newBal = parseFloat(sfDoc.data().balance);
          newBal += parseFloat(money);

          const sfDoc1 = await transaction.get(cr);
          if (!sfDoc1.exists) {
            // Reactotron.log("DEU RUIM");
            throw new Error("Document does not exist!");
          }
          var newBal1 = parseFloat(sfDoc1.data().balance);
          newBal1 -= parseFloat(money);

          await transaction.update(c, { balance: newBal });
          await transaction.update(cr, { balance: newBal1 });
        } catch (err) {
          // Reactotron.log("DEU RUIM");
          console.log("Transaction failed");
        }
        await dispatch(get_info());
        setLoading(false);
        await props.navigation.navigate("Extract");
        Alert.alert("Sucesso!", "Transferência feita com sucesso!");
      });
    } catch (err) {
      setLoading(false);
      Reactotron.log(err);
    }
  };

  return (
    <Container>
      <MenuButtonBack view="Transferência" navigation={props.navigation} />
      <Content style={styles.allCont}>
        {/* <View style={styles.header}>
            <Text>dwqdqwdqwd</Text>
          </View> */}
        <Form>
          <Item stackedLabel underline style={styles.header}>
            <Label style={{ color: "#fff", fontSize: 16 }}>Valor</Label>
            <TextInput
              placeholder="R$"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              keyboardType={"numeric"}
              style={{
                color: "#fff",
                fontSize: 44,
                paddingLeft: 10,
                width: "100%"
              }}
              value={money}
              onChangeText={money => {
                setMoney(money);
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
              maxLength={16}
              value={desc}
              onChangeText={desc => {
                setDesc(desc);
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
              selectedValue={selected}
              onValueChange={ev => {
                setSelected(ev);
              }}
            >
              <Picker.Item disabled label="Escolha uma conta" value={null} />
              {contas.map((c, i) => (
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
              selectedValue={selected2}
              onValueChange={ev => {
                setSelected2(ev);
              }}
            >
              <Picker.Item disabled label="Escolha uma conta" value={null} />
              {contas.map((c, i) => (
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
              // defaultDate={new Date(2018, 4, 4)}
              // minimumDate={new Date(2018, 1, 1)}
              // maximumDate={new Date(2018, 12, 31)}
              locale={"pt"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText={`Data: ${date.toString().substr(4, 12)}`}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#000" }}
              onDateChange={setDate_}
              disabled={false}
            />
          </Item>
        </Form>
      </Content>
      <Button
        transparent
        light
        style={{ position: "absolute", zIndex: 10, right: 5, top: 7 }}
        onPress={simpleMov}
      >
        {loading ? (
          <Spinner style={styles.spinner} color="green" />
        ) : (
          <Text>SALVAR</Text>
        )}
      </Button>
    </Container>
  );
}

export default connect()(HomeNewTransf);
