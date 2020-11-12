import React from "react"
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ButtonProps,
  TextStyle,
} from "react-native"

type Props = {
  label?: string
  warn?: boolean
  color?: string
  diabled?: boolean
  bold?: boolean
  style?: TextStyle
} & Partial<ButtonProps>

export default function DialogSelectButton({
  label,
  warn = false,
  disabled = false,
  bold,
  onPress,
  style,
  ...nodeProps
}: Props) {
  const fontWeight = bold ? "600" : "normal"
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { color: warn ? "#FF0E19" : "#00FF9D", fontWeight: fontWeight },
          style,
        ]}
        {...nodeProps}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, .1)",
  },
  text: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "transparent",
  },
})
