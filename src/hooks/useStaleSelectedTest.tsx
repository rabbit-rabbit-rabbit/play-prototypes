import * as React from "react"
import * as Types from "types"

export default function useStaleSelectedTest(test: Types.UserTest) {
  const [selectedTest, setSelectedTest] = React.useState<Types.UserTest>()

  React.useEffect(() => {
    test && setSelectedTest(test)
  }, [test])

  return selectedTest
}
