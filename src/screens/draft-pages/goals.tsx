import * as React from "react";
import Input from "@components/input";
import { Spacers } from "@components/styled";
import SectionTitle from "@components/section-title";
import Switch from "@components/switch";
import IconButton from "@components/icon-button";
import ContinueButton from "@components/continue-button";
import { ScrollView, Text, View } from "react-native";
import useAppState, { send } from "@hooks/useAppState";
import * as Types from "types";
import styles from "../styles";

export default function GoalsPage({ test }: { test: Types.UserTest }) {
  return (
    <React.Fragment>
      <ScrollView
        style={styles.Content}
        contentContainerStyle={styles.ScrollingContent}
      >
        <Text style={styles.Instruction}>
          Set Goals to tell the user what they should do to complete the test.
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
        {test.goals.length === 0 && (
          <React.Fragment>
            <Text style={styles.Instruction}>
              You need at least one goal to continue
            </Text>
            <Spacers.M />
          </React.Fragment>
        )}
        <ContinueButton
          title="Next"
          onPress={() => send("CONTINUED")}
          disabled={test.goals.length === 0}
        />
      </View>
    </React.Fragment>
  );
}
