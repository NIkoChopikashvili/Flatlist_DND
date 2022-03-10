import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  PanResponder,
  PanResponderInstance,
  Animated,
} from "react-native";
import { getRandomColor } from "./utils/randomColors";

const colorMap: any = {};

export default class App extends React.Component {
  state = {
    dragging: false,
    data: Array.from(Array(51), (_, i) => {
      colorMap[i] = getRandomColor();
      return i;
    }),
  };

  _panResponder: PanResponderInstance;
  point = new Animated.ValueXY();

  constructor(props: any) {
    super(props);

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        this.setState({ dragging: true });
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: this.point.y }], { useNativeDriver: false })({
          y: gestureState.moveY,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ dragging: false });
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    const { data, dragging } = this.state;

    const renderItem = ({ item }) => (
      <View
        style={{
          backgroundColor: colorMap[item],
          padding: 16,
          flexDirection: "row",
        }}
      >
        <View {...this._panResponder.panHandlers}>
          <Text style={{ fontSize: 25 }}>@</Text>
        </View>
        <Text style={{ fontSize: 22, flex: 1, textAlign: "center" }}>
          {item}
        </Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            backgroundColor: "black",
            zIndex: 2,
            width: "100%",
            top: this.point.getLayout().top,
          }}
        >
          {renderItem({ item: 3 })}
        </Animated.View>
        <FlatList
          scrollEnabled={!dragging}
          style={{ width: "100%" }}
          data={data}
          renderItem={renderItem}
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
