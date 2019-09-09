import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Content, Text } from "native-base";
import { theme } from "../../config/_theme";
import FloatingButton from "../FloatingButton/FloatingButton";
import ListCategories from "./ListCategories";

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
    this.state = {};
  }

  render() {
    return (
      <Content style={styles.content}>
        <Text style={styles.mainTitle}>CATEGORIAS EXISTENTES</Text>
        {/* <InsideCardAccount />; */}
        {this.props.infos.map((info, i) => {
          return <ListCategories info={info} key={i} />;
        })}
        {/* {this.props.infos.map((info, i) => {
            return <InsideCardAccount info={info} key={i} />;
          })} */}
      </Content>
    );
  }
}

export default Categories;
