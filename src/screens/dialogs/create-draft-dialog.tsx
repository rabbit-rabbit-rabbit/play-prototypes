import * as React from "react"
import { StyleSheet, TextInput, Text, View } from "react-native"
import { BlurView } from "expo-blur"
import Dialog from "react-native-dialog"
import useAppState, { send } from "@hooks/useAppState"

const blurComponentIOS = (
  <BlurView style={StyleSheet.absoluteFill} blurType="xlight" blurAmount={50} />
)

export default function CreateDraftDialog({ visible }: { visible: boolean }) {
  const [name, setName] = React.useState("")
  const rInput = React.useRef<TextInput>()

  React.useEffect(() => {
    if (visible) {
      setName("")
      setTimeout(() => {
        const input = rInput.current
        if (!input) return

        input.focus()
      }, 100)
    }
  }, [visible])

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
        <Dialog.Title style={styles.Title}>Create a User Test</Dialog.Title>
        <Dialog.Input
          textInputRef={rInput}
          placeholder="Name your User Test"
          placeholderTextColor="rgba(255, 255, 255, .3)"
          value={name}
          onChangeText={(value: string) => {
            setName(value)
          }}
          wrapperStyle={styles.InputWrapper}
          style={styles.TextInput}
        />
        <Dialog.Button label="Cancel" onPress={() => send("CLOSED_DIALOG")} />
        <Dialog.Button
          label="Create"
          disabled={name.length < 3}
          color={name.length === 0 ? "rgba(255, 255, 255, .5)" : "#0085FF"}
          onPress={() => name.length > 3 && send("CREATED_DRAFT", { name })}
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
