import { Providers } from './providers';
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="night">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}