import * as React from "react"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import { StyleSheet, Text as _Text, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import DraggableFlatList from "react-native-draggable-flatlist"
import SwipeableItem from "react-native-swipeable-item"
import IconButton from "./icon-button"

const { multiply, sub } = Animated

type SwipeSortListProps = {
  onDelete: (index: number) => void
  onReorder: (from: number, to: number) => void
  children: React.ReactElement<
    { isActive: boolean; drag: () => void } & { [key: string]: any },
    any
  >[]
}

export default function SwipeSortList({
  onDelete,
  onReorder,
  children,
}: SwipeSortListProps) {
  const data = React.Children.map(children, (child, index) => ({
    key: child.key.toString(),
    id: index.toString(),
    child,
  }))

  function renderUnderlayRight({ item, percentOpen }) {
    return (
      <Animated.View
        style={[
          styles.TrashOptions,
          {
            transform: [{ translateX: multiply(sub(1, percentOpen), 0) }], // Translate from left on open
          },
        ]}
      >
        <IconButton
          icon="trash"
          color="#FF282B"
          size={16}
          onPress={() => onDelete(item.index)}
        />
      </Animated.View>
    )
  }

  function renderOverlay({ item }) {
    return React.cloneElement(item.item.child, {
      drag: item.drag,
      isActive: item.isActive,
    })
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <DraggableFlatList
        activationDistance={15}
        keyExtractor={(item) => item.key}
        data={data}
        renderItem={({ item, index, drag, isActive }) => (
          <SwipeableItem
            key={item.key}
            activationThreshold={20}
            item={{ item, drag, isActive }}
            renderUnderlayLeft={renderUnderlayRight}
            snapPointsLeft={[80]}
            renderOverlay={renderOverlay}
          />
        )}
        onDragEnd={({ from, to }) => onReorder(from, to)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  TrashOptions: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingLeft: 16,
    paddingRight: 16,
  },
  SwipeRow: {
    marginBottom: 8,
  },
  Scroll: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})
