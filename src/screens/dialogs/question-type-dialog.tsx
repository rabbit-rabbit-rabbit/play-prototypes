import * as React from "react"
import OptionsDialog from "@components/options-dialog"
import { send } from "@hooks/useAppState"
import * as Types from "../../types"

export default function QuestionTypeDialog({ visible }: { visible: boolean }) {
  return (
    <OptionsDialog
      visible={visible}
      title="Question Type"
      options={[
        {
          label: "Open Answer",
          onPress: () => send("SELECTED_OPEN", Types.QuestionType.Open),
        },
        {
          label: "Multiple Choice",
          onPress: () =>
            send("SELECTED_MULTIPLE", Types.QuestionType.MultipleChoice),
        },
        {
          label: "Scale",
          onPress: () => send("SELECTED_SCALE", Types.QuestionType.Scale),
        },
      ]}
    />
  )
}
