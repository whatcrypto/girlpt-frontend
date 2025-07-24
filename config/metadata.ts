export const siteConfig = {
  name: "GirlfriendPT",
  description: "Your AI companion for meaningful conversations and emotional connection. Experience personalized AI chat with customizable characters.",
  url: "https://girlfriendpt.com",
  ogImage: "https://girlfriendpt.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/girlfriendpt",
    github: "https://github.com/girlfriendpt",
  },
}

export const metadata = {
  title: {
    default: "GirlfriendPT - AI Companion Chat App",
    template: "%s | GirlfriendPT"
  },
  description: "Connect with your personalized AI companion. Experience meaningful conversations, emotional support, and engaging roleplay with our advanced AI chat technology.",
  keywords: [
    "AI chat app",
    "AI girlfriend app",
    "AI companion app",
    "AI roleplay chat",
    "AI character chat",
    "virtual girlfriend app",
    "AI chat bot app",
    "AI conversation app",
    "AI relationship app",
    "AI dating simulator",
    "AI chat companion",
    "AI emotional support",
    "AI conversation partner",
    "AI chat girlfriend",
    "AI virtual companion"
  ],
  authors: [{ name: "GirlfriendPT Team" }],
  creator: "GirlfriendPT",
  publisher: "GirlfriendPT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://girlfriendpt.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://girlfriendpt.com",
    title: "GirlfriendPT - AI Companion Chat App",
    description: "Connect with your personalized AI companion. Experience meaningful conversations, emotional support, and engaging roleplay with our advanced AI chat technology.",
    siteName: "GirlfriendPT",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GirlfriendPT - AI Companion Chat App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GirlfriendPT - AI Companion Chat App",
    description: "Connect with your personalized AI companion. Experience meaningful conversations, emotional support, and engaging roleplay.",
    images: ["/og-image.jpg"],
    creator: "@girlfriendpt",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
}

export const seoConfig = {
  title: "GirlfriendPT - AI Companion Chat App",
  description: "Connect with your personalized AI companion. Experience meaningful conversations, emotional support, and engaging roleplay with our advanced AI chat technology.",
  keywords: [
    "AI chat app",
    "AI girlfriend app",
    "AI companion app",
    "AI roleplay chat",
    "AI character chat",
    "virtual girlfriend app",
    "AI chat bot app",
    "AI conversation app",
    "AI relationship app",
    "AI dating simulator",
    "AI chat companion",
    "AI emotional support",
    "AI conversation partner",
    "AI chat girlfriend",
    "AI virtual companion"
  ],
  openGraph: {
    title: "GirlfriendPT - AI Companion Chat App",
    description: "Connect with your personalized AI companion. Experience meaningful conversations, emotional support, and engaging roleplay.",
    url: "https://girlfriendpt.com",
    siteName: "GirlfriendPT",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GirlfriendPT - AI Companion Chat App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    handle: "@girlfriendpt",
    site: "@girlfriendpt",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "GirlfriendPT",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "msapplication-TileColor",
      content: "#000000",
    },
    {
      name: "msapplication-config",
      content: "/browserconfig.xml",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
}
