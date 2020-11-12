import * as React from "react"
import { StyleSheet, View, Text } from "react-native"
import Button, {
  ButtonProps,
  Content,
  ContentLeft,
  ContentRight,
} from "./button"
import * as Types from "types"
import * as Static from "../static"

export type TestButtonProps = {
  test: Types.UserTest
} & ButtonProps

export default function TestButton({ test, ...rest }: TestButtonProps) {
  const label =
    test.status === "inProgress"
      ? `${Math.floor((test.timeRemaining / Static.maxDuration) * 5)} Days Left`
      : test.status === "complete"
      ? "Complete"
      : "Draft"

  const icon =
    test.status === "inProgress"
      ? "clock"
      : test.status === "complete"
      ? "check-circle"
      : "file"

  const color = test.status === "draft" ? "#FFAF00" : "#00FF9D"

  return (
    <Button {...rest}>
      <React.Fragment>
        {test.status === "inProgress" && (
          <View
            style={{
              ...styles.ProgressBar,
              width: (test.timeRemaining / Static.maxDuration) * 100 + "%",
            }}
          />
        )}
        <Content>
          <ContentLeft
            title={test.name}
            secondaryTitle={
              test.invitedUsers.length > 0
                ? `${test.invitedUsers.length} Users`
                : ""
            }
          />
          <ContentRight label={label} icon={icon} iconColor={color} />
        </Content>
      </React.Fragment>
    </Button>
  )
}

const styles = StyleSheet.create({
  ProgressBar: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 64,
    backgroundColor: "#00ff9d",
    opacity: 0.1,
  },
})
