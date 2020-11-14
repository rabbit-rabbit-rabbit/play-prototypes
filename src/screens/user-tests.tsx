import * as React from "react";
import * as Panel from "@components/panel";
import TestButton from "@components/test-button";
import UserButton from "@components/user-button";
import Input from "@components/input";
import usePanelStack from "@hooks/usePanelStack";
import { Spacers } from "@components/styled";
import SectionTitle from "@components/section-title";
import CopyLinkButton from "@components/copy-link-button";
import { StyleSheet, ScrollView, View, FlatList, Text } from "react-native";
import * as Types from "types";
import useAppState, { send } from "@hooks/useAppState";
import CreateDraftDialog from "./dialogs/create-draft-dialog";
import PublishTestDialog from "./dialogs/publish-draft-dialog";
import InvitedUserDialog from "./dialogs/invited-user-dialog";
import DraftTestDialog from "./dialogs/draft-test-dialog";
import CreateGoalPanel from "./create-goal";
import FindUserPanel from "./find-user";

export default function UserTestsScreen() {
  const local = useAppState();

  const { tests } = local.data;
  const inProgress = tests.filter((test) => test.status === "inProgress");
  const drafts = tests.filter((test) => test.status === "draft");
  const complete = tests.filter((test) => test.status === "complete");

  return (
    <>
      <Panel.Container isOpen={true} stayOpen={true}>
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
    </>
  );
}

// Test List Content

function TestListSection({
  title,
  tests,
}: {
  title: string;
  tests: Types.UserTest[];
}) {
  if (tests.length === 0) return null;

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
  );
}

const styles = StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
  },
});
