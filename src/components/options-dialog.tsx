import * as React from "react"
import { StyleSheet, View } from "react-native"
import { BlurView } from "expo-blur"
import DialogSelectButton from "@components/dialog-select-button"
import Dialog from "react-native-dialog"
import { send } from "@hooks/useAppState"

const blurComponentIOS = (
  <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={100} />
)

export type OptionsDialogProps = {
  visible: boolean
  title: string
  options: {
    label: string
    onPress: () => void
    warn?: boolean
  }[]
}

export default function OptionsDialog({
  title,
  visible,
  options,
}: OptionsDialogProps) {
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
        {options.map((option, i) => (
          <DialogSelectButton
            key={i}
            label={option.label}
            onPress={option.onPress}
            warn={option.warn}
          />
        ))}
        <DialogSelectButton
          label="Cancel"
          bold
          onPress={() => send("CLOSED_DIALOG")}
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
