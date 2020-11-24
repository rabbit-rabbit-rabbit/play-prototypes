import * as React from "react"
import { Spacers } from "@components/styled"
import Input from "@components/input"
import SectionTitle from "@components/section-title"
import Switch from "@components/switch"
import ContinueButton from "@components/continue-button"
import { ScrollView, View, Text } from "react-native"
import * as Types from "types"
import useAppState, { send } from "@hooks/useAppState"
import styles from "../styles"

export default function NewDraftPage({ test }: { test: Types.UserTest }) {
  const state = useAppState()

  const isValid = state.values.selectedTest?.name.length > 0

  return (
    <React.Fragment>
      <ScrollView
        style={styles.Content}
        contentContainerStyle={styles.ScrollingContent}
      >
        <Text style={styles.Instruction}>
          Give this Test a name and set any User Data you may want to capture.
        </Text>
        <Spacers.M />
        <Input
          placeholder="Test Name"
          value={test.name}
          onChange={(value) => {
            send("RENAMED_DRAFT", { value })
          }}
          warn={!isValid}
        />
        <Spacers.M />
        <SectionTitle>User Data</SectionTitle>
        <Switch
          title="Front-facing Camera"
          value={test.options.data.frontFacingCamera}
          onChange={() => {
            send("TOGGLED_DATA_PROPERTY", {
              property: "frontFacingCamera",
            })
          }}
        ></Switch>
        <Switch
          title="Microphone"
          value={test.options.data.microphone}
          onChange={() =>
            send("TOGGLED_DATA_PROPERTY", { property: "microphone" })
          }
        ></Switch>
        <Switch
          title="Location"
          value={test.options.data.location}
          onChange={() =>
            send("TOGGLED_DATA_PROPERTY", { property: "location" })
          }
        ></Switch>
      </ScrollView>
      <View style={styles.Footer}>
        <ContinueButton
          title="Next"
          onPress={() => send("CONTINUED")}
          disabled={!isValid}
        />
      </View>
    </React.Fragment>
  )
}
