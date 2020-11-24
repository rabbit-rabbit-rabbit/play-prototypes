import * as React from "react"
import { StyleSheet, ViewStyle, View } from "react-native"
import { SwipeablePanel } from "./core"

import usePanelStack from "@hooks/usePanelStack"

export type PanelContainerProps = {
  id: string
  isOpen: boolean
  zIndex?: number
  stayOpen?: boolean
  onClose?: () => void
  onCloseAttempt?: () => void
  children?: React.ReactNode
  style?: ViewStyle
}

let id = 0

export default function Container({
  id,
  isOpen,
  stayOpen,
  onClose,
  onCloseAttempt,
  style,
  zIndex = 1,
  children,
}: PanelContainerProps) {
  const { zIndex: z, isTopPanel } = usePanelStack(id, isOpen)

  return (
    <View
      style={{
        // zIndex,
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
        onCloseAttempt={onCloseAttempt}
        style={[styles.Panel, style]}
        barStyle={styles.PanelBar}
        showScrim={isTopPanel}
        onlyLarge
      >
        {children}
      </SwipeablePanel>
    </View>
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
