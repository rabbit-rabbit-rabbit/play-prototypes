import * as React from "react"
import * as Panel from "@components/panel"
import { Spacers } from "@components/styled"
import UserButton from "@components/user-button"
import Input from "@components/input"
import SectionTitle from "@components/section-title"
import CopyLinkButton from "@components/copy-link-button"
import { StyleSheet, ScrollView } from "react-native"
import useAppState, { send } from "@hooks/useAppState"
import FakeInput from "@components/fake-input"
import * as Types from "types"
import useStaleSelectedTest from "@hooks/useStaleSelectedTest"

export default function InProgressScreen() {
  const local = useAppState()
  const selectedTest = useStaleSelectedTest(local.values.selectedTest)

  if (!selectedTest) return null

  return (
    <Panel.Container
      id="inProgressTest"
      isOpen={local.isIn("inProgressTest")}
      onClose={() => send("CLOSED_PANEL")}
    >
      <Panel.Header
        title={selectedTest?.name}
        leftButton={{
          icon: "arrow-left",
          onPress: () => send("CLOSED_PANEL"),
        }}
        rightAction={{
          title: "End Test",
          onPress: () => {},
        }}
      />
      <ScrollView style={styles.Content}>
        <React.Fragment>
          <SectionTitle>Invitation Link</SectionTitle>
          <CopyLinkButton test={selectedTest} />
          <Spacers.M />
          <SectionTitle>Send Invitations</SectionTitle>
          <FakeInput
            placeholder="E-mail"
            onPress={() => send("STARTED_SEARCHING_FOR_USERS")}
          />
          <Spacers.M></Spacers.M>
          {selectedTest.invitedUsers.map((user) => (
            <UserButton
              key={user.id}
              user={user}
              onPress={() => send("OPENED_USER_DIALOG", { user })}
            />
          ))}
          <Spacers.M />
        </React.Fragment>
      </ScrollView>
    </Panel.Container>
  )
}

const styles = StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
  },
})
