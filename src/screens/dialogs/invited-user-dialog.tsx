import * as React from "react"
import { StyleSheet, TextInput, Text, View } from "react-native"
import { BlurView } from "expo-blur"
import DialogSelectButton from "@components/dialog-select-button"
import Dialog from "react-native-dialog"
import useAppState, { send } from "@hooks/useAppState"

const blurComponentIOS = (
  <BlurView style={StyleSheet.absoluteFill} blurType="xlight" blurAmount={50} />
)

export default function InvitedUserDialog({ visible }: { visible: boolean }) {
  return (
    <View>
      <Dialog.Container
        visible={visible}
        onBackdropPress={() => send("CLOSED_DIALOG")}
        headerStyle={styles.Header}
        contentStyle={styles.Content}
        footerStyle={styles.Footer}
        blurComponentIOS={blurComponentIOS}
      >
        <Dialog.Title style={styles.Title}>Invitation</Dialog.Title>
        <DialogSelectButton
          label="Remove"
          warn
          onPress={() => send("REMOVED_USER")}
        />
        <DialogSelectButton
          label="Cancel"
          onPress={() => send("CLOSED_DIALOG")}
          bold
        />
      </Dialog.Container>
    </View>
  )
}

const styles = StyleSheet.create({
  Content: { backgroundColor: "#1d1d1d" },
  Header: { color: "#fff" },
  Footer: { color: "#fff" },
  Title: { color: "#fff" },
  InputWrapper: { backgroundColor: "rgba(0,0,0,.1)", color: "#fff" },
  TextInput: { color: "#fff" },
})
