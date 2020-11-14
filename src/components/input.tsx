import * as React from "react";
import { StyleSheet, TextInput } from "react-native";

export type InputProps = {
  value?: string;
  placeholder?: string;
  lines?: number;
  onChange?: (text: string) => void;
};

function Input(
  { onChange, value, lines, placeholder }: InputProps,
  ref: React.MutableRefObject<TextInput>
) {
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <TextInput
      ref={ref}
      value={text}
      placeholder={placeholder}
      placeholderTextColor={"rgba(255, 255, 255, .3)"}
      multiline={lines !== undefined}
      numberOfLines={lines}
      onChangeText={(newText) => {
        if (text !== newText) {
          setText(newText);
          onChange && onChange(newText);
        }
      }}
      style={[
        styles.Container,
        lines ? { height: lines * (40 - 24) + 24 } : {},
      ]}
    />
  );
}

export default React.forwardRef(Input);

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    backgroundColor: "#303031",
    borderRadius: 12,
    marginBottom: 8,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "normal",
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
});
