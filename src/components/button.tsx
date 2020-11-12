import * as React from "react"
import {
  StyleSheet,
  StyleProp,
  _Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
  ViewStyle,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { Text, Buttons, Spacers } from "@components/styled"

export type ButtonProps = {
  onPress?: (event: GestureResponderEvent) => void
  children?: React.ReactNode
}

export default function Button({ onPress, children }: ButtonProps) {
  return <Buttons.ListButton onPress={onPress}>{children}</Buttons.ListButton>
}

export function Content({
  style,
  children,
}: {
  style?: ViewStyle
  children: React.ReactNode
}) {
  return <View style={[styles.InnerContainer, style]}>{children}</View>
}

export function ContentLeft({
  title,
  secondaryTitle,
}: {
  title: string
  secondaryTitle?: string
}) {
  return (
    <View style={styles.LeftContainer}>
      {title ? <Text.Label>{title}</Text.Label> : null}
      {secondaryTitle ? <Text.Detail>{secondaryTitle}</Text.Detail> : null}
    </View>
  )
}

export function ContentRight({
  label,
  icon,
  iconColor = "#00FF9D",
  children,
}: {
  label?: string
  icon?: string
  iconColor?: string
  children?: React.ReactNode
}) {
  return (
    <View style={styles.RightContainer}>
      {label ? <Text.Label>{label}</Text.Label> : null}
      {icon ? (
        <View style={styles.Icon}>
          <Feather
            name={icon}
            size={label ? 13 : 18}
            color={iconColor}
          ></Feather>
        </View>
      ) : null}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: 64,
    backgroundColor: "#303031",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  InnerContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  LeftContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
    flex: 1,
  },
  RightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  Title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "normal",
  },
  SecondaryTitle: {
    color: "rgba(255, 255, 255, .5)",
    fontSize: 13,
    fontWeight: "400",
  },
  ProgressBar: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 64,
    backgroundColor: "#00ff9d",
    opacity: 0.1,
  },
  Icon: {
    paddingLeft: 8,
  },
})
