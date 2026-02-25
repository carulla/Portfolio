'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Code2, User, Mail, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, href: '/', label: 'Home' },
        { icon: FolderOpen, href: '/projects', label: 'Work' },
        { icon: Code2, href: '/stack', label: 'Stack' },
        { icon: Mail, href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="md:hidden sticky lg:fixed bottom-0 left-0 right-0 z-50 flex h-20 w-full items-center justify-around border-t border-slate-800 bg-background-dark/90 backdrop-blur-md px-2 pb-safe">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "flex flex-1 flex-col items-center justify-center gap-1 transition-colors",
                            isActive ? "text-primary" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        <div className="relative flex h-8 items-center justify-center">
                            <Icon strokeWidth={isActive ? 2.5 : 1.5} className="w-6 h-6" />
                            {isActive && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(19,91,236,0.8)]" />
                            )}
                        </div>
                        <span className={cn(
                            "text-[10px] uppercase tracking-widest",
                            isActive ? "font-bold" : "font-medium"
                        )}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
