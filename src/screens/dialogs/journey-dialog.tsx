import * as React from "react"
import OptionsDialog from "@components/options-dialog"
import { send } from "@hooks/useAppState"

export default function JourneyDialog({ visible }: { visible: boolean }) {
  return (
    <OptionsDialog
      visible={visible}
      title="User Journey"
      options={[
        { label: "Rerecord", onPress: () => send("RERECORDED") },
        { label: "Delete", onPress: () => send("DELETED_JOURNEY") },
      ]}
    />
  )
}
