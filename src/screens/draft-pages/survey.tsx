import * as React from "react"
import { Spacers } from "@components/styled"
import IconButton from "@components/icon-button"
import SwipeSortList from "@components/swipe-sort-list"
import TestQuestion from "@components/test-question"
import ContinueButton from "@components/continue-button"
import { StyleSheet, Text as _Text, View } from "react-native"
import { send } from "@hooks/useAppState"
import * as Types from "../../types"
import { Text } from "@components/styled"
import styles from "../styles"

export default function SurveyPage({ test }: { test: Types.UserTest }) {
  return (
    <React.Fragment>
      <Text.Instruction>
        Add post-test questions for the user to answer. This is not required.
      </Text.Instruction>
      <Spacers.XL />

      {test.survey.length > 0 ? (
        <>
          <SwipeSortList
            onDelete={(index) => send("DELETED_QUESTION", { index })}
            onReorder={(from, to) => send("REORDERED_QUESTIONS", { from, to })}
          >
            {test.survey
              .filter((g) => g.saved)
              .map((question, i) => (
                <TestQuestion
                  key={question.id}
                  question={question}
                  index={i}
                  drag={() => {}}
                />
              ))}
          </SwipeSortList>
          <Spacers.S />
        </>
      ) : (
        <View style={{ alignItems: "center", flex: 1 }}>
          <IconButton
            icon="plus-circle"
            color="#fff"
            size={32}
            onPress={() => send("STARTED_CREATING_QUESTION")}
          />
        </View>
      )}
      <View style={styles.Footer}>
        <ContinueButton
          title={test.survey.length === 0 ? "Skip" : "Next"}
          onPress={() => send("CONTINUED")}
        />
      </View>
    </React.Fragment>
  )
}
