import * as React from "react"
import { StyleSheet, View } from "react-native"

export type PageIndicatorProps = {
  total: number
  current: number
}

export default function PageIndicators({ total, current }: PageIndicatorProps) {
  return (
    <View style={styles.Container}>
      {Array.from(Array(total)).map((_, i) => (
        <View
          key={i}
          style={{
            ...styles.PageIndicator,
            backgroundColor:
              i === current ? "#00FF9D" : "rgba(255, 255, 255, .3)",
          }}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 6,
  },
  PageIndicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, .5)",
    marginRight: 6,
  },
})
