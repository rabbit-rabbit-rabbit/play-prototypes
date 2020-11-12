import * as React from "react"
import { StyleSheet, View } from "react-native"
import { Text } from "@components/styled"

export default function SectionTitle({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <View style={styles.container}>
      <Text.Section>{children}</Text.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    justifyContent: "center",
  },
})
