import * as React from "react"
import { DripsyProvider } from "dripsy"
import UserTestsScreen from "./src/screens/user-tests"
import DraftTestScreen from "./src/screens/draft-test"
import InProgressTestScreen from "./src/screens/in-progress-test"
import FindUserScreen from "./src/screens/find-user"
import CompleteTestScreen from "./src/screens/complete-test"
import { StyleSheet, View } from "react-native"
import theme from "./src/theme"
import state from "./src/state"

export default function App() {
  return (
    <DripsyProvider theme={theme as any}>
      <View style={styles.container}>
        <UserTestsScreen />
        <DraftTestScreen />
        <InProgressTestScreen />
        <CompleteTestScreen />
        <FindUserScreen />
      </View>
    </DripsyProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Helvetica Neue",
  },
})
