import type {ReactNode} from "react";
import {Links, Meta, Scripts, ScrollRestoration} from "react-router";

import {applyTheme, useDarkMode} from "@/hooks";

export function Document({children}: {children: ReactNode}) {
  const {theme} = useDarkMode();

  return (
    <html lang="ko" data-theme={theme} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{__html: `(${applyTheme})()`}}
          suppressHydrationWarning
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
