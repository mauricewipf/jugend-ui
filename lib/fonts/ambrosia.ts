import localFont from "next/font/local"

export const ambrosia = localFont({
  src: [
    {
      path: "../../assets/fonts/ambrosia/ambrosia-medium.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-ambrosia",
  display: "swap",
})
