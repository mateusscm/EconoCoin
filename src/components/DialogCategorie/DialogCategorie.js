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
    backgroundColor: "#ba4145",
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

class DialogCategorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCategorie: ""
    };
  }

  // handleCreate() {
  //   firebase.firestore().collection("categoria_user").doc(user.id).collection("categoria").doc().set({});
  // }

  render() {
    return (
      <Container>
        <MenuButtonBack view="Categorie" navigation={this.props.navigation} />
        <Content style={styles.allCont}>
          {/* <View style={styles.header}>
            <Text>dwqdqwdqwd</Text>
          </View> */}
          <Form>
            {/* <Item stackedLabel underline style={styles.header}>
              <Label style={{ color: "#fff", fontSize: 16 }}>Valor</Label>
              <Input
                placeholder="R$"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                style={{ color: "#fff", fontSize: 44, paddingLeft: 10 }}
              />
            </Item> */}
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Nova Categoria
              </Label>
              <Input
                style={{
                  fontSize: 24,
                  paddingLeft: 5
                }}
                onChangeText={e =>
                  this.setState({ newCategorie: e.target.value })
                }
              />
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

export default DialogCategorie;
