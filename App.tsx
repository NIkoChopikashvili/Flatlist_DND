import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorMap = {};

export default class App extends React.Component {
  state = {
    data: Array.from(Array(100), (_, i) => {
      colorMap[i] = getRandomColor();
      return i;
    }),
  };

  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colorMap[item],
                padding: 16,
                flexDirection: "row",
              }}
            >
              <View style={{}}>
                <Text style={{ fontSize: 25 }}>@</Text>
              </View>
              <Text style={{ fontSize: 22, flex: 1, textAlign: "center" }}>
                {item}
              </Text>
            </View>
          )}
          keyExtractor={(item) => "" + item}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
