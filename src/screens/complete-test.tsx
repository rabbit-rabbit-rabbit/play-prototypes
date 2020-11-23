import * as React from "react"
import * as Panel from "@components/panel"
import { Spacers } from "@components/styled"
import UserButton from "@components/user-button"
import Input from "@components/input"
import SectionTitle from "@components/section-title"
import CopyLinkButton from "@components/copy-link-button"
import { StyleSheet, ScrollView } from "react-native"
import useAppState, { send } from "@hooks/useAppState"
import { useLocalState } from "@state-designer/react"
import * as Types from "types"
import useStaleSelectedTest from "@hooks/useStaleSelectedTest"

export default function CompleteTestScreen() {
  const local = useAppState()
  const selectedTest = useStaleSelectedTest(local.values.selectedTest)

  if (!selectedTest) return null

  return (
    <Panel.Container
      id="completeTest"
      isOpen={local.isIn("completeTest")}
      onClose={() => send("CLOSED_PANEL")}
    >
      <Panel.Header
        title={selectedTest?.name}
        leftButton={{
          icon: "arrow-left",
          onPress: () => send("CLOSED_PANEL"),
        }}
      />
      <ScrollView style={styles.Content}></ScrollView>
    </Panel.Container>
  )
}

const styles = StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
  },
})
