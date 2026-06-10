import Link from "next/link"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { getSiteUrl } from "@/lib/site-url"

const seasons = [
  {
    name: "Spring",
    href: "/spring",
    status: "coming soon" as const,
    image: "https://placehold.co/640x360/a7f3d0/065f46?text=Spring",
  },
  {
    name: "Summer",
    href: "/summer",
    status: "coming soon" as const,
    image: "https://placehold.co/640x360/fde68a/92400e?text=Summer",
  },
  {
    name: "Autumn",
    href: "/autumn",
    status: "live" as const,
    image: "https://placehold.co/640x360/fdba74/7c2d12?text=Autumn",
  },
  {
    name: "Winter",
    href: "/winter",
    status: "coming soon" as const,
    image: "https://placehold.co/640x360/bfdbfe/1e3a8a?text=Winter",
  },
] as const

export default function Page() {
  const siteUrl = getSiteUrl()
  const installCommand = `bunx shadcn@latest add ${siteUrl}/r/button.json`
  const usageCode = `import { Button } from "@/components/ui/button";

<Button variant="autumn">Button</Button>;`

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-10 px-4 py-16">
      <header className="space-y-4 text-center">
        <Heading
          level={1}
          variant="jugend"
          className="text-6xl font-medium tracking-tight"
        >
          Jugend UI
        </Heading>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Art Nouveau / Jugendstil UI components. Free. Open Source.{" "}
          <Link
            href="https://github.com/mauricewipf/jugend-ui"
            className="font-medium underline-offset-4 hover:underline"
          >
            View on GitHub
          </Link>
        </p>
      </header>

      <nav className="space-y-3">
        <h2 className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Seasons
        </h2>
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {seasons.map((season) => (
            <Link
              key={season.href}
              href={season.href}
              className="block transition-opacity hover:opacity-90"
            >
              <Card variant="default" className="h-full">
                <img
                  src={season.image}
                  alt=""
                  width={640}
                  height={360}
                  className="aspect-video w-full object-cover"
                />
                <CardHeader>
                  <CardTitle>{season.name}</CardTitle>
                  <CardAction>
                    <Badge
                      variant={
                        season.status === "live" ? "default" : "secondary"
                      }
                    >
                      {season.status === "live" ? "Live" : "Coming soon"}
                    </Badge>
                  </CardAction>
                </CardHeader>
              </Card>
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
