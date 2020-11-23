import * as React from "react"
import * as Panel from "@components/panel"
import TestButton from "@components/test-button"
import UserButton from "@components/user-button"
import Input from "@components/input"
import usePanelStack from "@hooks/usePanelStack"
import { Spacers } from "@components/styled"
import SectionTitle from "@components/section-title"
import CopyLinkButton from "@components/copy-link-button"
import { StyleSheet, ScrollView, View, FlatList, Text } from "react-native"
import * as Types from "types"
import useAppState, { send } from "@hooks/useAppState"
import CreateDraftDialog from "./dialogs/create-draft-dialog"
import PublishTestDialog from "./dialogs/publish-draft-dialog"
import InvitedUserDialog from "./dialogs/invited-user-dialog"
import RecordJourneyDialog from "./dialogs/record-journey-dialog"
import DraftTestDialog from "./dialogs/draft-test-dialog"
import RecordingJourney from "./recording-journey"
import CreateGoalPanel from "./create-goal"
import FindUserPanel from "./find-user"
import JourneyDialog from "./dialogs/journey-dialog"
import CloseGoalDialog from "./dialogs/close-goal-dialog"
import Reordering from "./re-ordering"

export default function UserTestsScreen() {
  const local = useAppState()

  const { tests } = local.data
  const inProgress = tests.filter((test) => test.status === "inProgress")
  const drafts = tests.filter((test) => test.status === "draft")
  const complete = tests.filter((test) => test.status === "complete")

  return (
    <>
      <Panel.Container id="userTests" isOpen={true} stayOpen={true}>
        <Panel.Header
          title="User Tests"
          leftButton={{
            icon: "more-horizontal",
            onPress: () => {},
          }}
          rightButton={{
            icon: "plus",
            onPress: () => send("CREATED_DRAFT"),
          }}
        />
        <ScrollView style={styles.Content}>
          <React.Fragment>
            <TestListSection title="Drafts" tests={drafts} />
            <TestListSection title="In Progress" tests={inProgress} />
            <TestListSection title="Complete" tests={complete} />
          </React.Fragment>
        </ScrollView>
      </Panel.Container>

      <CreateDraftDialog visible={local.isIn("creatingDraftDialog")} />
      <DraftTestDialog visible={local.isIn("draftTestDialog")} />
      <InvitedUserDialog visible={local.isIn("invitedUserDialog")} />
      <PublishTestDialog visible={local.isIn("publishDialog")} />
      <RecordJourneyDialog visible={local.isIn("recordJourneyDialog")} />
      <JourneyDialog visible={local.isIn("journeyDialog")} />
      <CloseGoalDialog visible={local.isIn("closeGoalDialog")} />
      {local.isIn("recordingJourney") && <RecordingJourney />}
    </>
  )
}

// Test List Content

function TestListSection({
  title,
  tests,
}: {
  title: string
  tests: Types.UserTest[]
}) {
  if (tests.length === 0) return null

  return (
    <React.Fragment>
      <SectionTitle>{title}</SectionTitle>
      {tests.map((test) => (
        <TestButton
          key={test.id}
          test={test}
          onPress={() => send("SELECTED_TEST", { test })}
        />
      ))}
      <Spacers.M />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
  },
})
