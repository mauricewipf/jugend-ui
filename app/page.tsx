import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Card, CardHeader } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { getSiteUrl } from "@/lib/site-url"
import registry from "@/registry.json"

const seasons = [
  {
    name: "Spring",
    href: "/spring",
    variant: "spring-teaser" as const,
  },
  {
    name: "Summer",
    href: "/summer",
    variant: "summer-teaser" as const,
  },
  {
    name: "Autumn",
    href: "/autumn",
    variant: "autumn-teaser" as const,
  },
  {
    name: "Winter",
    href: "/winter",
    variant: "winter-teaser" as const,
  },
] as const

export default function Page() {
  const siteUrl = getSiteUrl()
  const usageCode = `import { Button } from "@/components/ui/button";

<Button variant="autumn">Button</Button>;`

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-10 px-4 py-16 sm:px-6">
      <header className="space-y-4 text-center">
        <Heading
          level={1}
          variant="jugend"
          className="text-6xl font-medium tracking-tight"
        >
          Jugend UI
        </Heading>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Art Nouveau / Jugendstil UI components.
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Free. Open Source.{" "}
          <a
            className="text-foreground font-medium underline-offset-4 hover:underline"
            href="https://github.com/mauricewipf/jugend-ui"
          >
            View on GitHub →
          </a>
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Crafted by{" "}
          <a
            className="text-foreground font-medium underline-offset-4 hover:underline"
            href="https://x.com/mauwi"
          >
            Maurice Wipf →
          </a>
        </p>
      </header>

      <nav className="space-y-3">
        <h2 className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Seasons
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {seasons.map((season) => (
            <Link
              key={season.href}
              href={season.href}
              className="block w-[180px] shrink-0 transition-opacity hover:opacity-90"
            >
              <Card variant={season.variant} className="w-full">
                <CardHeader>
                  <Heading level={3} variant="jugend" className="text-3xl">
                    {season.name}
                  </Heading>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </nav>

      <section className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-lg font-medium">Installation</h2>
          <ul className="space-y-6">
            {registry.items.map((item) => (
              <li key={item.name} className="space-y-3">
                <h3 className="font-medium">{item.title}</h3>
                <CodeBlock
                  code={`bunx shadcn@latest add ${siteUrl}/r/${item.name}.json`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-medium">Usage</h2>
          <CodeBlock code={usageCode} />
        </div>
      </section>
    </main>
  )
}
