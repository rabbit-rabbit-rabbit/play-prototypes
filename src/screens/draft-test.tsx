import * as React from "react";
import { StyleSheet, View } from "react-native";

import * as Panel from "@components/panel";
import { Spacers } from "@components/styled";
import PageIndicators from "@components/page-indicators";

import useAppState, { send } from "@hooks/useAppState";
import useStaleSelectedTest from "@hooks/useStaleSelectedTest";

import NewDraftPage from "./draft-pages/newDraft";
import GoalsPage from "./draft-pages/goals";
import SurveyPage from "./draft-pages/survey";
import PublishPage from "./draft-pages/publish";

import usePanelStack from "@hooks/usePanelStack";

export default function DraftTestScreen() {
  const local = useAppState();
  const draft = useStaleSelectedTest(local.values.selectedTest);

  if (!draft) return null;

  return (
    <Panel.Container
      isOpen={local.isIn("draftTest")}
      onClose={() => send("CLOSED_PANEL")}
    >
      <Panel.Header
        title={local.whenIn({
          newDraft: "New User Test",
          goals: "Set a Goal",
          survey: "Create a Survey",
          publish: "Publish Test",
        })}
        leftButton={
          !local.isIn("newDraft") && {
            icon: "arrow-left",
            onPress: () => send("BACKED"),
          }
        }
        leftAction={
          local.isIn("newDraft") && {
            title: "Cancel",
            onPress: () => send("CLOSED_PANEL"),
          }
        }
        rightButton={
          local.isIn("newDraft") && {
            icon: "more-horizontal",
            onPress: () => send("OPENED_MENU"),
          }
        }
      />
      <View style={styles.Content}>
        <PageIndicators
          total={4}
          current={local.whenIn({
            newDraft: 0,
            goals: 1,
            survey: 2,
            publish: 3,
          })}
        />
        <Spacers.S />
        {local.whenIn({
          newDraft: <NewDraftPage test={draft} />,
          goals: <GoalsPage test={draft} />,
          survey: <SurveyPage test={draft} />,
          publish: <PublishPage test={draft} />,
        })}
        <Spacers.L />
      </View>
    </Panel.Container>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
  },
});
