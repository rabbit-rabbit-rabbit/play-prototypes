import * as React from "react"
import { StyleSheet, Animated, PanResponder, Text, View } from "react-native"
import { ButtonProps, ContentLeft } from "./button"
import _Slider from "@react-native-community/slider"
import * as Types from "types"

export type SliderProps = {
  title: string
  value: number
  min?: number
  max?: number
  step?: number
  toValue?: (value: number) => string
  onChange: (value: number) => void
} & ButtonProps

export default function UserButton({
  title,
  value = 0,
  min = 0,
  max = 10,
  step = 1,
  toValue,
  onChange,
  ...rest
}: SliderProps) {
  const rWidth = React.useRef(0)
  const rLastX = React.useRef(0)
  const rKnob = React.useRef(new Animated.ValueXY({ x: 0, y: 0 }))

  const panResponder = React.useState(() =>
    PanResponder.create({
      onPanResponderTerminationRequest: () => false,
      onShouldBlockNativeResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) =>
        rKnob.current.setOffset({ x: rLastX.current, y: 0 }),
      onPanResponderMove: (_, { dx }) => rKnob.current.x.setValue(dx),
    })
  )

  React.useEffect(() => {
    function handleXChange(value: any) {
      rLastX.current = value.value
      const next = min + (value.value / rWidth.current) * (max - min)
      onChange && onChange(next)
    }
    const id = rKnob.current.x.addListener(handleXChange)
    return () => {
      rKnob.current.x.removeListener(id)
    }
  }, [])

  return (
    <View
      style={styles.Container}
      onLayout={(e) => {
        rWidth.current = e.nativeEvent.layout.width - 56
      }}
      {...rest}
    >
      <Animated.View
        {...panResponder[0].panHandlers}
        style={[styles.Knob, rKnob.current.getLayout(), { top: 0 }]}
      />
      <Text style={styles.Label}>{title}</Text>
      <Text style={styles.Value}>
        {toValue ? toValue(value) : value.toString()}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  Content: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Slider: {
    position: "absolute",
    width: "100%",
  },
  Knob: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, .1)",
    height: 64,
    width: 56,
    borderRadius: 12,
  },
  Value: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "normal",
  },
  Label: {
    color: "rgba(255, 255, 255, .5)",
    fontSize: 16,
    fontWeight: "normal",
  },
  Container: {
    width: "100%",
    height: 64,
    backgroundColor: "#303031",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})
