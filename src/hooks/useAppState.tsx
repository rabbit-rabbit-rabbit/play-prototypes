import state from "../state"
import useGlobalState from "./useGlobalState"

export default function useAppState() {
  return useGlobalState(state)
}

export function send(event: string, payload: any = {}) {
  state.send(event, payload)
}
