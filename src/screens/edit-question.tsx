import * as React from "react"
import * as Panel from "@components/panel"
import { Spacers } from "@components/styled"
import Button, { Content, ContentLeft, ContentRight } from "@components/button"
import JourneyDetail from "@components/journey-detail"
import Input from "@components/input"
import Slider from "@components/slider"
import Switch from "@components/switch"
import {
  View,
  ScrollView,
  Text as _Text,
  TextInput,
  StyleSheet,
} from "react-native"
import { Text } from "@components/styled"
import useAppState, { send } from "@hooks/useAppState"
import styles from "./styles"
import * as Types from "../types"
import useStaleSelectedTest from "@hooks/useStaleSelectedTest"
import IconButton from "@components/icon-button"
import { secondsToTimestamp } from "../utils"
import { Feather } from "@expo/vector-icons"

export default function EditQuestion() {
  const local = useAppState()

  const selectedQuestion: Types.SurveyQuestion = local.values.selectedQuestion

  if (!selectedQuestion) return null

  console.log(selectedQuestion)

  const isValid =
    selectedQuestion.description.length > 0 &&
    local.whenIn({
      multipleChoiceQuestion: selectedQuestion.options
        .slice(0, selectedQuestion.optionCount)
        .every((v) => v.length > 0),
      scaleQuestion:
        selectedQuestion.leftScaleLabel.length > 0 &&
        selectedQuestion.rightScaleLabel.length > 0,
      default: true,
    })

  return (
    <Panel.Container
      id="createGoal"
      isOpen={local.isIn("creatingQuestion")}
      onClose={() => send("ATTEMPTED_CLOSED")}
      onCloseAttempt={() => send("ATTEMPTED_CLOSED")}
      stayOpen={local.isIn("creatingQuestion")}
    >
      <Panel.Header
        title={
          selectedQuestion.type === Types.QuestionType.Open
            ? "Open Answer"
            : selectedQuestion.type === Types.QuestionType.MultipleChoice
            ? "Multiple Choice"
            : "Scale"
        }
        leftAction={{
          title: "Cancel",
          onPress: () => send("ATTEMPTED_CLOSED"),
        }}
        rightAction={{
          title: "Create",
          onPress: () => send("CREATED_QUESTION"),
          disabled: !isValid,
        }}
      />
      <ScrollView style={styles.Content}>
        <Input
          value={selectedQuestion.description}
          onChange={(text) => send("CHANGED_QUESTION_DESCRIPTION", { text })}
          lines={5}
          placeholder="Enter your question."
        />
        <Spacers.S />
        {local.whenIn({
          openAnswerQuestion: (
            <>
              <Slider
                title="Character Count"
                min={40}
                max={200}
                value={selectedQuestion.characterCount}
                onChange={(count) => send("SET_CHARACTER_COUNT", { count })}
              />
            </>
          ),
          multipleChoiceQuestion: (
            <>
              <Slider
                title="Number of Choices"
                min={2}
                max={10}
                value={selectedQuestion.optionCount}
                onChange={(count) => send("SET_CHOICES_COUNT", { count })}
              />
              <Switch
                title="Select Multiple"
                value={selectedQuestion.selectMultiple}
                onChange={(v) => send("SET_CHOICES_MULTIPLE", v)}
              />
              <Spacers.S />
              {selectedQuestion.options
                .slice(0, selectedQuestion.optionCount)
                .map((option, index) => {
                  return (
                    <Input
                      key={index}
                      value={option}
                      onChange={(text) =>
                        send("EDITED_CHOICE", { index, text })
                      }
                      placeholder={`Choice ${index}`}
                    />
                  )
                })}
            </>
          ),
          scaleQuestion: (
            <>
              <Input
                value={selectedQuestion.leftScaleLabel}
                onChange={(text) => send("SET_LEFT_LABEL", { text })}
                placeholder="Left Label"
              />
              <Input
                value={selectedQuestion.rightScaleLabel}
                onChange={(text) => send("SET_RIGHT_LABEL", { text })}
                placeholder="Right Label"
              />
              <Spacers.S />
              <Slider
                title="Scale Amount"
                min={0}
                max={10}
                value={selectedQuestion.scaleAmount}
                onChange={(count) => send("SET_SCALE_AMOUNT", { count })}
              />
            </>
          ),
        })}
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
