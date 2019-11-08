import React, { Component } from "react";
import { StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import { Container, View, Spinner, Text } from "native-base";
import FloatingButton from "./../../components/FloatingButton/FloatingButton";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";
import PreviewBalance from "../../components/PreviewBalance/PreviewBalance";
import ExtractSummary from "../../components/ExtractSummary/ExtractSummary";
import { FA, FFS } from "../../Firebase";
import Reactotron from "reactotron-react-native";
import Charts from "../../components/Charts/Charts";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { infos } from "./../../data";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.palette.backgroundMain
  },
  opacity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  line: {
    borderWidth: 1,
    borderColor: theme.palette.secondary,
    marginRight: 200,
    marginLeft: 20
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.backgroundMain
  },
  buttonConta: {
    marginVertical: 10,
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "flex-end"
  },
  txtBtn: {
    color: theme.palette.button,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  margin: {
    marginBottom: 70
  }
});

function Home(props) {
  let [_ref, setRef] = React.useState({ empty: true });
  let [infos, setInfos] = React.useState([]);
  let [total, setTotal] = React.useState(0);
  let [loading, setLoading] = React.useState(false);
  let [info, setInfo] = React.useState([
    {
      title: "Saldo",
      qtd: ""
    },
    {
      title: "Receitas do mês",
      qtd: ""
    },
    {
      title: "Despesas do mês",
      qtd: ""
    },
    {
      title: "Balanço do mês",
      qtd: ""
    }
  ]);

  React.useEffect(() => {
    async function getD() {
      setLoading(true);
      const user = await FA.currentUser;
      let fin = new Date(
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          .toISOString()
          .split("T")[0]
      );
      let ini = new Date(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          .toISOString()
          .split("T")[0]
      );

      ini.setDate(ini.getDate() - 2);
      fin.setDate(fin.getDate() - 1);

      let ref = await FFS.collection("user_movimentacao")
        .doc(user.uid)
        .collection("movimentacoes")
        .where("data", ">", ini.toISOString().split("T")[0])
        .where("data", "<", fin.toISOString().split("T")[0])
        .orderBy("data", "desc")
        .get();
      setRef(ref);
      let cont = await FFS.collection("user_conta")
        .doc(user.uid)
        .collection("contas")
        .get();
      let rec = 0;
      let desp = 0;
      let sal = 0;
      if (!cont.empty) {
        cont.docs.forEach(doc => {
          sal += parseFloat(doc.data().balance);
        });
      }

      if (!ref.empty) {
        ref.docs.forEach(doc => {
          let data = doc.data();
          if (data.tipo === "receita") {
            rec += parseFloat(data.balance);
          } else if (data.tipo === "despesa") {
            desp += parseFloat(data.balance);
          }
        });
      }
      let inf = [
        {
          title: "Saldo em conta",
          qtd: "",
          icon: "money-bill-wave"
        },
        {
          title: "Receitas do mês",
          qtd: "",
          icon: "calendar-plus"
        },
        {
          title: "Despesas do mês",
          qtd: "",
          icon: "calendar-minus"
        },
        {
          title: "Balanço do mês",
          qtd: "",
          icon: "calendar-check"
        }
      ];
      inf[0].qtd = "R$ " + sal;
      inf[1].qtd = "R$ " + rec;
      inf[2].qtd = "R$ " + desp;
      inf[3].qtd = "R$ " + (rec + desp);
      setInfo(inf);
      setLoading(false);
    }
    getD();

    async function getInfo() {
      const user = await FA.currentUser;
      let temp = [];
      let resp = await FFS.collection("user_movimentacao")
        .doc(user.uid)
        .collection("movimentacoes")
        .limit(3)
        .get();
      Reactotron.log("FFS GET PORRA");

      if (!resp.empty) {
        resp.forEach(r => {
          temp.push(r.data());
        });
      }
      const newTotal = temp.reduce(
        (totalValue, inf) => totalValue + parseFloat(inf.balance),
        0
      );
      setInfos(temp);
      setTotal(newTotal);
    }
    getInfo();
  }, []);

  return (
    <Container>
      <MenuButton view="Visão Geral" navigation={props.navigation} />
      {!loading ? (
        <>
          <ScrollView style={styles.allCont}>
            {/* <View style={this.state.active ? styles.opacity : null} /> */}
            {/* <View style={styles.allCont}> */}
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[0]}
                />
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[1]}
                />
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[2]}
                />
                <PreviewBalance
                  view="Home"
                  navigation={props.navigation}
                  info={info[3]}
                />
              </ScrollView>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("AccountBalance", { info: info[0] })
              }
              style={styles.buttonConta}
            >
              <Text style={styles.txtBtn}>Conferir Contas</Text>
            </TouchableOpacity>
            <Charts />
            <ExtractSummary
              view="Home"
              navigation={props.navigation}
              infos={infos}
              total={total}
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Extract")}
              style={styles.buttonConta}
            >
              <Text style={[styles.txtBtn, styles.margin]}>
                Conferir Extrato Total
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </ScrollView>
          {/* <View style={{height: 100}}> */}
          <FloatingButton view="Home" navigation={props.navigation} />
        </>
      ) : (
        <Spinner style={styles.spinner} color="green" />
      )}
      {/* </View> */}
    </Container>
  );
}

// class Home extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       total: 0,
//       active: false,
//       infos: []
//     };
//     this.toggleBtn = this.toggleBtn.bind(this);
//   }

//   componentDidMount() {
//     this.getInfo();
//   }

//   getInfo = async () => {
//     const user = await FA.currentUser;
//     let temp = [];
//     let resp = await FFS.collection("user_movimentacao")
//       .doc(user.uid)
//       .collection("movimentacoes")
//       .limit(3)
//       .get();
//     Reactotron.log("FFS GET PORRA");

//     if (!resp.empty) {
//       resp.forEach(r => {
//         temp.push(r.data());
//       });
//     }
//     const newTotal = temp.reduce(
//       (totalValue, inf) => totalValue + parseFloat(inf.balance),
//       0
//     );
//     this.setState({ total: newTotal, infos: temp });
//   };

//   toggleBtn() {
//     this.setState({ active: !this.state.active });
//   }

//   render() {
//     return (
//       <Container>
//         <MenuButton view="Visão Geral" navigation={this.props.navigation} />
//         <ScrollView style={styles.allCont}>
//           {/* <View style={this.state.active ? styles.opacity : null} /> */}
//           {/* <View style={styles.allCont}> */}
//           <View>
//             <ScrollView
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//             >
//               <PreviewBalance view="Home" navigation={this.props.navigation} />
//               <PreviewBalance view="Home" navigation={this.props.navigation} />
//               <PreviewBalance view="Home" navigation={this.props.navigation} />
//             </ScrollView>
//           </View>
//           <Charts />
//           <ExtractSummary
//             view="Home"
//             navigation={this.props.navigation}
//             infos={this.state.infos}
//             total={this.state.total}
//           />
//           {/* </View> */}
//         </ScrollView>
//         {/* <View style={{height: 100}}> */}
//         <FloatingButton view="Home" navigation={this.props.navigation} />
//         {/* </View> */}
//       </Container>
//     );
//   }
// }

export default Home;
