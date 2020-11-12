import * as React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { Text } from "@components/styled"

export type FakeInputProps = {
  placeholder?: string
  onPress?: () => void
}

export default function Input({ onPress, placeholder }: FakeInputProps) {
  return (
    <TouchableOpacity style={styles.Container} onPress={onPress}>
      <Text.Title sx={{ color: "$secondaryFill" }}>{placeholder}</Text.Title>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: 40,
    backgroundColor: "#303031",
    borderRadius: 12,
    marginBottom: 8,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "normal",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
})
