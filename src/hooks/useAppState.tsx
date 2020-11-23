import state from "../state"
import { useStateDesigner } from "@state-designer/react"

export default function useAppState() {
  return useStateDesigner(state)
}

export function send(event: string, payload: any = {}) {
  state.send(event, payload)
}
