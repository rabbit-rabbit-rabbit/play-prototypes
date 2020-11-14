import * as React from "react";
import * as Panel from "@components/panel";
import { Spacers } from "@components/styled";
import Button, { Content, ContentLeft, ContentRight } from "@components/button";
import UserButton from "@components/user-button";
import Input from "@components/input";
import SectionTitle from "@components/section-title";
import CopyLinkButton from "@components/copy-link-button";
import { Text, View, ScrollView, TextInput } from "react-native";
import useAppState, { send } from "@hooks/useAppState";
import FakeInput from "@components/fake-input";
import usePanelStack from "@hooks/usePanelStack";
import styles from "./styles";
import * as Types from "types";
import useStaleSelectedTest from "@hooks/useStaleSelectedTest";

export default function CreateGoal() {
  const [text, setText] = React.useState("");
  const local = useAppState();

  return (
    <Panel.Container
      isOpen={local.isIn("creatingGoal")}
      onClose={() => send("CLOSED_GOALS")}
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
        }}
      />
      <ScrollView style={styles.Content}>
        <Text style={styles.Instruction}>
          Write a short description of the goal, and create the expected path to
          complete it.
        </Text>
        <Spacers.M />
        <Input
          value={text}
          onChange={(v) => setText(v)}
          lines={5}
          placeholder="Navigate to the profile page."
        />
        <Spacers.S />
        <Button>
          <Content>
            <ContentLeft title="Expected Journey"></ContentLeft>
            <Text style={styles.Chip}>RECORD</Text>
          </Content>
        </Button>
      </ScrollView>
    </Panel.Container>
  );
}
