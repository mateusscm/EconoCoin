import React, { Component } from "react";
import { StyleSheet, Alert, RefreshControl, ScrollView } from "react-native";
import { Content, Text, Spinner } from "native-base";
import InsideCardAccount from "./InsideCardAccount";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";
import { theme } from "../../config/_theme";

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
    width: "100%",
    paddingBottom: 50
  },
  align: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  subtext: {
    color: "grey"
  },
  border: {
    borderTopColor: "#cdcdcd",
    borderTopWidth: 0.5
  },
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 18,
    paddingBottom: 5,
    fontWeight: "700",
    color: "#6e6e6e"
  }
});

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contas: [],
      loading: false,
      refreshing: false
    };
  }

  componentDidMount() {
    this.getContas();
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getContas().then(() => {
      this.setState({ refreshing: false });
    });
  }

  getContas = async () => {
    this.setState({ loading: true });
    let user = await FA.currentUser;
    let resp = await FFS.collection("user_conta")
      .doc(user.uid)
      .collection("contas")
      .get();
    // Reactotron.log("FFS GET PORRA Conta");
    if (!resp.empty) {
      let temp = [];
      resp.forEach(r => {
        temp.push(r.data());
      });
      this.setState({ contas: temp, loading: false });
    }
  };

  onDelete = info => {
    Alert.alert("Confirmando", "Tem certeza que deseja excluir esta Conta?", [
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
            await FFS.collection("user_conta")
              .doc(user.uid)
              .collection("contas")
              .doc(info.id)
              .delete();
            let temp = this.state.contas;
            temp.splice(
              this.state.contas.findIndex(c => {
                return c.id === info.id;
              }),
              1
            );
            this.setState({ contas: temp });
          } catch (err) {
            if (err) alert("Algo deu errado! Tente novamente mais tarde.");
          }
        }
      }
    ]);
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
          <Text style={styles.mainTitle}>CONTAS EXISTENTES</Text>
          {!this.state.loading ? null : <Spinner color="green" />}
          {this.state.contas.map((conta, i) => {
            return (
              <InsideCardAccount
                conta={conta}
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
      </ScrollView>
    );
  }
}

export default Accounts;
