'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Code2, Mail, Settings, UserCircle, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function Sidebar() {
    const pathname = usePathname();
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const nextLang = i18n.language.startsWith('en') ? 'pt' : 'en';
        i18n.changeLanguage(nextLang);
    };

    const navItems = [
        { icon: Home, href: '/', label: t('nav.home') },
        { icon: FolderOpen, href: '/projects', label: t('nav.work') },
        { icon: Code2, href: '/stack', label: t('nav.stack') },
        { icon: Mail, href: '/contact', label: t('nav.contact') },
    ];

    const bottomItems = [
        { icon: Settings, href: '#', label: t('nav.settings') },
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

            <div className="mt-auto flex flex-col items-center gap-6 w-full pb-4">
                <button
                    onClick={toggleLanguage}
                    className="relative w-full flex justify-center py-2 text-slate-500 hover:text-primary transition-colors border-l-2 border-transparent"
                    title={i18n.language.startsWith('en') ? 'Change to Portuguese' : 'Mudar para Inglês'}
                >
                    <Languages className="w-7 h-7" />
                    <span className="absolute -top-1 -right-0 text-[8px] font-bold bg-primary/20 text-primary px-1 rounded uppercase">
                        {i18n.language.split('-')[0]}
                    </span>
                </button>
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
