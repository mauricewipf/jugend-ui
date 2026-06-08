import Link from "next/link"

const seasons = [
  { name: "Spring", href: "/spring" },
  { name: "Summer", href: "/summer" },
  { name: "Autumn", href: "/autumn" },
  { name: "Winter", href: "/winter" },
] as const

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-4">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-medium tracking-tight">Jugend UI</h1>
        <p className="text-muted-foreground text-sm">
          Choose a season to explore its component showcase.
        </p>
      </header>
      <nav className="grid w-full max-w-sm gap-3">
        {seasons.map((season) => (
          <Link
            key={season.href}
            href={season.href}
            className="hover:bg-muted rounded-lg border px-4 py-3 text-center text-sm font-medium transition-colors"
          >
            {season.name}
          </Link>
        ))}
      </nav>
    </main>
  )
}
