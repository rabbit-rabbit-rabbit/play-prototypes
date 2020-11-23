import { Text as _Text, View, TouchableOpacity } from "react-native"
import { styled } from "dripsy"

export const Text = {
  Body: styled(_Text)({
    color: "$primaryFill",
    fontSize: "$body",
    fontFamily: "$body",
    fontWeight: "$body",
    letterSpacing: "$body",
  }),
  Title: styled(_Text)({
    color: "$primaryFill",
    fontSize: "$title",
    fontFamily: "$title",
    fontWeight: "$title",
    letterSpacing: "$title",
  }),
  Instruction: styled(_Text)({
    color: "$secondaryFill",
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "400",
    paddingHorizontal: 32,
  }),
  Detail: styled(_Text)({
    color: "$secondaryFill",
    fontSize: "$detail",
    fontFamily: "$detail",
    fontWeight: "$detail",
    letterSpacing: "$detail",
    lineHeight: "$body",
  }),
  Label: styled(_Text)({
    color: "$primaryFill",
    fontSize: "$title",
    fontFamily: "$body",
    fontWeight: "$body",
    letterSpacing: "$body",
    lineHeight: "$body",
  }),
  Section: styled(_Text)({
    color: "$secondaryFill",
    fontSize: "$section",
    fontFamily: "$body",
    fontWeight: "$body",
    letterSpacing: "$section",
    textTransform: "uppercase",
  }),
}

export const Views = {
  Item: styled(View)({
    width: "100%",
    height: 64,
    backgroundColor: "$quaternaryFill",
    borderRadius: 3,
    marginBottom: 2,
    overflow: "hidden",
  }),
}

export const Buttons = {
  ListButton: styled(TouchableOpacity)({
    width: "100%",
    height: 64,
    backgroundColor: "$quaternaryFill",
    borderRadius: 3,
    marginBottom: 2,
    overflow: "hidden",
  }),
}

const spacer = {
  width: "100%",
}

export const Spacers = {
  XXS: styled(View)({ ...spacer, height: 4 }),
  XS: styled(View)({ ...spacer, height: 8 }),
  S: styled(View)({ ...spacer, height: 16 }),
  M: styled(View)({ ...spacer, height: 24 }),
  L: styled(View)({ ...spacer, height: 32 }),
  XL: styled(View)({ ...spacer, height: 40 }),
}
