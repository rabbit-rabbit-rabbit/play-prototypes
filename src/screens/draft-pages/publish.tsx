import * as React from "react";
import { Spacers, Text } from "@components/styled";
import FakeInput from "@components/fake-input";
import Input from "@components/input";
import Button, { Content, ContentLeft, ContentRight } from "@components/button";
import UserButton from "@components/user-button";
import SectionTitle from "@components/section-title";
import Slider from "@components/slider";
import Switch from "@components/switch";
import ContinueButton from "@components/continue-button";
import { ScrollView, View } from "react-native";
import * as Types from "types";
import { send } from "@hooks/useAppState";
import styles from "../styles";

export default function PublishPage({ test }: { test: Types.UserTest }) {
  return (
    <React.Fragment>
      <ScrollView
        style={styles.Content}
        contentContainerStyle={styles.ScrollingContent}
      >
        <Slider
          title="Test Lifespan"
          value={test.options.testDuration}
          toValue={(value) => Math.floor(value / 24 / 60 / 1000) + " days"}
          onChange={(value) => send("SET_LIFESPAN", { value })}
        />
        <Switch
          title="Allow Multiple Tries"
          value={test.options.allowMultipleTries}
          onChange={() => send("TOGGLED_MULTIPLE_TRIES")}
        />
        <Spacers.M></Spacers.M>
        <SectionTitle>Invitation Link</SectionTitle>
        <Button>
          <Content>
            <ContentLeft
              title={test.name}
              secondaryTitle="Anyone with the link can take the test."
            ></ContentLeft>
            <ContentRight icon="copy" />
          </Content>
        </Button>
        <Spacers.M></Spacers.M>
        <SectionTitle>Send Invitations</SectionTitle>
        <FakeInput
          placeholder="E-mail"
          onPress={() => send("STARTED_SEARCHING_FOR_USERS")}
        />
        <Spacers.M></Spacers.M>
        {test.invitedUsers.map((user) => (
          <UserButton
            key={user.id}
            user={user}
            onPress={() => send("OPENED_USER_DIALOG", { user })}
          />
        ))}
      </ScrollView>
      <View style={styles.Footer}>
        <ContinueButton title="Publish" onPress={() => send("CONTINUED")} />
      </View>
    </React.Fragment>
  );
}
