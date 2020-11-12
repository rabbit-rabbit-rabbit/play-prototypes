import * as React from "react"
import { StyleSheet, View } from "react-native"
import Button, {
  ButtonProps,
  Content,
  ContentLeft,
  ContentRight,
} from "./button"
import * as Types from "types"
import IconButton from "./icon-button"
import { send } from "@hooks/useAppState"

export type UserButtonProps = {
  user: Types.User
  children?: React.ReactNode
} & ButtonProps

export default function UserButton({
  user,
  children,
  ...rest
}: UserButtonProps) {
  return (
    <Button {...rest}>
      <Content style={styles.Content}>
        <View style={styles.Avatar} />
        <ContentLeft title={user.name} secondaryTitle={user.email} />
        {children}
      </Content>
    </Button>
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
})
