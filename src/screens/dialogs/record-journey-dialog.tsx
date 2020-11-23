import * as React from "react"
import ConfirmDialog from "@components/confirm-dialog"
import { send } from "@hooks/useAppState"

export default function RecordJourneyDialog({ visible }: { visible: boolean }) {
  return (
    <ConfirmDialog
      visible={visible}
      title="Record Expected Journey"
      description="You’re about to record a User Journey. To stop, Exit Play mode."
      confirmTitle="Record"
      onConfirm={() => send("STARTED_RECORDING_JOURNEY")}
    />
  )
}
