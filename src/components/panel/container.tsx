import * as React from "react";
import { StyleSheet, ViewStyle, View } from "react-native";
import { SwipeablePanel } from "./core";

export type PanelContainerProps = {
  isOpen: boolean;
  zIndex?: number;
  stayOpen?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  style?: ViewStyle;
};

export default function Container({
  isOpen,
  stayOpen,
  onClose,
  style,
  zIndex = 1,
  children,
}: PanelContainerProps) {
  return (
    <View
      style={{
        zIndex,
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <SwipeablePanel
        isActive={isOpen}
        stayOpen={stayOpen}
        onClose={onClose}
        style={[styles.Panel, style]}
        barStyle={styles.PanelBar}
        onlyLarge
      >
        {children}
      </SwipeablePanel>
    </View>
  );
}

const styles = StyleSheet.create({
  Panel: {
    backgroundColor: "#19191B",
  },
  PanelBar: {
    backgroundColor: "#303032",
  },
  PanelHeader: {
    flex: 1,
    flexDirection: "row",
    height: 54,
  },
  PanelTitle: {
    color: "#FFFFFF",
    textAlign: "center",
    position: "absolute",
    width: "100%",
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Helvetica Neue",
  },
  LeftIcon: {
    position: "absolute",
    left: 8,
    top: -12,
  },
  RightIcon: {
    position: "absolute",
    right: 8,
    top: -12,
  },
});
