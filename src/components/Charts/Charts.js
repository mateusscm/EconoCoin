import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

// const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontWeight: "700",
    fontSize: 16,
    color: "#000"
  }
});

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text style={styles.mainTitle}>SALDO TOTAL DE CONTAS</Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel={"$"}
          yAxisSuffix={"k"}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 0
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 0
          }}
        />
      </View>
    );
  }
}

export default Charts;
