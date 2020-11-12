import * as React from "react"
import * as Panel from "@components/panel"
import TestButton from "@components/test-button"
import UserButton from "@components/user-button"
import Input from "@components/input"
import { Spacers } from "@components/styled"
import SectionTitle from "@components/section-title"
import CopyLinkButton from "@components/copy-link-button"
import {
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  FlatList,
  Text,
} from "react-native"
import * as Types from "../types"
import * as Static from "../static"
import useAppState, { send } from "@hooks/useAppState"
import CreateDraftDialog from "./dialogs/create-draft-dialog"
import PublishTestDialog from "./dialogs/publish-draft-dialog"
import DraftTestDialog from "./dialogs/draft-test-dialog"

export default function FindUserScreen() {
  const local = useAppState()
  const { users: allUsers } = local.data
  const visible = local.isIn("findingUsersModal")
  const { selectedTest } = local.values

  const [value, setValue] = React.useState("")
  const [users, setUsers] = React.useState<Types.User[]>(
    selectedTest
      ? allUsers.filter((user) => !selectedTest.invitedUsers.includes(user))
      : allUsers
  )

  const rInput = React.useRef<TextInput>()

  React.useEffect(() => {
    if (visible) {
      setValue("")
      setUsers(
        selectedTest
          ? allUsers.filter((user) => !selectedTest.invitedUsers.includes(user))
          : allUsers
      )
    }
  }, [visible])

  const anon = {
    id: "anon",
    name: value,
    email: "",
  }

  function handleChange(v: string) {
    setValue(v)
    const lcv = v.toLowerCase()

    const usersToSearch = selectedTest
      ? allUsers.filter((user) => !selectedTest.invitedUsers.includes(user))
      : allUsers

    setUsers(
      v
        ? usersToSearch.filter(
            (user) =>
              user.name.toLowerCase().startsWith(lcv) ||
              user.email.toLowerCase().startsWith(lcv)
          )
        : allUsers
    )
  }

  return (
    <Panel.Container isOpen={visible} onClose={() => send("CLOSED_MODAL")}>
      <Panel.Header
        title="Share"
        leftAction={{
          title: "Cancel",
          onPress: () => send("CLOSED_MODAL"),
        }}
      />
      <View style={styles.Container}>
        <Input
          ref={rInput}
          value={value}
          onChange={(next = "") => handleChange(next)}
          placeholder="E-mail"
        />
        <Spacers.XS />
        <ScrollView style={styles.Content}>
          {users.map((user) => (
            <UserButton
              key={user.id}
              user={user}
              onPress={() => send("SELECTED_USER", { user })}
            />
          ))}
          {value ? (
            <UserButton
              user={anon}
              onPress={() => send("SELECTED_USER", { user: anon })}
            />
          ) : null}
        </ScrollView>
      </View>
    </Panel.Container>
  )
}

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 16,
    flex: 1,
  },
  Content: {
    flex: 1,
  },
})
