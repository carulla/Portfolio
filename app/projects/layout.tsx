'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FileExplorerItem } from '@/components/ui/file-explorer-item';
import { Folder, Database, FileJson, LayoutTemplateIcon, FileCode2 } from 'lucide-react';

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    // Example folders and their open state
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
        'Web-Apps': true,
        'EdTech-Projects': false,
    });

    const toggleFolder = (folder: string) => {
        setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
    };

    return (
        <div className="flex h-full w-full flex-col md:flex-row bg-background-light dark:bg-background-dark overflow-hidden">
            {/* File Explorer Sidebar */}
            <aside className={`w-full md:w-64 flex flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#192233] flex-shrink-0 h-full overflow-y-auto ${pathname === '/projects' ? 'flex' : 'hidden md:flex'}`}>
                <div className="px-4 py-3 sticky top-0 bg-slate-50 dark:bg-[#192233] z-10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Explorer</h2>
                </div>

                <div className="py-2 flex flex-col gap-1">
                    <FileExplorerItem
                        name="Web-Apps"
                        type="folder"
                        icon={Folder}
                        isOpen={openFolders['Web-Apps']}
                        onClick={() => toggleFolder('Web-Apps')}
                    >
                        <FileExplorerItem
                            name="Coupe.SaaS"
                            subtitle="Full Stack"
                            type="file"
                            icon={Database}
                            iconColor="text-blue-400"
                            isActive={pathname === '/projects/coupe'}
                            onClick={() => router.push('/projects/coupe')}
                        />
                        <FileExplorerItem
                            name="Fluentes.app"
                            subtitle="Full Stack"
                            type="file"
                            icon={LayoutTemplateIcon}
                            iconColor="text-green-500"
                            isActive={pathname === '/projects/fluentes'}
                            onClick={() => router.push('/projects/fluentes')}
                        />
                        <FileExplorerItem
                            name="JustPlay.app"
                            subtitle="Frontend/Backend"
                            type="file"
                            icon={FileCode2}
                            iconColor="text-orange-500"
                            isActive={pathname === '/projects/just-play-sports'}
                            onClick={() => router.push('/projects/just-play-sports')}
                        />
                    </FileExplorerItem>

                    <FileExplorerItem
                        name="EdTech-Projects"
                        type="folder"
                        icon={Folder}
                        iconColor="text-cyan-500"
                        isOpen={openFolders['EdTech-Projects']}
                        onClick={() => toggleFolder('EdTech-Projects')}
                    >
                        <FileExplorerItem
                            name="EvidencIA.ts"
                            subtitle="Vibe Coding"
                            type="file"
                            icon={FileCode2}
                            iconColor="text-purple-400"
                            isActive={pathname === '/projects/evidencia'}
                            onClick={() => router.push('/projects/evidencia')}
                        />
                        <FileExplorerItem
                            name="RunningRecords.ts"
                            subtitle="Full Stack"
                            type="file"
                            icon={FileCode2}
                            iconColor="text-emerald-400"
                            isActive={pathname === '/projects/running-records'}
                            onClick={() => router.push('/projects/running-records')}
                        />
                    </FileExplorerItem>

                    <FileExplorerItem
                        name="README.md"
                        subtitle="Markdown"
                        type="file"
                        icon={FileJson}
                        iconColor="text-purple-400"
                        isActive={pathname === '/projects'}
                        onClick={() => router.push('/projects')}
                    />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-1 overflow-hidden relative flex flex-col h-full bg-white dark:bg-background-dark ${pathname === '/projects' ? 'hidden md:flex' : 'flex'}`}>
                {children}
            </main>
        </div>
    );
}
