import * as React from "react";
import {
  StyleSheet,
  Button,
  ButtonProps,
  Text,
  View,
  Animated,
  Pressable,
  PressableProps,
} from "react-native";
import IconButton, { IconButtonProps } from "../icon-button";

export type PanelHeaderProps = {
  title: string;
  leftAction?: PressableProps & { title: string };
  leftButton?: IconButtonProps;
  leftButton2?: IconButtonProps;
  rightAction?: PressableProps & { title: string };
  rightButton?: IconButtonProps;
  rightButton2?: IconButtonProps;
};

export default function PanelHeader({
  title = "Title",
  leftAction,
  leftButton,
  leftButton2,
  rightAction,
  rightButton,
  rightButton2,
}: PanelHeaderProps) {
  // const fadeAnim = React.useRef(new Animated.Value(0)).current

  // const fadeIn = async () => {
  //   Animated.sequence([
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 0,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 210,
  //       useNativeDriver: true,
  //       delay: 100,
  //     }),
  //   ]).start()
  // }

  // React.useEffect(() => {
  //   fadeIn()
  // }, [title])

  return (
    <Animated.View
      style={[
        styles.PanelHeader,
        // {
        //   opacity: fadeAnim, // Bind opacity to animated value
        // },
      ]}
    >
      <Text style={styles.PanelTitle}>{title}</Text>
      {leftAction && (
        <Pressable style={styles.SecondaryAction} onPress={leftAction.onPress}>
          <Text style={styles.SecondaryAction}>{leftAction.title}</Text>
        </Pressable>
      )}
      <View style={styles.Left}>
        {[leftButton, leftButton2].filter(Boolean).map((props, i) => (
          <IconButton key={i} style={styles.Icon} {...props} />
        ))}
      </View>
      <View style={styles.Right}>
        {[rightButton2, rightButton].filter(Boolean).map((props, i) => (
          <IconButton key={i} style={styles.Icon} {...props} />
        ))}
        {rightAction && (
          <Pressable style={styles.Action} onPress={rightAction.onPress}>
            <Text style={styles.Action}>{rightAction.title}</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  PanelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 54,
  },
  PanelTitle: {
    color: "#FFFFFF",
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    fontFamily: "Helvetica Neue",
  },
  Left: {
    flexDirection: "row",
    paddingLeft: 6,
  },
  Right: {
    flexDirection: "row",
    paddingRight: 6,
  },
  Icon: {
    top: -12,
  },
  SecondaryAction: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: "rgba(255, 255, 255, .5)",
  },
  Action: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: "#00ff9d",
  },
});
