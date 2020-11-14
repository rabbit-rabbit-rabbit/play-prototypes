import * as React from "react";
import { Spacers } from "@components/styled";
import Input from "@components/input";
import SectionTitle from "@components/section-title";
import Switch from "@components/switch";
import IconButton from "@components/icon-button";
import ContinueButton from "@components/continue-button";
import { ScrollView, Text, View } from "react-native";
import * as Types from "types";
import useAppState, { send } from "@hooks/useAppState";
import styles from "../styles";

export default function SurveyPage({ test }: { test: Types.UserTest }) {
  return (
    <React.Fragment>
      <ScrollView
        style={styles.Content}
        contentContainerStyle={styles.ScrollingContent}
      >
        <Text style={styles.Instruction}>
          Add post-test questions for the user to answer. This is not required.
        </Text>
        {test.goals.length === 0 && (
          <>
            <Spacers.XL />
            <View style={{ alignItems: "center" }}>
              <IconButton
                icon="plus-circle"
                color="#fff"
                size={32}
                onPress={() => send("STARTED_CREATING_GOAL")}
              />
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.Footer}>
        <ContinueButton
          title={test.survey.length === 0 ? "Skip" : "Next"}
          onPress={() => send("CONTINUED")}
        />
      </View>
    </React.Fragment>
  );
}
