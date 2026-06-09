"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type CodeBlockProps = {
  code: string
  className?: string
}

function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative rounded-lg border bg-muted/50", className)}>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </button>
      <pre className="overflow-x-auto p-4 pr-12 font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export { CodeBlock }
