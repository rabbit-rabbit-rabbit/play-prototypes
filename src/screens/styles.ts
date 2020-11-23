import { StyleSheet } from "react-native"

export default StyleSheet.create({
  Content: {
    paddingHorizontal: 16,
    flex: 1,
  },
  ScrollingContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  Instruction: {
    color: "rgba(255, 255, 255, .5)",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "400",
    paddingHorizontal: 32,
  },
  Footer: {
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  Chip: {
    paddingTop: 8,
    height: 32,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255, 255, 255, .1)",
    borderRadius: 12,
    marginBottom: 8,
    color: "#fff",
    overflow: "hidden",
  },
})
