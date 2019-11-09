import React from "react";
import { StyleSheet } from "react-native";

import MenuButton from "./../../components/MenuButton/MenuButton";
import { Container, Button } from "native-base";
import { theme } from "../../config/_theme";
import ChartHeader from "../../components/ChartHeader/ChartHeader";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: theme.palette.backgroundMain
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  }
});
const Indicators = props => {
  // const [chart, setChart] = useState(null);
  // const [data_final, setData_final] = useState("");
  // const [data_inicial, setData_inicial] = useState("");
  // const [trigger, setTrigger] = useState(false);
  // const [loading, setLoading] = useState(false);

  // React.useEffect(() => {
  //   setData_final(
  //     new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  //       .toISOString()
  //       .split("T")[0]
  //   );
  //   setData_inicial(
  //     new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  //       .toISOString()
  //       .split("T")[0]
  //   );
  // }, []);

  // const getG = async () => {
  //   function year(date) {
  //     return (
  //       Math.ceil(new Date(date).getTime() / 86400000) -
  //       Math.floor(
  //         new Date().setFullYear(new Date().getFullYear(), 0, 1) / 86400000
  //       )
  //     );
  //   }
  //   const user = await get("user");
  //   let kpinfo = {};
  //   let movimentacoes = [];
  //   const ref = await FFS.collection("user_movimentacao")
  //     .doc(user.uid)
  //     .collection("movimentacoes")
  //     .get();
  //   if (!ref.empty)
  //     ref.forEach(doc => {
  //       movimentacoes.push(doc.data());
  //     });

  //   for (let i = 0; i < movimentacoes.length; i++) {
  //     try {
  //       const obj = movimentacoes[i];
  //       let graphs = ["Categoria", "Conta", "Tipo"];
  //       // eslint-disable-next-line
  //           graphs.forEach(g => {
  //         if (kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]]) {
  //           if (
  //             kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
  //               obj[g.toLowerCase()]
  //             ]
  //           ) {
  //             kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
  //               obj[g.toLowerCase()]
  //             ].forEach((item, index) => {
  //               if (index === 0 || index < year(obj.data)) return;
  //               kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
  //                 obj[g.toLowerCase()]
  //               ][index] += parseFloat(obj.balance);
  //             });
  //           } else {
  //             kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
  //               obj[g.toLowerCase()]
  //             ] = Array(366)
  //               .fill(0, 0, year(obj.data))
  //               .fill(parseFloat(obj.balance), year(obj.data));
  //           }
  //         } else {
  //           kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]] = {};
  //           kpinfo[g.toLowerCase() + "_" + obj.data.split("-")[0]][
  //             obj[g.toLowerCase()]
  //           ] = Array(366)
  //             .fill(0, 0, year(obj.data))
  //             .fill(parseFloat(obj.balance), year(obj.data));
  //         }
  //       });
  //     } catch (err) {
  //       console.log("Err");
  //     }
  //   }
  //   const docRef = await FFS.collection("user_kpi")
  //     .doc(user.uid)
  //     .collection("kpis");
  //   Object.keys(kpinfo).forEach(async kpi => {
  //     await docRef.doc(kpi).set(kpinfo[kpi]);
  //   });
  //   console.log("Graficos gerados");
  //   setTrigger(!trigger);
  // };

  // React.useEffect(() => {
  //   async function getGraph() {
  //     setLoading(true);
  //     let graph = {
  //       bar: [
  //         {
  //           data: {
  //             labels: [],
  //             datasets: [
  //               {
  //                 label: "Quantidade: ",
  //                 backgroundColor: palette("tol-dv", 15).map(function(hex) {
  //                   return "#" + hex;
  //                 }),
  //                 data: []
  //               }
  //             ]
  //           },
  //           options: {
  //             legend: { display: false },
  //             maintainAspectRatio: false,
  //             title: {
  //               display: true,
  //               text: "Contas"
  //             },
  //             scales: {
  //               xAxes: [
  //                 {
  //                   maxBarThickness: 50
  //                 }
  //               ],
  //               yAxes: [
  //                 {
  //                   ticks: {
  //                     beginAtZero: true
  //                   }
  //                 }
  //               ]
  //             }
  //           }
  //         }
  //       ],
  //       pie: [
  //         {
  //           data: {
  //             labels: [],
  //             datasets: [
  //               {
  //                 backgroundColor: palette("tol-dv", 15).map(function(hex) {
  //                   return "#" + hex;
  //                 }),
  //                 data: []
  //               }
  //             ]
  //           },
  //           options: {
  //             maintainAspectRatio: false,
  //             title: {
  //               display: true,
  //               text: "Gasto por categorias"
  //             },
  //             legend: {
  //               display: false
  //             }
  //           }
  //         },
  //         {
  //           data: {
  //             labels: [],
  //             datasets: [
  //               {
  //                 backgroundColor: palette("tol-dv", 15).map(function(hex) {
  //                   return "#" + hex;
  //                 }),
  //                 data: []
  //               }
  //             ]
  //           },
  //           options: {
  //             maintainAspectRatio: false,
  //             title: {
  //               display: true,
  //               text: "Tarefas"
  //             },
  //             legend: {
  //               display: false
  //             }
  //           }
  //         }
  //       ],
  //       line: [
  //         {
  //           data: {
  //             labels: [],
  //             backgroundColor: palette("tol-dv", 15).map(function(hex) {
  //               return "#" + hex;
  //             }),
  //             datasets: []
  //           },
  //           options: {
  //             maintainAspectRatio: false,
  //             title: {
  //               display: true,
  //               text: "Gasto por dia"
  //             }
  //           }
  //         }
  //       ]
  //     };

  //     const user = await get("user");
  //     const ref = await FFS.collection("user_kpi")
  //       .doc(user.uid)
  //       .collection("kpis")
  //       .get();

  //     let kpinfo = {};

  //     let count_conta = {};
  //     let count_categoria = {};
  //     let count_tipo = {};
  //     let count_classe = {};

  //     const getNumber = info => {
  //       const idx_ini =
  //         Math.ceil(new Date(data_inicial).getTime() / 86400000) -
  //         Math.floor(
  //           new Date().setFullYear(new Date().getFullYear(), 0, 1) / 86400000
  //         );
  //       const idx_final =
  //         Math.ceil(new Date(data_final).getTime() / 86400000) -
  //         Math.floor(
  //           new Date().setFullYear(new Date().getFullYear(), 0, 1) / 86400000
  //         );
  //       return info[idx_final] - info[idx_ini - 1 === -1 ? 0 : idx_ini - 1];
  //     };

  //     const idxToDate = idx => {
  //       return new Date(
  //         Math.ceil(
  //           idx +
  //             Math.floor(
  //               new Date().setFullYear(new Date().getFullYear(), 0, 1) /
  //                 86400000
  //             )
  //         ) * 86400000
  //       )
  //         .toISOString()
  //         .split("T")[0];
  //     };

  //     if (!ref.empty) {
  //       ref.forEach(doc => {
  //         kpinfo = { ...kpinfo, [doc.id]: doc.data() };
  //       });
  //       Object.keys(kpinfo).forEach(kpi => {
  //         if (
  //           kpi.split("_")[0] === "conta" &&
  //           (kpi.split("_")[1] === data_inicial.split("-")[0] ||
  //             kpi.split("_")[1] === data_final.split("-")[0])
  //         ) {
  //           Object.keys(kpinfo[kpi]).forEach(k => {
  //             count_conta = { ...count_conta, [k]: getNumber(kpinfo[kpi][k]) };
  //           });
  //         } else if (
  //           kpi.split("_")[0] === "categoria" &&
  //           (kpi.split("_")[1] === data_inicial.split("-")[0] ||
  //             kpi.split("_")[1] === data_final.split("-")[0])
  //         ) {
  //           Object.keys(kpinfo[kpi]).forEach(k => {
  //             count_categoria = {
  //               ...count_categoria,
  //               [k]: getNumber(kpinfo[kpi][k])
  //             };
  //           });
  //         } else if (
  //           kpi.split("_")[0] === "tipo" &&
  //           (kpi.split("_")[1] === data_inicial.split("-")[0] ||
  //             kpi.split("_")[1] === data_final.split("-")[0])
  //         ) {
  //           Object.keys(kpinfo[kpi]).forEach(k => {
  //             count_tipo = {
  //               ...count_tipo,
  //               [k]: getNumber(kpinfo[kpi][k])
  //             };
  //           });
  //         } else if (
  //           kpi.split("_")[0] === "TROCARAQUIOK" &&
  //           (kpi.split("_")[1] === data_inicial.split("-")[0] ||
  //             kpi.split("_")[1] === data_final.split("-")[0])
  //         ) {
  //           const idx_ini =
  //             Math.ceil(new Date(data_inicial).getTime() / 86400000) -
  //             Math.floor(
  //               new Date().setFullYear(new Date().getFullYear(), 0, 1) /
  //                 86400000
  //             );
  //           const idx_final =
  //             Math.ceil(new Date(data_final).getTime() / 86400000) -
  //             Math.floor(
  //               new Date().setFullYear(new Date().getFullYear(), 0, 1) /
  //                 86400000
  //             );

  //           for (let i = idx_ini; i <= idx_final; i++) {
  //             graph.line[0].data.labels.push(idxToDate(i));
  //           }
  //           let color = palette("tol-dv", 10).map(function(hex) {
  //             return "#" + hex;
  //           });
  //           Object.keys(kpinfo[kpi]).forEach((k, i) => {
  //             count_classe = {
  //               ...count_classe,
  //               [k]: getNumber(kpinfo[kpi][k])
  //             };
  //             let temp = [];
  //             kpinfo[kpi][k].forEach((info, i) => {
  //               if (i >= idx_ini && i <= idx_final) {
  //                 temp.push(kpinfo[kpi][k][i] - kpinfo[kpi][k][i - 1]);
  //               }
  //             });
  //             let dataset = {};
  //             dataset[k] = {
  //               label: k,
  //               borderColor: color[i],
  //               fill: false,
  //               data: temp
  //             };
  //             graph.line[0].data.datasets.push(dataset[k]);
  //           });
  //         }
  //       });

  //       Object.keys(count_conta).forEach(a => {
  //         graph.bar[0].data.labels.push(a);
  //         graph.bar[0].data.datasets[0].data.push(count_conta[a]);
  //       });
  //       Object.keys(count_categoria).forEach(a => {
  //         graph.pie[0].data.labels.push(a);
  //         graph.pie[0].data.datasets[0].data.push(count_categoria[a]);
  //       });
  //       Object.keys(count_tipo).forEach(a => {
  //         graph.pie[1].data.labels.push(a);
  //         graph.pie[1].data.datasets[0].data.push(count_tipo[a]);
  //       });
  //     }
  //     setLoading(false);
  //     setChart(graph);
  //   }

  //   getGraph();
  //   // eslint-disable-next-line
  // }, [data_inicial, data_final, trigger]);

  const dataLine = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };

  const dataPie = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const screenWidth = Dimensions.get("window").width - 20;
  return (
    <Container>
      <MenuButton view="Indicadores" navigation={props.navigation} />
      <ScrollView style={styles.allCont}>
        <ChartHeader />
        <LineChart
          data={dataLine}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          style={{
            marginVertical: 4,
            borderRadius: 16
          }}
        />
        <PieChart
          data={dataPie}
          width={screenWidth}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            barPercentage: 0.5
          }}
          accessor="population"
          backgroundColor="#fff"
          absolute={false}
          style={{
            marginVertical: 4,
            borderRadius: 16
          }}
        />
      </ScrollView>
      <Button
        style={{
          height: 54,
          width: 54,
          backgroundColor: theme.palette.button,
          borderRadius: 27,
          position: "absolute",
          bottom: 25,
          right: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24
        }}
        // onPress={() => this.props.navigation.navigate("DialogAccount")}
      >
        <Icon name="reload" size={24} color="#FFF" />
      </Button>
    </Container>
  );
};

export default Indicators;
