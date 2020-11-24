import * as React from "react"
import { Spacers } from "@components/styled"
import IconButton from "@components/icon-button"
import { StyleSheet, Text as _Text, View } from "react-native"
import * as Types from "../types"
import { Text } from "@components/styled"
import JourneyDetail from "@components/journey-detail"

export default function TestGoal({
  goal,
  drag,
  isActive = false,
  index,
}: {
  goal: Types.TestGoal
  drag?: () => void
  index: number
  isActive?: boolean
}) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <View
      style={[
        styles.GoalContainer,
        { transform: [{ scale: isActive ? 1.1 : 1 }] },
      ]}
    >
      <View style={styles.GoalHeader}>
        <IconButton
          icon={expanded ? "chevron-down" : "chevron-up"}
          color="#fff"
          onPress={() => setExpanded((expanded) => !expanded)}
        />
        <_Text style={styles.GoalTitle}>Goal {index}</_Text>
        <IconButton icon="menu" color="#fff" onLongPress={drag} />
      </View>
      {expanded && (
        <View style={styles.GoalBody}>
          <Text.Instruction>{goal.description}</Text.Instruction>

          {goal.journey && (
            <>
              <Spacers.S />
              <View style={styles.JourneyContainer}>
                <_Text style={styles.JourneyLabel}>Expected Journey</_Text>
                <JourneyDetail goal={goal} />
              </View>
            </>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  Centered: {
    alignItems: "center",
  },
  GoalTitle: {
    color: "#fff",
  },
  GoalContainer: {
    width: "100%",
    backgroundColor: "#303032",
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
  },
  GoalBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  GoalHeader: {
    height: 44,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    width: "100%",
    backgroundColor: "rgba(255,255, 255, .1)",
    flexDirection: "row",
  },
  JourneyLabel: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "500",
  },
  JourneyContainer: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, .1)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
})
