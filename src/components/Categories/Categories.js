import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, Text, Spinner } from "native-base";
import { theme } from "../../config/_theme";
import FloatingButton from "../FloatingButton/FloatingButton";
import ListCategories from "./ListCategories";
import { FA, FFS } from "../../Firebase";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  content: {
    width: "100%",
    paddingBottom: 80
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

  update = async () => {
    this.getCat();
  };

  getCat = async () => {
    this.setState({ loading: true });
    let user = await FA.currentUser;
    let resp = await FFS.collection("user_categoria")
      .doc(user.uid)
      .collection("categorias")
      .get();
    if (!resp.empty) {
      let temp = [];
      resp.forEach(r => {
        temp.push(r.data());
      });
      this.setState({ categories: temp, loading: false });
      this.update();
    }
  };

  onDelete = async info => {
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
      console.log(err);
    }
  };

  render() {
    return (
      <Content style={styles.content}>
        <Text style={styles.mainTitle}>CATEGORIAS EXISTENTES</Text>
        {/* <InsideCardAccount />; */}
        {this.state.loading ? null : <Spinner color="green" />}
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
