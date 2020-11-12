import { isUndefined } from "lodash"
import { S } from "@state-designer/core"
import useGlobalState from "./useGlobalState"
import useLocalState from "./useLocalState"

const emptyArray: unknown[] = []

/* -------------------------------------------------- */
/*                     React Hook                     */
/* -------------------------------------------------- */

/**
 * Subscribe a component to an existing state, or to a new one created from the provided designuration.
 * @param design A designuration object for a new state — or a state returned from createState.
 * @param dependencies (optional) An array of dependencies that, when changed, will rebuild a new state from the provided design.
 */

export function useStateDesigner<
  D,
  R extends Record<string, S.Result<D>>,
  C extends Record<string, S.Condition<D>>,
  A extends Record<string, S.Action<D>>,
  Y extends Record<string, S.Async<D>>,
  T extends Record<string, S.Time<D>>,
  V extends Record<string, S.Value<D>>
>(
  design: S.Design<D, R, C, A, Y, T, V> | S.DesignedState<D, V>,
  dependencies: any[] = emptyArray
): S.DesignedState<D, V> {
  const designAsDesignedState = design as S.DesignedState<D, V>
  const designAsDesign = design as S.Design<D, R, C, A, Y, T, V>
  const isExternalState = !isUndefined(designAsDesignedState)

  if (isExternalState) {
    return useGlobalState(designAsDesignedState)
  } else {
    return useLocalState(designAsDesign, dependencies)
  }
}
