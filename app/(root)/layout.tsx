import "@/app/globals.css";
import Footer from "@/components/ui/buttons/global/footer";
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
        <main className="md:border-x md:mx-20">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
