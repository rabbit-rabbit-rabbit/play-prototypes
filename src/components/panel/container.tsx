import * as React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { SwipeablePanel } from "./core"

export type PanelContainerProps = {
  isOpen: boolean
  stayOpen?: boolean
  onClose?: () => void
  children?: React.ReactNode
  style?: ViewStyle
}

export default function Container({
  isOpen,
  stayOpen,
  onClose,
  style,
  children,
}: PanelContainerProps) {
  return (
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
  )
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
})
