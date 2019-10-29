import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import ExtractSummary from "./../../components/ExtractSummary/ExtractSummary";
import MenuButton from "./../../components/MenuButton/MenuButton";
import { Container, Content, View } from "native-base";
import { theme } from "../../config/_theme";
import { ScrollView } from "react-native-gesture-handler";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.backgroundMain
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e",
    fontSize: 16
  }
});

class Extract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      infos: []
    };
  }
  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    const user = await FA.currentUser;
    let temp = [];
    let resp = await FFS.collection("user_movimentacao")
      .doc(user.uid)
      .collection("movimentacoes")
      .get();
    Reactotron.log('FFS GET PORRA');

    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
    }
    const newTotal = temp.reduce(
      (totalValue, inf) => totalValue + parseFloat(inf.balance),
      0
    );
    this.setState({ total: newTotal, infos: temp });
  };

  render() {
    return (
      <Container>
        <MenuButton view="Extrato" navigation={this.props.navigation} />
        <ScrollView style={{ width: "100%" }}>
          <View style={styles.allCont}>
            <ExtractSummary
              view="Extract"
              infos={this.state.infos}
              total={this.state.total}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Extract;
