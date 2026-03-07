'use client';

import { TerminalWindow } from '@/components/ui/terminal-window';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function StackPage() {
    const { t } = useTranslation();
    const stack = [
        { label: 'Full Stack', type: 'code', icon: '💻' },
        { label: 'Vibe Coder', type: 'code', icon: '✨' },
        { label: 'AI Automation', type: 'code', icon: '🤖' },
        { label: t('nav.teacher') || 'English Teacher', type: 'translate', icon: '🌍' },
    ];

    return (
        <div className="flex flex-col h-full w-full justify-center items-center bg-background-light dark:bg-background-dark p-6 overflow-hidden">
            <div className="w-full max-w-md rounded-xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800">
                <TerminalWindow title="bash — 80x24">
                    <div className="flex gap-2">
                        <span className="text-primary font-bold">$</span>
                        <span className="text-slate-100 italic">{t('stack.install')}</span>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                        }}
                        className="flex flex-wrap gap-2 pt-4"
                    >
                        {stack.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs md:text-sm
                  ${item.type === 'code'
                                        ? 'bg-primary/10 border-primary/30 text-primary'
                                        : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                            >
                                <span>{item.icon}</span>
                                <span className="font-semibold uppercase tracking-wider">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-4 text-slate-500 text-xs"
                    >
                        <span>{t('stack.packages')}</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="flex gap-2 mt-4"
                    >
                        <span className="text-primary font-bold">$</span>
                        <span className="w-2 h-4 bg-primary/80 animate-pulse mt-1"></span>
                    </motion.div>
                </TerminalWindow>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="p-4 rounded-xl bg-slate-200/50 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 backdrop-blur-md">
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 uppercase font-bold tracking-wider">{t('stack.commits')}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">1.2k+</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-200/50 dark:bg-slate-900/40 border border-slate-300 dark:border-slate-800 backdrop-blur-md">
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1 uppercase font-bold tracking-wider">{t('stack.experience')}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t('stack.years')}</p>
                </div>
            </div>
        </div>
    );
}
