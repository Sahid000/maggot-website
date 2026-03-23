import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { mainTheme } from "@/theme";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://maggotfreekit.com";
const siteName = "ম্যাগট-ফ্রি রেসকিউ কিট";
const siteDescription =
  "কুকুর ও পশুর ক্ষতস্থান থেকে ম্যাগট (পোকা) নির্মূলের জন্য সহজ, নিরাপদ ও কার্যকর কিট। এখনই অর্ডার করুন এবং ঘরে বসে ডেলিভারি পান।";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | কুকুরের ক্ষত থেকে ম্যাগট নির্মূলের সমাধান`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "ম্যাগট ফ্রি কিট",
    "maggot free kit",
    "কুকুরের ক্ষত চিকিৎসা",
    "পশু চিকিৎসা",
    "ম্যাগট নির্মূল",
    "maggot treatment dog",
    "কুকুরের যত্ন",
    "ম্যাগট-ফ্রি রেসকিউ কিট",
    "বাংলাদেশ পশু চিকিৎসা",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: siteUrl,
    siteName,
    title: `${siteName} | কুকুরের ক্ষত থেকে ম্যাগট নির্মূলের সমাধান`,
    description: siteDescription,
    images: [
      {
        url: "/assets/images/product.png",
        width: 1200,
        height: 630,
        alt: "ম্যাগট-ফ্রি রেসকিউ কিট",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | কুকুরের ক্ষত থেকে ম্যাগট নির্মূলের সমাধান`,
    description: siteDescription,
    images: ["/assets/images/product.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${notoSansBengali.variable} antialiased`}>
        <AntdRegistry>
          <Toaster position="top-center" richColors />
          <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
