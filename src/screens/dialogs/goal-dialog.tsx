import * as React from "react"
import OptionsDialog from "@components/options-dialog"
import { send } from "@hooks/useAppState"

export default function GoalDialog({ visible }: { visible: boolean }) {
  return (
    <OptionsDialog
      visible={visible}
      title="Goal"
      options={[
        { label: "Reorder", onPress: () => send("STARTED_REORDERING") },
        { label: "Delete", onPress: () => send("DELETED_GOAL"), warn: true },
      ]}
    />
  )
}
