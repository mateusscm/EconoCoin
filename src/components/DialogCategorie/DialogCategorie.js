import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";

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
  Button,
  Spinner
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

class DialogCategorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorie: "",
      id: "",
      loading: false
    };
    this.handleclick = this.handleclick.bind(this);
  }

  // handleCreate() {
  //   firebase.firestore().collection("categoria_user").doc(user.id).collection("categoria").doc().set({});
  // }
  componentDidMount() {
    if (this.props.navigation.getParam("type", "edit") === "edit")
      this.setState({
        categorie: this.props.navigation.getParam("value", ""),
        id: this.props.navigation.getParam("id", "")
      });
  }

  async handleclick() {
    this.setState({ loading: true });
    try {
      let user = await FA.currentUser;
      if (this.props.navigation.getParam("type", "edit") === "edit") {
        await FFS.collection("user_categoria")
          .doc(user.uid)
          .collection("categorias")
          .doc(this.state.id)
          .set({ id: this.state.id, value: this.state.categorie });
        this.setState({ loading: false });
        this.props.navigation.goBack();
      } else {
        let ref = await FFS.collection("user_categoria")
          .doc(user.uid)
          .collection("categorias")
          .doc();
        ref.set({ id: ref.id, value: this.state.categorie });
        this.setState({ loading: false });
        this.props.navigation.goBack();
      }
    } catch (err) {
      alert(err);
      this.setState({ loading: false });
    }
  }

  render() {
    const type = this.props.navigation.getParam("type", "edit");

    return (
      <Container>
        <MenuButtonBack view="Categoria" navigation={this.props.navigation} />
        <Content style={styles.allCont}>
          <Form>
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                {type !== "edit" ? "Nova" : "Editar"} Categoria
              </Label>
              <TextInput
                maxLength={16}
                style={{
                  fontSize: 24,
                  paddingLeft: 5,
                  width: "100%"
                }}
                value={this.state.categorie}
                onChangeText={categorie => {
                  this.setState({ categorie });
                }}
              />
            </Item>
          </Form>
        </Content>
        <Button
          onPress={this.handleclick}
          transparent
          light
          style={{ position: "absolute", zIndex: 10, right: 5, top: 7 }}
        >
          {this.state.loading ? (
            <Spinner style={styles.spinner} color="green" />
          ) : (
            <Text>SALVAR</Text>
          )}
        </Button>
      </Container>
    );
  }
}

export default DialogCategorie;
