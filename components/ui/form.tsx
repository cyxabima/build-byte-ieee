"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { createContext, useContext } from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"

type FormContext = {
  name: string
  error?: string
}

const FormFieldContext = createContext<FormContext | null>(null)

export function useFormField() {
  const ctx = useContext(FormFieldContext)
  if (!ctx) throw new Error("useFormField must be used within <FormField>")
  return ctx
}

function FormField({ name, error, children }: { name: string; error?: string; children: React.ReactNode }) {
  return <FormFieldContext.Provider value={{ name, error }}>{children}</FormFieldContext.Provider>
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("space-y-2", className)} {...props} />
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={cn(className)} {...props} />
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<React.ComponentRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(({ ...props }, ref) => {
  return <Slot ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, children, ...props }, ref) => {
  return (
    <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export { FormField, FormItem, FormLabel, FormControl, FormMessage }
