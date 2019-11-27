import React, { Component } from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';
import { FA, FFS } from '../../Firebase';
import { connect, useDispatch } from 'react-redux';
import { get_info } from '../../Store/Action/info';
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
  Text,
  Button,
  DatePicker,
  Spinner,
} from 'native-base';
import Reactotron from 'reactotron-react-native';
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
    backgroundColor: '#ba4145',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
    alignItems: 'flex-start',
    zIndex: 0,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
});

function HomeNewExpense(props) {
  const [selected, setSelected] = React.useState(null);
  const [selected2, setSelected2] = React.useState(null);
  const [contas, setContas] = React.useState([]);
  const [categorias, setCategorias] = React.useState([]);
  const [desc, setDesc] = React.useState('');
  const [money, setMoney] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const user = await FA.currentUser;
    let temp = [];
    let resp = await FFS.collection('user_conta')
      .doc(user.uid)
      .collection('contas')
      .get();
    // Reactotron.log("FFS GET PORRA");
    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
      setContas(temp);
    }
    temp = [];
    resp = await FFS.collection('user_categoria')
      .doc(user.uid)
      .collection('categorias')
      .get();
    // Reactotron.log("FFS GET PORRA");
    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
      setCategorias(temp);
    }
  };

  const simpleMov = async () => {
    setLoading(true);
    const user = await FA.currentUser;

    let con = JSON.parse(selected2);

    let c = await FFS.collection('user_conta')
      .doc(user.uid)
      .collection('contas')
      .doc(con.id)
      .get();
    // Reactotron.log("FFS GET PORRA");

    let ref = await FFS.collection('user_movimentacao')
      .doc(user.uid)
      .collection('movimentacoes')
      .doc();

    if (desc.trim().length === 0 || money.trim().length === 0) {
      Alert.alert('Aviso', 'Algum campo está vazio');
      setLoading(false);
    } else {
      await ref.set({
        id: ref.id,
        descricao: desc,
        balance: -Math.abs(money),
        conta: con.nome,
        categoria: selected,
        data: date.toISOString().split('T')[0],
        tipo: 'despesa', //MUDAR "despesa"
      });

      if (c.exists) {
        var newBal = parseFloat(c.data().balance);

        newBal -= parseFloat(money); //mudar para -=
        await FFS.collection('user_conta')
          .doc(user.uid)
          .collection('contas')
          .doc(con.id)
          .update({ balance: newBal });
      }
      await dispatch(get_info());
      setLoading(false);
      await props.navigation.navigate('Extract');
      Alert.alert('Sucesso!', 'Despesa criada com sucesso!');
    }
  };

  function setDate_(newDate) {
    setDate(newDate);
  }

  function onValueChange(event) {
    setSelected(event.target.value);
  }

  function onValueChange2(event) {
    setSelected2(event.target.value);
  }
  return (
    <Container>
      <MenuButtonBack view="Despesa" navigation={props.navigation} />
      {/* <NavigationEvents
          onWillFocus={() => {
            console.log("onWillFocus");
            getInfo();
          }}
        /> */}
      <Content style={styles.allCont}>
        {/* <View style={styles.header}>
            <Text>dwqdqwdqwd</Text>
          </View> */}
        <Form>
          <Item stackedLabel underline style={styles.header}>
            <Label style={{ color: '#fff', fontSize: 16 }}>Valor</Label>
            <TextInput
              placeholder="R$"
              keyboardType={'numeric'}
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              style={{
                color: '#fff',
                fontSize: 44,
                width: '100%',
              }}
              label="R$"
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
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              Breve descrição
            </Label>
            <TextInput
              style={{
                fontSize: 24,
                paddingLeft: 5,
                width: '100%',
              }}
              value={desc}
              maxLength={16}
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
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              Categoria
            </Label>
            <Picker
              mode="dropdown"
              style={{ width: '100%', paddingLeft: 0 }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={selected}
              onValueChange={ev => {
                setSelected(ev);
              }}
            >
              <Picker.Item
                disabled
                label="Escolha uma Categoria"
                value={null}
              />
              {categorias.map((c, i) => (
                <Picker.Item key={i} label={c.value} value={c.value} />
              ))}
            </Picker>
          </Item>
          <Item picker stackedLabel style={styles.description}>
            <Label
              style={{
                fontSize: 18,
                paddingLeft: 0,
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              Conta
            </Label>
            <Picker
              mode="dropdown"
              style={{ width: '100%', paddingLeft: 0 }}
              placeholder="Select your SIM"
              placeholderStyle={{ color: '#bfc6ea' }}
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
                color: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              Data
            </Label>
            <DatePicker
              // defaultDate={new Date(2018, 4, 4)}
              // minimumDate={new Date(2018, 1, 1)}
              // maximumDate={new Date(2018, 12, 31)}
              locale={'pt'}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={'fade'}
              androidMode={'default'}
              placeHolderText={`Data: ${date.toString().substr(4, 12)}`}
              textStyle={{ color: 'black' }}
              placeHolderTextStyle={{ color: '#000' }}
              onDateChange={setDate_}
              disabled={false}
            />
          </Item>
        </Form>
      </Content>
      <Button
        transparent
        light
        style={{ position: 'absolute', zIndex: 10, right: 5, top: 7 }}
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

export default connect()(HomeNewExpense);
