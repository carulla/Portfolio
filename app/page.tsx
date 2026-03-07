'use client';

import { TerminalWindow, TypewriterText } from '@/components/ui/terminal-window';
import { motion } from 'framer-motion';
import { Folder, Database, LayoutTemplate, Braces, Phone, Mail, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';


export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar md:flex-row">
      {/* Top/Left Section: Visual Profile */}
      <section className="relative w-full md:w-2/5 h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-slate-800 flex-shrink-0 group overflow-hidden bg-background-dark">
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent z-20" />

        <div className="w-full h-full glitch-border relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Portfolio/gabriel.png"
            alt="Gabriel Carulla"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
          />
        </div>

        <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="bg-primary/90 text-white text-[10px] px-2 py-1 rounded uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(19,91,236,0.6)]">
            Live Status: Coding
          </span>
        </div>
      </section>

      {/* Bottom/Right Section: Terminal Content */}
      <section className="flex-1 bg-background-dark p-4 md:p-8 flex flex-col justify-center">
        <div className="max-w-2xl w-full mx-auto space-y-6">
          <TerminalWindow title="gabriel_os.sh" className="border-glow bg-slate-900/50">
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 flex-wrap text-sm md:text-base">
                  <span className="text-terminal-green font-semibold">guest@carulla</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-primary font-semibold">~</span>
                  <span className="text-slate-100">$</span>
                  <span className="text-slate-100">whoami</span>
                </div>

                <div className="pl-0 mt-2 text-terminal-cyan font-bold tracking-wide text-sm md:text-base">
                  <TypewriterText key={t('home.role')} text={`> ${t('home.role')}`} delay={500} />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 1 }}
                className="pt-6 border-t border-slate-800/50"
              >
                <div className="flex items-center gap-2 opacity-60 mb-4 text-sm md:text-base">
                  <span className="text-terminal-green">guest@carulla</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-primary">~</span>
                  <span className="text-slate-100">$</span>
                  <span className="text-slate-400">ls ./stack</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-slate-300">
                  <div className="flex items-center gap-3 hover:text-primary transition-colors cursor-default">
                    <Braces className="w-4 h-4 text-yellow-500" />
                    <span>Next.js & Vue.js</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-primary transition-colors cursor-default">
                    <Folder className="w-4 h-4 text-blue-400" />
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-primary transition-colors cursor-default">
                    <Database className="w-4 h-4 text-emerald-500" />
                    <span>Supabase & N8N</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-primary transition-colors cursor-default">
                    <LayoutTemplate className="w-4 h-4 text-cyan-400" />
                    <span>TailwindCSS</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, duration: 0.8 }}
                className="mt-8 p-4 bg-surface-dark/40 rounded-lg border border-slate-800/50"
              >
                <p className="text-slate-400 italic text-xs md:text-sm leading-relaxed">
                  {t('home.bio')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 5.5, duration: 1 }}
                className="pt-6 border-t border-slate-800/50"
              >
                <div className="flex items-center gap-2 opacity-60 mb-4 text-sm md:text-base">
                  <span className="text-terminal-green">guest@carulla</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-primary">~</span>
                  <span className="text-slate-100">$</span>
                  <span className="text-slate-400">cat contact.txt</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-300">
                  <a href="https://wa.me/5583991084586" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span>83 99108-4586</span>
                  </a>
                  <a href="mailto:gabcarulla@hotmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>gabcarulla@hotmail.com</span>
                  </a>
                  <a href="https://instagram.com/gabriel.carulla" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span>@gabriel.carulla</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </TerminalWindow>
        </div>
      </section>
    </main>
  );
}
