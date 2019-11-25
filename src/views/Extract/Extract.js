import React, { Component } from "react";
import { StyleSheet, RefreshControl } from "react-native";
import ExtractSummary from "./../../components/ExtractSummary/ExtractSummary";
import MenuButton from "./../../components/MenuButton/MenuButton";
import { Container, View, Spinner } from "native-base";
import { theme } from "../../config/_theme";
import { ScrollView } from "react-native-gesture-handler";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";
import FloatingButton from "./../../components/FloatingButton/FloatingButton";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: theme.palette.backgroundMain,
    paddingHorizontal: 10
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e",
    fontSize: 16
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.palette.backgroundMain,
    alignItems: "center"
  }
});

class Extract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      infos: [],
      loading: false,
      refreshing: false
    };
  }
  componentDidMount() {
    this.getInfo();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getInfo().then(() => {
      this.setState({ refreshing: false });
    });
  }

  getInfo = async () => {
    this.setState({ loading: true });
    const user = await FA.currentUser;
    let temp = [];
    let resp = await FFS.collection("user_movimentacao")
      .doc(user.uid)
      .collection("movimentacoes")
      .orderBy("data", "desc")
      .get();
    // Reactotron.log("FFS GET PORRA");

    if (!resp.empty) {
      resp.forEach(r => {
        temp.push(r.data());
      });
    }
    const newTotal = temp.reduce(
      (totalValue, inf) => totalValue + parseFloat(inf.balance),
      0
    );
    this.setState({ total: newTotal, infos: temp, loading: false });
  };

  render() {
    return (
      <Container>
        <MenuButton view="Extrato" navigation={this.props.navigation} />
        {!this.state.loading ? (
          <>
            <ScrollView
              style={styles.allCont}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            >
              {/* <View style={styles.allCont}> */}
              <ExtractSummary
                view="Extract"
                infos={this.state.infos}
                total={this.state.total}
              />
              {/* </View> */}
              <View style={{ marginBottom: 70 }} />
            </ScrollView>
            <FloatingButton view="Extract" navigation={this.props.navigation} />
          </>
        ) : (
          <Spinner style={styles.spinner} color="green" />
        )}
      </Container>
    );
  }
}

export default Extract;
