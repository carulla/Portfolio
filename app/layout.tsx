import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

import { Sidebar } from '@/components/layout/sidebar';
import { ExplorerSidebar } from '@/components/layout/explorer-sidebar';
import { BottomNav } from '@/components/layout/bottom-nav';
import { I18nProvider } from '@/components/providers/i18n-provider';

export const metadata: Metadata = {
  title: 'Gabriel Carulla | Vibe Coder & Full Stack Developer',
  description: 'Portfolio of Gabriel Carulla, AI Analyst and Full Stack Developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 overflow-hidden selection:bg-primary/30 selection:text-white`}
      >
        <I18nProvider>
          <div className="flex h-screen w-full flex-col md:flex-row bg-background-light dark:bg-background-dark">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Application Area */}
            <div className="flex-1 flex flex-row md:ml-14 overflow-hidden relative pb-20 md:pb-0">
              <ExplorerSidebar />
              <div className="flex-1 overflow-hidden relative flex flex-col h-full">
                {children}
              </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
