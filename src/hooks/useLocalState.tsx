// @refresh-reset
import { isUndefined, pick } from "lodash"
import * as React from "react"
import { createState, S } from "@state-designer/core"

const emptyArray: unknown[] = []

/* -------------------------------------------------- */
/*                     React Hook                     */
/* -------------------------------------------------- */

/**
 * Subscribe a component to an existing state, or to a new one created from the provided designuration.
 * @param design A designuration object for a new state — or a state returned from createState.
 * @param dependencies (optional) An array of dependencies that, when changed, will rebuild a new state from the provided design.
 */

export default function useLocalState<
  D,
  R extends Record<string, S.Result<D>>,
  C extends Record<string, S.Condition<D>>,
  A extends Record<string, S.Action<D>>,
  Y extends Record<string, S.Async<D>>,
  T extends Record<string, S.Time<D>>,
  V extends Record<string, S.Value<D>>,
  J extends { [key in keyof V]: ReturnType<V[key]> }
>(design: S.Design<D, R, C, A, Y, T, V>, dependencies: any[] = emptyArray) {
  const rFirstMount = React.useRef(true)

  const [current, setCurrent] = React.useState(() => createState(design))

  React.useEffect(() => {
    function handleUpdate(update: S.DesignedState<D, J>) {
      setCurrent((current) => ({
        ...current,
        ...pick(
          update,
          "index",
          "data",
          "active",
          "stateTree",
          "values",
          "log"
        ),
      }))
    }

    // Only create a new state if the `design` property is design object.
    if (!rFirstMount.current) {
      const next = createState(design) as S.DesignedState<D, J>
      setCurrent(next)
      return next.onUpdate(handleUpdate)
    } else {
      rFirstMount.current = false
    }

    return current.onUpdate(handleUpdate)
  }, dependencies)

  return current
}
