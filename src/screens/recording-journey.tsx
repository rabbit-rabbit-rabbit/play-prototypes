import * as React from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"
import IconButton from "@components/icon-button"

import useAppState, { send } from "@hooks/useAppState"

export default function RecordingJourney() {
  const local = useAppState()

  const [time, setTime] = React.useState(3)

  const isLoading = local.isIn("loading")

  React.useEffect(() => {
    if (isLoading) {
      setTime(3)
    }
  }, [isLoading])

  React.useEffect(() => {
    if (time > 0) {
      const timeout = setTimeout(() => {
        setTime((time) => time - 1)
      }, 1000)
      return () => clearTimeout(timeout)
    } else {
      send("READY")
    }
  }, [time])

  return (
    <View style={styles.Container}>
      {local.whenIn({
        loading: (
          <View style={styles.Blank}>
            <View style={styles.Pill}>
              <Text style={styles.PillText}>Recording in: {time}</Text>
            </View>
          </View>
        ),
        active: (
          <View style={styles.Blank}>
            <Text style={styles.Temp}>
              User interacts with their prototype ...
            </Text>
          </View>
        ),
        complete: (
          <View style={styles.Complete}>
            <View style={styles.Page} />
            <View style={styles.Header}>
              <IconButton icon="x" color="#fff" size={24} onPress={() => {}} />
              <IconButton
                icon="play"
                color="#30E9AA"
                size={24}
                onPress={() => {}}
              />
            </View>
            <View style={styles.Footer}>
              <Pressable
                style={[styles.Action]}
                onPress={() => send("RERECORDED")}
              >
                <Text
                  style={[
                    styles.Action,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Rerecord
                </Text>
              </Pressable>
              <Pressable
                style={[styles.Action]}
                onPress={() => send("FINISHED_RECORDING")}
              >
                <Text
                  style={[
                    styles.Action,
                    {
                      color: "#00ff9d",
                    },
                  ]}
                >
                  Finish
                </Text>
              </Pressable>
            </View>
          </View>
        ),
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    zIndex: 999,
    flex: 1,
    width: "100%",
  },
  Blank: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  Complete: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  Page: {
    width: 280,
    height: 604,
    backgroundColor: "#fff",
    borderRadius: 20,
    position: "absolute",
    top: 104,
    alignSelf: "center",
  },
  Header: {
    position: "absolute",
    top: 44,
    width: "100%",
    height: 44,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 66,
    backgroundColor: "#1A1A1D",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  Pill: {
    position: "absolute",
    bottom: 42,
    alignSelf: "center",
    width: 128,
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: "#FFCA00",
    borderRadius: 999,
    zIndex: 1000,
  },
  PillText: {
    fontSize: 13,
  },
  Temp: {
    alignSelf: "center",
    position: "absolute",
    top: "50%",
    textAlign: "center",
  },
  Action: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: "#00ff9d",
  },
})
