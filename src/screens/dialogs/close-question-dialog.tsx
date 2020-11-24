import * as React from "react"
import ConfirmDialog from "@components/confirm-dialog"
import { send } from "@hooks/useAppState"

export default function CloseQuestionDialog({ visible }: { visible: boolean }) {
  return (
    <ConfirmDialog
      visible={visible}
      title="Discard Changes?"
      description="You haven't saved your changes for this question. Do you want to close it anyway?"
      confirmTitle="Close"
      onConfirm={() => send("CONFIRMED_CLOSE")}
    />
  )
}
