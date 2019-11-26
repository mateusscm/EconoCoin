import React, { Component } from "react";
import { StyleSheet, Alert, ScrollView, RefreshControl } from "react-native";
import { Content, Text, Spinner, Toast } from "native-base";
import { theme } from "../../config/_theme";
import FloatingButton from "../FloatingButton/FloatingButton";
import ListCategories from "./ListCategories";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";
import { connect } from "react-redux";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.palette.backgroundMain
  },
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
      loading: false,
      refreshing: false
    };
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.props.update().then(() => {
      this.setState({ refreshing: false });
    });
  }

  // getCat = async () => {
  //   this.setState({ loading: true });
  //   let user = await FA.currentUser;
  //   let resp = await FFS.collection("user_categoria")
  //     .doc(user.uid)
  //     .collection("categorias")
  //     .get();
  //   // Reactotron.log("FFS GET PORRA cATEGORIA");

  //   if (!resp.empty) {
  //     let temp = [];
  //     resp.forEach(r => {
  //       temp.push(r.data());
  //     });
  //     this.setState({ categories: temp, loading: false });
  //   }
  // };

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
      <ScrollView
        style={styles.allCont}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Content style={styles.content}>
          <Text style={styles.mainTitle}>CATEGORIAS EXISTENTES</Text>
          {/* <InsideCardAccount />; */}
          {!this.state.loading ? null : <Spinner color="green" />}
          {this.props &&
          this.props.categorias &&
          this.props.categorias.length > 0
            ? this.props.categorias.map((info, i) => {
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
              })
            : null}
          {/* {this.props.infos.map((info, i) => {
              return <InsideCardAccount info={info} key={i} />;
            })} */}
        </Content>
      </ScrollView>
    );
  }
}

const mapStateToProps = store => ({
  categorias: store.cc.cc.categorias
});

export default connect(mapStateToProps)(Categories);
