import "@/app/globals.css";
import CustomHeader from "@/components/ui/buttons/global/header/custom-header";
import { Karantina, Kanit } from "next/font/google";
const karantina = Karantina({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-karantina",
});

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${karantina.variable} ${kanit.variable} font-kanit max-w-7xl mx-auto relative h-screen`}
      >
        <CustomHeader navList={["Home", "Shop", "Collections", "Categories"]} />
        <div className="md:flex hidden absolute top-0 bottom-0 left-20 w-[2px] bg-secondary/50"></div>
        <main className="md:px-20 px-2">{children}</main>
        <div className="md:flex hidden absolute top-0 bottom-0 right-20 w-[2px] bg-secondary/50"></div>
      </body>
    </html>
  );
}
