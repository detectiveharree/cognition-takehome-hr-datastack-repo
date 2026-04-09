"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ ...props }: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
  )
}

function CollapsibleContent({ className, children, ...props }: CollapsiblePrimitive.Panel.Props & { className?: string; children?: React.ReactNode }) {
  return (
    <CollapsiblePrimitive.Panel 
      data-slot="collapsible-content" 
      className={`overflow-hidden data-[ending-style]:h-0 data-[starting-style]:h-0 ${className || ''}`}
      {...props} 
    >
      {children}
    </CollapsiblePrimitive.Panel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
