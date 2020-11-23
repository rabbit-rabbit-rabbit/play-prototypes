import { useState, useEffect } from "react"
import { createState, useStateDesigner } from "@state-designer/react"

type Panel = { id: string; open: boolean }

const state = createState({
  data: {
    stack: [] as Panel[],
  },
  on: {
    OPENED_PANEL: {
      get: "panel",
      do: "openPanel",
    },
    CLOSED_PANEL: {
      get: "panel",
      do: "closePanel",
    },
    ADDED_PANEL: {
      do: "addPanelToStack",
    },
    REMOVED_PANEL: {
      do: "removePanelFromStack",
    },
  },
  results: {
    panel(data, panel: Panel) {
      return data.stack.find((p) => p.id === panel.id)
    },
  },
  actions: {
    openPanel(data, _, panel: Panel) {
      panel.open = true
      const t = data.stack.indexOf(panel)
      data.stack.push(...data.stack.splice(t, 1))
    },
    closePanel(data, _, panel: Panel) {
      panel.open = false
      const t = data.stack.indexOf(panel)
      data.stack.unshift(...data.stack.splice(t, 1))
    },
    addPanelToStack(data, panel: Panel) {
      if (panel.open) {
        data.stack.push(panel)
      } else {
        data.stack.unshift(panel)
      }
    },
    removePanelFromStack(data, panel: Panel) {
      data.stack = data.stack.filter((p) => p.id !== panel.id)
    },
  },
  values: {
    order(data) {
      return data.stack.filter((p) => p.open).map((p) => p.id)
    },
  },
})

export default function usePanelStack(id: string, open: boolean) {
  useEffect(() => {
    state.send("ADDED_PANEL", { id, open })
    return () => state.send("REMOVED_PANEL", { id, open })
  }, [])

  useEffect(() => {
    if (open) {
      state.send("OPENED_PANEL", { id, open })
    } else {
      state.send("CLOSED_PANEL", { id, open })
    }
  }, [open])

  const local = useStateDesigner(state)

  const zIndex = open ? local.values.order.indexOf(id) : -2

  return { zIndex, isTopPanel: zIndex === local.values.order.length - 1 }
}
