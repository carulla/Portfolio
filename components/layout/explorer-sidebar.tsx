'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FileExplorerItem } from '@/components/ui/file-explorer-item';
import { Folder, Database, FileJson, LayoutTemplateIcon, FileCode2 } from 'lucide-react';

export function ExplorerSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    // Default open folders
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
        'Portfolio': true,
        'Web-Apps': true,
        'EdTech-Projects': true,
    });

    const toggleFolder = (folder: string) => {
        setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
    };

    return (
        <aside className={`w-full md:w-64 flex-col border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#192233] flex-shrink-0 h-full overflow-y-auto ${pathname === '/projects' ? 'flex' : 'hidden md:flex'}`}>
            <div className="px-4 py-3 sticky top-0 bg-slate-50 dark:bg-[#192233] z-10 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Explorer</h2>
            </div>

            <div className="py-2 flex flex-col gap-[1px]">
                <FileExplorerItem
                    name="Portfolio"
                    type="folder"
                    icon={Folder}
                    isOpen={openFolders['Portfolio']}
                    onClick={() => toggleFolder('Portfolio')}
                    depth={0}
                >
                    <FileExplorerItem
                        name="Web-Apps"
                        type="folder"
                        icon={Folder}
                        isOpen={openFolders['Web-Apps']}
                        onClick={() => toggleFolder('Web-Apps')}
                        depth={1}
                    >
                        <FileExplorerItem
                            name="Coupe.SaaS"
                            type="file"
                            icon={Database}
                            iconColor="text-blue-400"
                            isActive={pathname === '/projects/coupe'}
                            onClick={() => router.push('/projects/coupe')}
                            depth={2}
                        />
                        <FileExplorerItem
                            name="Fluentes.app"
                            type="file"
                            icon={LayoutTemplateIcon}
                            iconColor="text-green-500"
                            isActive={pathname === '/projects/fluentes'}
                            onClick={() => router.push('/projects/fluentes')}
                            depth={2}
                        />
                        <FileExplorerItem
                            name="JustPlay.app"
                            type="file"
                            icon={FileCode2}
                            iconColor="text-orange-500"
                            isActive={pathname === '/projects/just-play-sports'}
                            onClick={() => router.push('/projects/just-play-sports')}
                            depth={2}
                        />
                    </FileExplorerItem>

                    <FileExplorerItem
                        name="EdTech-Projects"
                        type="folder"
                        icon={Folder}
                        iconColor="text-cyan-500"
                        isOpen={openFolders['EdTech-Projects']}
                        onClick={() => toggleFolder('EdTech-Projects')}
                        depth={1}
                    >
                        <FileExplorerItem
                            name="EvidencIA.ts"
                            type="file"
                            icon={FileCode2}
                            iconColor="text-purple-400"
                            isActive={pathname === '/projects/evidencia'}
                            onClick={() => router.push('/projects/evidencia')}
                            depth={2}
                        />
                        <FileExplorerItem
                            name="RunningRecords.ts"
                            type="file"
                            icon={FileCode2}
                            iconColor="text-emerald-400"
                            isActive={pathname === '/projects/running-records'}
                            onClick={() => router.push('/projects/running-records')}
                            depth={2}
                        />
                    </FileExplorerItem>

                    <FileExplorerItem
                        name="README.md"
                        type="file"
                        icon={FileJson}
                        iconColor="text-purple-400"
                        isActive={pathname === '/projects'}
                        onClick={() => router.push('/projects')}
                        depth={1}
                    />
                </FileExplorerItem>
            </div>
        </aside>
    );
}
