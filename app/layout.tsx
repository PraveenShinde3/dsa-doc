import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { JetBrains_Mono, Lexend } from "next/font/google";
import { Footer } from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";
import ClientPageWrapper from "@/components/ClientPageWrapper";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: "400",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={` ${monoFont.variable} ${lexend.variable} font-lexend antialiased tracking-wide min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="sm:container flex-1 mx-auto w-[90vw] h-auto scroll-smoothn">
            <ClientPageWrapper>{children}</ClientPageWrapper>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-PYXY69YBZL" />
    </html>
  );
}
