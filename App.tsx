import * as React from "react"
import { DripsyProvider } from "dripsy"
import UserTestsScreen from "./src/screens/user-tests"
import DraftTestScreen from "./src/screens/draft-test"
import InProgressTestScreen from "./src/screens/in-progress-test"
import FindUserPanel from "./src/screens/find-user"
import CreateGoalPanel from "./src/screens/create-goal"
import EditQuestionPanel from "./src/screens/edit-question"
import CompleteTestScreen from "./src/screens/complete-test"
import { StyleSheet, View, Dimensions } from "react-native"
import theme from "./src/theme"
import state from "./src/state"

export default function App() {
  return (
    <DripsyProvider theme={theme as any}>
      <>
        <View style={styles.container}>
          <View style={styles.bgPage} />
          <UserTestsScreen />
          <DraftTestScreen />
          <InProgressTestScreen />
          <CompleteTestScreen />
          <FindUserPanel />
          <CreateGoalPanel />
          <EditQuestionPanel />
        </View>
      </>
    </DripsyProvider>
  )
}

const styles = StyleSheet.create({
  bgPage: {
    position: "absolute",
    top: 44,
    left: 16,
    right: 16,
    zIndex: 0,
    height: 200,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, .3)",
  },
  container: {
    zIndex: 1,
    width: Dimensions.get("window").width,
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Helvetica Neue",
  },
})
