import * as React from "react"
import { StyleSheet, TextInput } from "react-native"

export type InputProps = {
  value?: string
  placeholder?: string
  onChange?: (text: string) => void
}

function Input(
  { onChange, value, placeholder }: InputProps,
  ref: React.MutableRefObject<TextInput>
) {
  const [text, setText] = React.useState(value)

  React.useEffect(() => {
    setText(value)
  }, [value])

  return (
    <TextInput
      ref={ref}
      value={text}
      placeholder={placeholder}
      placeholderTextColor={"rgba(255, 255, 255, .3)"}
      onChangeText={(newText) => {
        if (text !== newText) {
          setText(newText)
          onChange && onChange(newText)
        }
      }}
      style={styles.Container}
    />
  )
}

export default React.forwardRef(Input)

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    height: 40,
    backgroundColor: "#303031",
    borderRadius: 12,
    marginBottom: 8,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "normal",
    paddingHorizontal: 16,
  },
})
