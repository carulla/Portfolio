'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Terminal, Share2 } from 'lucide-react';

interface TerminalWindowProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    onShare?: () => void;
}

export function TerminalWindow({ title = 'bash', children, className, onShare }: TerminalWindowProps) {
    return (
        <div className={cn("flex flex-col rounded-xl overflow-hidden bg-background-dark shadow-2xl border border-slate-800", className)}>
            <header className="flex items-center justify-between px-4 py-3 bg-surface-dark/50 backdrop-blur-md border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Terminal className="text-primary w-5 h-5" />
                    <h1 className="text-sm font-bold tracking-tight uppercase opacity-80">{title}</h1>
                </div>
                {onShare && (
                    <button
                        onClick={onShare}
                        className="hover:text-primary text-slate-400 transition-colors cursor-pointer"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                )}
            </header>
            <div className="flex-1 p-5 font-mono text-sm overflow-y-auto custom-scrollbar">
                {children}
            </div>
        </div>
    );
}

export function TypewriterText({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setTimeout(() => {
            const intervalId = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i === text.length) clearInterval(intervalId);
            }, 50);
            return () => clearInterval(intervalId);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-current ml-1 align-middle"
            />
        </span>
    );
}
