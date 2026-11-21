import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

      <Card variant="autumn-salon" className="w-full">
        <CardHeader>
          <Badge variant="autumn-ribbon" className="mx-auto mb-1">
            New · Complete Library Review
          </Badge>
          <CardTitle align="center" className="text-3xl sm:text-4xl">
            Component Review Atelier
          </CardTitle>
          <CardDescription className="text-center">
            Explore all 22 Jugend UI components across Botanical, Salon
            Passe-Partout, and Vienna Secession versions in all four seasons.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm">
          Compare multiple versions side-by-side on mobile and desktop to choose
          your preferred frames.
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="autumn-gilded" size="lg" asChild>
            <Link href="/showcase">Open Review Atelier →</Link>
          </Button>
        </CardFooter>
      </Card>

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
                    {"comingSoon" in season && season.comingSoon
                      ? " (Coming Soon)"
                      : null}
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
