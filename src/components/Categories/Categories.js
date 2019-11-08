import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
import { Content, Text, Spinner, Toast } from "native-base";
import { theme } from "../../config/_theme";
import FloatingButton from "../FloatingButton/FloatingButton";
import ListCategories from "./ListCategories";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    flex: 2,
    paddingBottom: 50
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e"
  }
});

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getCat();
  }

  getCat = async () => {
    this.setState({ loading: true });
    let user = await FA.currentUser;
    let resp = await FFS.collection("user_categoria")
      .doc(user.uid)
      .collection("categorias")
      .get();
    Reactotron.log("FFS GET PORRA cATEGORIA");

    if (!resp.empty) {
      let temp = [];
      resp.forEach(r => {
        temp.push(r.data());
      });
      this.setState({ categories: temp, loading: false });
    }
  };

  onDelete = info => {
    Alert.alert(
      "Confirmando",
      "Tem certeza que deseja excluir esta Categoria?",
      [
        {
          text: "NÃO",
          // onPress: () => console.warn("NO Pressed"),
          style: "cancel"
        },
        {
          text: "SIM",
          onPress: async () => {
            try {
              let user = await FA.currentUser;
              await FFS.collection("user_categoria")
                .doc(user.uid)
                .collection("categorias")
                .doc(info.id)
                .delete();
              let temp = this.state.categories;
              temp.splice(
                this.state.categories.findIndex(c => {
                  return c.id === info.id;
                }),
                1
              );
              this.setState({ categories: temp });
            } catch (err) {
              if (err) alert("Algo deu errado! Tente novamente mais tarde.");
            }
          }
        }
      ]
    );
  };

  render() {
    return (
      <Content style={styles.content}>
        <Text style={styles.mainTitle}>CATEGORIAS EXISTENTES</Text>
        {/* <InsideCardAccount />; */}
        {!this.state.loading ? null : <Spinner color="green" />}
        {this.state.categories.map((info, i) => {
          return (
            <ListCategories
              navigation={this.props.navigation}
              info={info}
              key={i}
              onDelete={e => {
                this.onDelete(e);
              }}
            />
          );
        })}
        {/* {this.props.infos.map((info, i) => {
            return <InsideCardAccount info={info} key={i} />;
          })} */}
      </Content>
    );
  }
}

export default Categories;
