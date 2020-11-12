import * as React from "react"
import {
  TouchableOpacity,
  View,
  ButtonProps,
  StyleProp,
  ViewStyle,
} from "react-native"
import { Feather } from "@expo/vector-icons"

export type IconButtonProps = {
  icon: string
  color?: string
  style?: ViewStyle
  size?: number
} & Pick<ButtonProps, "onPress">

export default function IconButton({
  icon = "more-horizontal",
  color = "#ffffff",
  size = 18,
  ...rest
}: IconButtonProps) {
  return (
    <TouchableOpacity {...rest}>
      <View
        style={{
          height: 44,
          width: 44,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Feather name={icon} size={size} color={color} />
      </View>
    </TouchableOpacity>
  )
}
