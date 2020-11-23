import * as React from "react"
import { StyleSheet, View } from "react-native"
import { BlurView } from "expo-blur"
import Dialog from "react-native-dialog"
import useAppState, { send } from "@hooks/useAppState"

export type DialogProps = {
  title: string
  description: string
  confirmTitle: string
  visible: boolean
  onConfirm: () => void
}

const blurComponentIOS = (
  <BlurView style={StyleSheet.absoluteFill} blurType="xlight" blurAmount={50} />
)

export default function ConfirmDialog({
  title,
  confirmTitle,
  description,
  onConfirm,
  visible,
}: DialogProps) {
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
        <Dialog.Title style={styles.Title}>{title}</Dialog.Title>
        <Dialog.Description style={styles.Title}>
          {description}
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => send("CLOSED_DIALOG")} />
        <Dialog.Button
          label={confirmTitle}
          color={"#0085FF"}
          onPress={onConfirm}
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
