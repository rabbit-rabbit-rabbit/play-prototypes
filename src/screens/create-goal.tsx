import * as React from "react"
import * as Panel from "@components/panel"
import { Spacers } from "@components/styled"
import Button, { Content, ContentLeft, ContentRight } from "@components/button"
import JourneyDetail from "@components/journey-detail"
import Input from "@components/input"
import { View, ScrollView, Text as _Text, StyleSheet } from "react-native"
import { Text } from "@components/styled"
import useAppState, { send } from "@hooks/useAppState"
import styles from "./styles"
import { Feather } from "@expo/vector-icons"

export default function CreateGoal() {
  const local = useAppState()

  const { selectedGoal } = local.values

  if (!selectedGoal) return null

  return (
    <Panel.Container
      id="createGoal"
      isOpen={local.isIn("creatingGoal")}
      onClose={() => send("CLOSED_GOALS")}
      onCloseAttempt={() => send("CLOSED_GOALS")}
      stayOpen={local.isIn("creatingGoal")}
    >
      <Panel.Header
        title="User Goal"
        leftAction={{
          title: "Cancel",
          onPress: () => send("CLOSED_GOALS"),
        }}
        rightAction={{
          title: "Create",
          onPress: () => send("CREATED_GOAL"),
          disabled: selectedGoal.description.length === 0,
        }}
      />
      <ScrollView style={styles.Content}>
        <Text.Instruction>
          Write a short description of the goal, and create the expected path to
          complete it.
        </Text.Instruction>
        <Spacers.M />
        <Input
          value={selectedGoal.description}
          onChange={(text) => send("CHANGED_GOAL_DESCRIPTION", { text })}
          lines={5}
          placeholder="Navigate to the profile page."
        />
        <Spacers.S />
        {selectedGoal.journey ? (
          <Button onPress={() => send("SELECTED_JOURNEY")}>
            <Content style={localStyles.ButtonContent}>
              <View>
                <Text.Label>Expected Journey</Text.Label>
                <JourneyDetail goal={selectedGoal} />
              </View>
              <Feather name="play" color="#00FF9E" size={18} />
            </Content>
          </Button>
        ) : (
          <Button onPress={() => send("RECORDED_JOURNEY")}>
            <Content>
              <ContentLeft title="Expected Journey"></ContentLeft>
              <_Text style={styles.Chip}>RECORD</_Text>
            </Content>
          </Button>
        )}
      </ScrollView>
    </Panel.Container>
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
