import * as React from "react"
import { StyleSheet } from "react-native"
import Button, { Content, ContentLeft, ContentRight } from "./button"
import * as Types from "types"

export type CopyLinkButtonProps = {
  test: Types.UserTest
}

export default function CopyLinkButton({ test }: CopyLinkButtonProps) {
  return (
    <Button>
      <Content>
        <ContentLeft
          title={test.name}
          secondaryTitle="Anyone with the link can take the test."
        />
        <ContentRight icon="copy" />
      </Content>
    </Button>
  )
}
