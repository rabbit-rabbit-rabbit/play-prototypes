import * as React from "react"
import * as Panel from "./panel"
import UserButton from "./user-button"
import Input from "./input"
import SectionTitle from "./section-title"
import CopyLinkButton from "./copy-link-button"
import { StyleSheet, ScrollView, Text } from "react-native"
import * as Types from "types"
import { Spacers } from "@components/styled"
import useAppState, { send } from "@hooks/useAppState"
import useStaleSelectedTest from "@hooks/useStaleSelectedTest"

export default function DraftTestScreen() {
  const local = useAppState()
  const selectedTest = useStaleSelectedTest(local.values.selectedTest)

  if (!selectedTest) return null

  return (
    <Panel.Container
      isOpen={local.isIn("draftTest")}
      onClose={() => send("BACKED")}
    >
      <Panel.Header
        title={selectedTest?.name}
        leftButton={{
          icon: "arrow-left",
          onPress: () => send("BACKED"),
        }}
      />
      <ScrollView style={styles.Content}>
        <Text>...</Text>
      </ScrollView>
    </Panel.Container>
  )
}

const styles = StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
  },
})
