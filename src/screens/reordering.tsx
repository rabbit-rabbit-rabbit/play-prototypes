import * as React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { BlurView } from "expo-blur"
import IconButton from "@components/icon-button"
import { send } from "@hooks/useAppState"
import { Feather } from "@expo/vector-icons"
import { ScrollView } from "dripsy"
import DraggableFlatList from "react-native-draggable-flatlist"

// import styles from "./styles"

type Item = {
  title: string
  id: string
}

export default function Reordering({ items = [] }: { items: Item[] }) {
  return (
    <View style={styles.Container}>
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={100} />
      <View style={styles.Header}>
        <IconButton
          icon="x"
          color="#fff"
          size={24}
          onPress={() => send("CLOSED_DIALOG")}
        />
        <Text style={styles.Title}>Reorder</Text>
        <IconButton icon="x" color="transparent" size={24} onPress={() => {}} />
      </View>
      <DraggableFlatList
        data={items}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) =>
          send(
            "REORDERED",
            data.map((d) => d.id)
          )
        }
        renderItem={({ item, index, drag, isActive }) => (
          <TouchableOpacity onLongPress={drag}>
            <Item item={item} index={index} isActive={isActive} />
          </TouchableOpacity>
        )}
        style={styles.Scroll}
      />
    </View>
  )
}

function Item({
  item,
  isActive,
  index,
}: {
  item: Item
  isActive: boolean
  index: number
}) {
  return (
    <View style={[styles.ItemContainer, isActive ? styles.ItemActive : null]}>
      <View style={styles.ItemHeader}>
        <Text style={styles.ItemTitle}>{item.title}</Text>
        <Feather name="menu" size={18} color="#fff" style={styles.ItemIcon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(255, 255, 255,.3)",
    zIndex: 1999,
  },
  Header: {
    marginTop: 44,
    height: 44,
    paddingHorizontal: 4,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Title: {
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
  },
  Scroll: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ItemContainer: {
    backgroundColor: "rgba(255, 255, 255, .05)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    marginBottom: 4,
  },
  ItemHeader: {
    flexDirection: "row",
  },
  ItemIcon: {
    position: "absolute",
    right: 0,
    alignSelf: "center",
  },
  ItemTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
    width: "100%",
  },
  ItemActive: {
    marginHorizontal: 16,
    transform: [{ scale: 1.03 }],
    backgroundColor: "#474747",
  },
})
