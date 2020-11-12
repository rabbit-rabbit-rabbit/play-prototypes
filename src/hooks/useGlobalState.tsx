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

export default function useGlobalState<
  D,
  V extends Record<string, S.Value<D>>,
  J extends { [key in keyof V]: ReturnType<V[key]> }
>(design: S.DesignedState<D, J>) {
  const [current, setCurrent] = React.useState(() => design)

  React.useEffect(() => {
    setCurrent(design)

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

    return design.onUpdate(handleUpdate)
  }, [design])

  return current
}
