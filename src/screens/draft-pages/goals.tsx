import * as React from "react"
import Input from "@components/input"
import { Spacers } from "@components/styled"
import SectionTitle from "@components/section-title"
import Switch from "@components/switch"
import IconButton from "@components/icon-button"
import ContinueButton from "@components/continue-button"
import JourneyDetail from "@components/journey-detail"
import { StyleSheet, ScrollView, Text as _Text, View } from "react-native"
import useAppState, { send } from "@hooks/useAppState"
import * as Types from "types"
import { Views, Text } from "@components/styled"
import styles from "../styles"

export default function GoalsPage({ test }: { test: Types.UserTest }) {
  return (
    <React.Fragment>
      <ScrollView
        style={styles.Content}
        contentContainerStyle={styles.ScrollingContent}
      >
        <_Text style={styles.Instruction}>
          Set Goals to tell the user what they should do to complete the test.
        </_Text>
        <>
          <Spacers.XL />
          {test.goals
            .filter((g) => g.saved)
            .map((goal, i) => (
              <TestGoal key={goal.id} goal={goal} index={i} />
            ))}
          <Spacers.S />
          <View style={localStyles.Centered}>
            <IconButton
              icon="plus-circle"
              color="#fff"
              size={32}
              onPress={() => send("STARTED_CREATING_GOAL")}
            />
          </View>
        </>
      </ScrollView>
      <View style={styles.Footer}>
        {test.goals.length === 0 && (
          <React.Fragment>
            <Text.Instruction>
              You need at least one goal to continue
            </Text.Instruction>
            <Spacers.M />
          </React.Fragment>
        )}
        <ContinueButton
          title="Next"
          onPress={() => send("CONTINUED")}
          disabled={test.goals.length === 0}
        />
      </View>
    </React.Fragment>
  )
}

function TestGoal({ goal, index }: { goal: Types.TestGoal; index: number }) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <View style={localStyles.GoalContainer}>
      <View style={localStyles.GoalHeader}>
        <IconButton
          icon={expanded ? "chevron-down" : "chevron-up"}
          color="#fff"
          onPress={() => setExpanded((expanded) => !expanded)}
        />
        <_Text style={localStyles.GoalTitle}>Goal {index}</_Text>
        <IconButton icon="more-horizontal" color="#fff" onPress={() => {}} />
      </View>
      {expanded && (
        <View style={localStyles.GoalBody}>
          <Text.Instruction>{goal.description}</Text.Instruction>
          <Spacers.S />
          {goal.journey && (
            <View style={localStyles.JourneyContainer}>
              <_Text style={localStyles.JourneyLabel}>Expected Journey</_Text>
              <JourneyDetail goal={goal} />
            </View>
          )}
        </View>
      )}
    </View>
  )
}

const localStyles = StyleSheet.create({
  Centered: {
    alignItems: "center",
  },
  GoalTitle: {
    color: "#fff",
  },
  GoalContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, .1)",
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
