import localFont from "next/font/local"

export const nouveauNostalgia = localFont({
  src: [
    {
      path: "../../assets/fonts/nouveau-nostalgia/nouveau-nostalgia.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/nouveau-nostalgia/nouveau-nostalgia.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nouveau-nostalgia",
  display: "swap",
})
