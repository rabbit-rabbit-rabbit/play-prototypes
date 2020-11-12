import * as React from "react"
import {
  StyleSheet,
  View,
  Text,
  ButtonProps,
  TouchableOpacity,
} from "react-native"
import * as Types from "types"

export type ContinueButtonProps = { disabled?: boolean } & ButtonProps

export default function ContinueButton({
  title,
  onPress,
  disabled,
  ...rest
}: ContinueButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.Container,
        backgroundColor: disabled ? "rgba(255, 255, 255, .1)" : "#00FF9D",
      }}
      {...rest}
    >
      <Text
        style={{
          ...styles.Title,
          color: disabled ? "rgba(255, 255, 255, .3)" : "#000",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: 40,
    backgroundColor: "#00FF9D",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  Title: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
})
