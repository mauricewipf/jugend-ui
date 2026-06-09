import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { getSiteUrl } from "@/lib/site-url"

const seasons = [
  { name: "Spring", href: "/spring", status: "coming soon" as const },
  { name: "Summer", href: "/summer", status: "coming soon" as const },
  { name: "Autumn", href: "/autumn", status: "live" as const },
  { name: "Winter", href: "/winter", status: "coming soon" as const },
] as const

export default function Page() {
  const siteUrl = getSiteUrl()
  const installCommand = `bunx shadcn@latest add ${siteUrl}/r/button.json`
  const usageCode = `import { Button } from "@/components/ui/button";

<Button variant="autumn">Button</Button>;`

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-4 py-16">
      <header className="space-y-4 text-center">
        <h1 className="text-4xl font-medium tracking-tight">Jugend UI</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Art Nouveau / Jugendstil UI components. Free. Open Source.
        </p>
        <p>
          <Link
            href="/autumn"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            View component showcase →
          </Link>
        </p>
      </header>

      <nav className="space-y-3">
        <h2 className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Seasons
        </h2>
        <div className="grid w-full gap-3">
          {seasons.map((season) => (
            <Link
              key={season.href}
              href={season.href}
              className="hover:bg-muted flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors"
            >
              <span>{season.name}</span>
              <Badge variant={season.status === "live" ? "default" : "secondary"}>
                {season.status === "live" ? "Live" : "Coming soon"}
              </Badge>
            </Link>
          ))}
        </div>
      </nav>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Installation</h2>
          <CodeBlock code={installCommand} />
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-medium">Usage</h2>
          <CodeBlock code={usageCode} />
        </div>
      </section>
    </main>
  )
}
