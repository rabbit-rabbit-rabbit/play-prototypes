import * as React from "react"
import * as Types from "types"
import { StyleSheet, View } from "react-native"
import { secondsToTimestamp } from "../utils"
import { Text } from "@components/styled"
import { Feather } from "@expo/vector-icons"

export default function GoalDetail({ goal }: { goal: Types.TestGoal }) {
  return (
    <View style={localStyles.DetailRow}>
      <Text.Detail>
        <Feather name="clock" color="rgba(255, 255, 255, .5)" size={12} />{" "}
        {secondsToTimestamp(goal.journey.duration)} •{" "}
        <Feather name="zap" color="rgba(255, 255, 255, .5)" size={12} />{" "}
        {goal.journey.interactions} •{" "}
        {<Feather name="layers" color="rgba(255, 255, 255, .5)" size={12} />}{" "}
        {goal.journey.pages}
      </Text.Detail>
    </View>
  )
}

const localStyles = StyleSheet.create({
  ButtonContent: {
    alignItems: "center",
  },
  DetailRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  Detail: {
    fontSize: 12,
    color: "rgba(255, 255, 255, .5)",
  },
})
