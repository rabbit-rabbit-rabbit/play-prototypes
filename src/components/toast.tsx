import { View } from "react-native"
import { Text } from "@components/styled"

export default function Toast({ message }: { message: string }) {
  return (
    <View>
      <Text.Title>{message}</Text.Title>
    </View>
  )
}
