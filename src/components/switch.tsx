import * as React from "react"
import { StyleSheet, Text, View, Switch } from "react-native"
import { ButtonProps, ContentLeft } from "./button"
import * as Types from "types"

export type SwitchProps = {
  title: string
  value: boolean
  onChange: (value: boolean) => void
} & ButtonProps

export default function UserButton({
  title,
  value,
  onChange,
  ...rest
}: SwitchProps) {
  return (
    <View style={styles.Container} {...rest}>
      <Text style={styles.Title}>{title}</Text>
      <View>
        <Switch value={value} onValueChange={(v) => onChange && onChange(v)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Content: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Avatar: {
    height: 32,
    width: 32,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#56D0FF",
  },
  Title: {
    color: "rgba(255, 255, 255, .5)",
    fontSize: 16,
    fontWeight: "normal",
  },
  Container: {
    width: "100%",
    height: 64,
    backgroundColor: "#303031",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})
