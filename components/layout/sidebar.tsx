'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Code2, Mail, Settings, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, href: '/', label: 'Home' },
        { icon: FolderOpen, href: '/projects', label: 'Work' },
        { icon: Code2, href: '/stack', label: 'Stack' },
        { icon: Mail, href: '/contact', label: 'Contact' },
    ];

    const bottomItems = [
        { icon: Settings, href: '#', label: 'Settings' },
    ];

    return (
        <div className="hidden md:flex fixed left-0 top-0 bottom-0 w-14 bg-surface-dark border-r border-slate-800 flex-col items-center py-4 z-50">
            <div className="flex flex-col items-center gap-6 w-full">
                {navItems.map((item) => {
                    const isActive = item.href === '/'
                        ? pathname === '/'
                        : pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'relative w-full flex justify-center py-2 transition-colors',
                                isActive
                                    ? 'text-primary border-l-2 border-primary'
                                    : 'text-slate-500 hover:text-slate-300 border-l-2 border-transparent'
                            )}
                            title={item.label}
                        >
                            <Icon strokeWidth={isActive ? 2 : 1.5} className="w-7 h-7" />
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto flex flex-col items-center gap-6 w-full">
                {bottomItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'relative w-full flex justify-center py-2 transition-colors',
                                isActive
                                    ? 'text-primary border-l-2 border-primary'
                                    : 'text-slate-500 hover:text-slate-300 border-l-2 border-transparent'
                            )}
                            title={item.label}
                        >
                            <Icon strokeWidth={isActive ? 2 : 1.5} className="w-7 h-7" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
