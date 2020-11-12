import * as React from "react"
import { ScrollView, ScrollViewProps, TouchableOpacity } from "react-native"

export type PanelContentProps = ScrollViewProps & { children: React.ReactNode }

export default function Content({ children, ...rest }: PanelContentProps) {
  return (
    <ScrollView
      onTouchStart={() => false}
      onTouchEnd={() => false}
      contentContainerStyle={{ width: "100%", flex: 1 }}
      {...rest}
    >
      <TouchableOpacity>
        <React.Fragment>{children}</React.Fragment>
      </TouchableOpacity>
    </ScrollView>
  )
}
