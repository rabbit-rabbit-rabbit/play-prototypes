import * as React from "react"
import { useLocalState } from "@state-designer/react"
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native"

import { Bar } from "./bar"

let stack = 0

const FULL_HEIGHT = Dimensions.get("window").height
const FULL_WIDTH = Dimensions.get("window").width
const PANEL_HEIGHT = FULL_HEIGHT - 52
const PANEL_ANIM_OPTIONS = {
  tension: 160,
  friction: 25,
  useNativeDriver: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
}
const BG_ANIM_OPTIONS = {
  duration: 180,
  useNativeDriver: true,
}

type SwipeablePanelProps = {
  isActive: boolean
  stayOpen?: boolean
  onClose?: () => void
  showCloseButton?: boolean
  fullWidth?: boolean
  noBackgroundOpacity?: boolean
  style?: object
  closeOnTouchOutside?: boolean
  onlyLarge?: boolean
  onlySmall?: boolean
  openLarge?: boolean
  noBar?: boolean
  barStyle?: object
  allowTouchOutside?: boolean
  showScrim?: boolean
  children?: React.ReactNode
}

function SwipeablePanel({
  style,
  barStyle,
  onClose,
  isActive = false,
  openLarge = true,
  onlySmall = false,
  onlyLarge = false,
  fullWidth = true,
  noBar = false,
  stayOpen = false,
  showScrim = false,
  children,
}: SwipeablePanelProps) {
  const state = useLocalState({
    data: {
      zIndex: stack,
      deviceWidth: FULL_WIDTH,
      deviceHeight: FULL_HEIGHT,
      panelHeight: FULL_HEIGHT - 52,
      panY: FULL_HEIGHT / 2,
      pan: new Animated.ValueXY({ x: 0, y: FULL_HEIGHT / 2 }),
      animatedOpacity: new Animated.Value(0),
      orientation: FULL_HEIGHT >= FULL_WIDTH ? "portrait" : "landscape",
    },
    on: {
      MOVED_PANEL_Y: { secretlyDo: "setPanY" },
      GRANTED_PAN: { secretlyDo: "setInitialPan" },
      CHANGED_ORIENTATION: "setDeviceSizes",
    },
    initial: isActive ? "open" : "closed",
    states: {
      open: {
        onEnter: "showBackground",
        on: {
          RELEASED_STABLE: { secretlyDo: "flattenPanOffset" },
          RELEASED_SWIPING_UP: { secretlyDo: "flattenPanOffset" },
          RELEASED_SWIPING_DOWN: { secretlyDo: "flattenPanOffset" },
          CLOSED: { to: "animatingToClosed" },
        },
        initial: "animating",
        states: {
          stable: {
            initial: "large",
            states: {
              large: {
                on: {
                  MOVED_PAN: { secretlyDo: "updatePanLarge" },
                  RELEASED_STABLE: { to: "animatingToLarge" },
                  RELEASED_SWIPING_UP: {
                    unless: "isOnlySmall",
                    to: "animatingToLarge",
                  },
                  RELEASED_SWIPING_DOWN: {
                    if: "canClose",
                    to: "animatingToClosed",
                    else: {
                      if: "isOnlyLarge",
                      to: "animatingToLarge",
                      else: { to: "animatingToSmall" },
                    },
                  },
                },
              },
              small: {
                on: {
                  MOVED_PAN: { secretlyDo: "updatePanSmall" },
                  RELEASED_STABLE: { to: "animatingToSmall" },
                  RELEASED_SWIPING_UP: {
                    if: "isOnlySmall",
                    to: "animatingToSmall",
                    else: { to: "animatingToLarge" },
                  },
                  RELEASED_SWIPING_DOWN: [
                    {
                      if: "canClose",
                      to: "animatingToClosed",
                      else: { to: "animatingToSmall" },
                    },
                  ],
                },
              },
            },
          },
          animating: {
            onEnter: ["stopAnimations", "showBackground"],
            initial: openLarge ? "animatingToLarge" : "animatingToSmall",
            states: {
              animatingToLarge: {
                async: {
                  await: "animateToLarge",
                  onResolve: { to: "large" },
                },
              },
              animatingToSmall: {
                async: {
                  await: "animateToSmall",
                  onResolve: { to: "small" },
                },
              },
            },
          },
          animatingToClosed: {
            onEnter: ["hideBackground"],
            async: {
              await: "animateToClosed",
              onResolve: { do: "notifyOnClose", to: "closed" },
            },
          },
        },
      },
      closed: {
        on: {
          OPENED: { to: "open" },
        },
      },
    },
    conditions: {
      isOnlySmall() {
        return onlySmall
      },
      isOnlyLarge() {
        return onlyLarge
      },
      canClose() {
        return !stayOpen
      },
    },
    actions: {
      /* ------------------- Animations ------------------- */

      stopAnimations(data) {
        const { animatedOpacity, pan } = data
        animatedOpacity.stopAnimation()
        pan.stopAnimation()
      },
      showBackground(data) {
        const { animatedOpacity } = data

        Animated.timing(animatedOpacity, {
          toValue: 1,
          ...BG_ANIM_OPTIONS,
        }).start()
      },
      hideBackground(data) {
        const { animatedOpacity } = data

        Animated.timing(animatedOpacity, {
          toValue: 0,
          ...BG_ANIM_OPTIONS,
        }).start()
      },

      /* --------------------- Panning -------------------- */

      setPanY(data, { y }: { y: number }) {
        data.panY = y
      },
      setInitialPan(data) {
        const { pan, panY } = data
        // @ts-ignore
        pan.setOffset({ x: 0, y: panY })
        pan.setValue({ x: 0, y: 0 })
      },
      updatePanSmall(data, { dy }: { dy: number }) {
        const { pan } = data
        // @ts-ignore
        const { _value, _offset } = pan.y
        if (Math.abs(_value) <= _offset) {
          pan.setValue({ x: 0, y: dy })
        }
      },
      updatePanLarge(data, { dy }: { dy: number }) {
        const { pan } = data
        // @ts-ignore
        const { _value } = pan.y
        if (_value > -1) {
          pan.setValue({ x: 0, y: Math.max(0, dy) })
        }
      },
      flattenPanOffset(data) {
        const { pan } = data
        pan.flattenOffset()
      },

      /* ----------------------- Etc ---------------------- */

      setDeviceSizes(data, payload: { width: number; height: number }) {
        data.deviceHeight = payload.height
        data.deviceWidth = payload.width
        data.panelHeight = payload.height - 52
      },
      notifyOnClose() {
        onClose && onClose()
      },
    },
    asyncs: {
      async animateToLarge(data) {
        const { pan } = data

        return new Promise((resolve) => {
          Animated.spring(pan, {
            ...PANEL_ANIM_OPTIONS,
            toValue: { x: 0, y: 0 },
          }).start(resolve)
        })
      },
      async animateToSmall(data) {
        const { pan, orientation, deviceHeight } = data

        const y =
          orientation === "portrait" ? deviceHeight / 2 : deviceHeight / 3

        return new Promise((resolve) => {
          Animated.spring(pan, {
            toValue: { x: 0, y },
            ...PANEL_ANIM_OPTIONS,
          }).start(resolve)
        })
      },
      async animateToClosed(data) {
        const { pan, panelHeight } = data

        return new Promise((resolve) => {
          Animated.spring(pan, {
            toValue: { x: 0, y: panelHeight },
            ...PANEL_ANIM_OPTIONS,
          }).start(resolve)
        })
      },
    },
  })

  // A stable pan responder, used to create pan handlers
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => state.send("GRANTED_PAN"),
        onPanResponderMove: (_, { dy }) => state.send("MOVED_PAN", { dy }),
        onPanResponderRelease: (_, { dy, vy }) => {
          if (dy < -100 || vy < -0.5) {
            state.send("RELEASED_SWIPING_UP")
          } else if (dy > 100 || vy > 0.5) {
            state.send("RELEASED_SWIPING_DOWN")
          } else {
            state.send("RELEASED_STABLE")
          }
        },
      }),
    [state]
  )

  // Set listeners on component mount
  React.useEffect(() => {
    function handleYChange(value: any) {
      state.send("MOVED_PANEL_Y", { y: value.value })
    }

    function onOrientationChange() {
      const { height, width } = Dimensions.get("screen")
      state.send("CHANGED_ORIENTATION", { height, width })
    }

    const id = state.data.pan.y.addListener(handleYChange)
    Dimensions.addEventListener("change", onOrientationChange)

    return () => {
      state.data.pan.y.removeListener(id)
      Dimensions.removeEventListener("change", onOrientationChange)
    }
  }, [state])

  // Handle change in `isActive` prop
  React.useEffect(() => {
    state.send(isActive ? "OPENED" : "CLOSED")
  }, [isActive])

  React.useEffect(() => {
    stack++
    return () => stack--
  }, [])

  const {
    deviceWidth,
    deviceHeight,
    animatedOpacity,
    panelHeight,
    pan,
  } = state.data

  return state.isIn("closed") ? null : (
    <Animated.View
      style={[SwipeablePanelStyles.background, { zIndex: state.data.zIndex }]}
    >
      <Animated.View
        style={[
          SwipeablePanelStyles.background,
          {
            width: deviceWidth,
            backgroundColor: "rgba(0,0,0,.5)",
            height: deviceHeight,
            opacity: animatedOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          SwipeablePanelStyles.panel,
          {
            width: fullWidth ? deviceWidth : deviceWidth - 50,
            height: panelHeight,
          },
          { transform: pan.getTranslateTransform() },
          style,
        ]}
        {...panResponder.panHandlers}
      >
        {!noBar && <Bar barStyle={barStyle} />}
        <View
          style={SwipeablePanelStyles.scrollViewContentContainerStyle}
          pointerEvents={state.isIn("stable") ? "auto" : "none"}
        >
          {children}
        </View>
      </Animated.View>
    </Animated.View>
  )
}

const SwipeablePanelStyles = StyleSheet.create({
  background: {
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
  panel: {
    height: PANEL_HEIGHT,
    width: FULL_WIDTH - 50,
    transform: [{ translateY: 0 }],
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    zIndex: 2,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  scrollViewContentContainerStyle: {
    width: "100%",
    flex: 1,
  },
})

const SMALL_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - (FULL_HEIGHT - 400) - 52
const LARGE_PANEL_CONTENT_HEIGHT = PANEL_HEIGHT - 52

export {
  SwipeablePanel,
  LARGE_PANEL_CONTENT_HEIGHT,
  SMALL_PANEL_CONTENT_HEIGHT,
}
