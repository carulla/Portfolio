'use client';

import { usePathname } from 'next/navigation';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-full flex-col md:flex-row bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Main Content Area */}
            <main className={`flex-1 overflow-hidden relative flex flex-col h-full bg-white dark:bg-background-dark ${pathname === '/projects' ? 'hidden md:flex' : 'flex'}`}>
                {children}
            </main>
        </div>
    );
}
