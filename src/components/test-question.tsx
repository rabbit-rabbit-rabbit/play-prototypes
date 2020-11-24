import * as React from "react"
import IconButton from "@components/icon-button"
import { StyleSheet, Text as _Text, View } from "react-native"
import * as Types from "../types"
import { Text } from "@components/styled"
import { Feather } from "@expo/vector-icons"

const TypeIcons = {
  [Types.QuestionType.Open]: "edit",
  [Types.QuestionType.MultipleChoice]: "list",
  [Types.QuestionType.Scale]: "code",
}

export default function TestQuestion({
  question,
  drag,
  isActive = false,
  index,
}: {
  question: Types.SurveyQuestion
  drag?: () => void
  index: number
  isActive?: boolean
}) {
  const [expanded, setExpanded] = React.useState(true)

  return (
    <View
      style={[
        styles.QuestionContainer,
        { transform: [{ scale: isActive ? 1.1 : 1 }] },
      ]}
    >
      <View style={styles.QuestionHeader}>
        <IconButton
          icon={expanded ? "chevron-down" : "chevron-up"}
          color="#fff"
          onPress={() => setExpanded((expanded) => !expanded)}
        />
        <View style={styles.QuestionTitleMain}>
          <Feather name={TypeIcons[question.type]} color="#fff" size={16} />
          <_Text style={styles.QuestionTitle}>Question {index}</_Text>
        </View>
        <IconButton icon="menu" color="#fff" onLongPress={drag} />
      </View>
      {expanded && (
        <View style={styles.QuestionBody}>
          <Text.Instruction>{question.description}</Text.Instruction>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  QuestionTitle: {
    color: "#fff",
    marginLeft: 4,
  },
  QuestionTitleMain: {
    flexDirection: "row",
  },
  QuestionContainer: {
    width: "100%",
    backgroundColor: "#303032",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  QuestionBody: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  QuestionHeader: {
    height: 44,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    width: "100%",
    backgroundColor: "rgba(255,255, 255, .1)",
    flexDirection: "row",
  },
})
