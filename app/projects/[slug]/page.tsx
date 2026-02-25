'use client';

import { useParams, useRouter } from 'next/navigation';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, Play, Code2, Rocket, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedPreview } from '@/components/ui/animated-preview';

// Mock data for project image frame lengths. We safely generate simple sequential paths.
const PROJECT_FRAMECOUNTS: Record<string, number> = {
    'coupe': 12,
    'fluentes': 16,
    'just-play-sports': 11,
    'evidencia': 21,
    'running-records': 13
};

// Map original keys to folder names
const FOLDER_NAMES: Record<string, string> = {
    'coupe': 'coupe',
    'fluentes': 'fluentes',
    'just-play-sports': 'justplay',
    'evidencia': 'evidencia',
    'running-records': 'runningrecords'
};

// Generate frames sequentially without fs imports or overly long hardcoded paths
function getFramesForProject(slug: string): string[] {
    const folder = FOLDER_NAMES[slug];
    const count = PROJECT_FRAMECOUNTS[slug] || 0;

    if (!folder || count === 0) return [];

    // Generates an array of simple paths like: /web-apps-frames/coupe/frame-1.png
    return Array.from({ length: count }, (_, i) => `/web-apps-frames/${folder}/frame-${i + 1}.png`);
}

// Mock data for projects
const PROJECT_DATA: Record<string, any> = {
    'coupe': {
        name: 'Coupe.SaaS',
        lang: 'typescript',
        lines: [
            { num: '01', code: <p><span className="text-purple-500">const</span> <span className="text-blue-500">Project</span> = {'{'}</p> },
            { num: '02', code: <p className="ml-4">name: <span className="text-emerald-500">"Coupe"</span>,</p> },
            { num: '03', code: <p className="ml-4">description: <span className="text-amber-500">"Complete SaaS for Salon and Barbershop management and communication. Currently adopted by active businesses."</span>,</p> },
            { num: '04', code: <p className="ml-4">role: <span className="text-amber-500">"Full Stack / Architecture"</span>,</p> },
            { num: '05', code: <p>{'};'}</p> },
        ],
        liveUrl: 'https://app.coupebrasil.cloud',
        framesFolderName: 'coupe'
    },
    'fluentes': {
        name: 'Fluentes.app',
        lang: 'typescript',
        lines: [
            { num: '01', code: <p><span className="text-purple-500">const</span> <span className="text-blue-500">Project</span> = {'{'}</p> },
            { num: '02', code: <p className="ml-4">name: <span className="text-emerald-500">"Fluentes Para Sempre"</span>,</p> },
            { num: '03', code: <p className="ml-4">description: <span className="text-amber-500">"Language Learning Web App with dozens of active monthly users, focusing on fluid, practical English acquisition."</span>,</p> },
            { num: '04', code: <p className="ml-4">role: <span className="text-amber-500">"Full Stack / Creator"</span>,</p> },
            { num: '05', code: <p>{'};'}</p> },
        ],
        liveUrl: 'https://app.fluentesparasempre.com.br',
        framesFolderName: 'fluentes'
    },
    'just-play-sports': {
        name: 'JustPlay.app',
        lang: 'typescript',
        lines: [
            { num: '01', code: <p><span className="text-purple-500">const</span> <span className="text-blue-500">Project</span> = {'{'}</p> },
            { num: '02', code: <p className="ml-4">name: <span className="text-emerald-500">"Just Play Sports"</span>,</p> },
            { num: '03', code: <p className="ml-4">description: <span className="text-amber-500">"Web application tailored for a sports-in-school company, streamlining operations and scheduling."</span>,</p> },
            { num: '04', code: <p className="ml-4">role: <span className="text-amber-500">"Frontend & Backend"</span>,</p> },
            { num: '05', code: <p>{'};'}</p> },
        ],
        liveUrl: 'https://justplaysports.com.br',
        framesFolderName: 'justplay'
    },
    'evidencia': {
        name: 'EvidencIA.ts',
        lang: 'typescript',
        lines: [
            { num: '01', code: <p><span className="text-purple-500">const</span> <span className="text-blue-500">Project</span> = {'{'}</p> },
            { num: '02', code: <p className="ml-4">name: <span className="text-emerald-500">"EvidencIA"</span>,</p> },
            { num: '03', code: <p className="ml-4">description: <span className="text-amber-500">"Evidence Registering and Classroom Managing system designed specifically to reduce teacher workload."</span>,</p> },
            { num: '04', code: <p className="ml-4">role: <span className="text-amber-500">"Full Stack / Vibe Coding"</span>,</p> },
            { num: '05', code: <p>{'};'}</p> },
        ],
        liveUrl: 'https://evidencia-evidencia.74xbo3.easypanel.host/',
        framesFolderName: 'evidencia'
    },
    'running-records': {
        name: 'RunningRecords.ts',
        lang: 'typescript',
        lines: [
            { num: '01', code: <p><span className="text-purple-500">const</span> <span className="text-blue-500">Project</span> = {'{'}</p> },
            { num: '02', code: <p className="ml-4">name: <span className="text-emerald-500">"Running Records"</span>,</p> },
            { num: '03', code: <p className="ml-4">description: <span className="text-amber-500">"EdTech application for Kids Literacy Teaching, allowing educators to track reading fluency progress."</span>,</p> },
            { num: '04', code: <p className="ml-4">role: <span className="text-amber-500">"Full Stack / EdTech"</span>,</p> },
            { num: '05', code: <p>{'};'}</p> },
        ],
        liveUrl: 'https://education-runningrecords.jezior.easypanel.host/',
        framesFolderName: 'runningrecords'
    }
};

export default function ProjectSlugPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const project = PROJECT_DATA[slug] || {
        name: `${slug}.js`,
        lang: 'javascript',
        lines: [
            { num: '01', code: <p className="text-slate-500 italic">// Project content not found...</p> }
        ],
        framesFolderName: null
    };

    const frames = getFramesForProject(slug);

    return (
        <div className="flex flex-col h-full w-full">
            {/* Target File Tab */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 overflow-x-auto hide-scrollbar z-10 sticky top-0 items-center">
                <button
                    onClick={() => router.push('/projects')}
                    className="md:hidden flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 border-r border-slate-200 dark:border-slate-800 pr-3 mr-1"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider ml-1">Back</span>
                </button>
                <EditorTab title={project.name} icon={FileCode2} iconColor="text-blue-400" isActive={true} />
            </div>

            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col bg-white dark:bg-background-dark pb-6">

                {/* Code Content */}
                <div className="flex flex-col pt-4 font-mono text-sm leading-relaxed w-full">
                    {project.lines.map((line: any, i: number) => (
                        <div key={i} className="flex hover:bg-primary/5 px-4 py-0.5 transition-colors">
                            <span className="w-10 text-slate-400 shrink-0 text-right pr-4 select-none opacity-50">{line.num}</span>
                            <div className="text-slate-900 dark:text-slate-100 flex-1 overflow-x-auto hide-scrollbar whitespace-nowrap">
                                {line.code}
                            </div>
                        </div>
                    ))}

                    {/* Animated Preview Component */}
                    {frames.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 mx-6 md:mx-12 relative group max-w-2xl"
                        >
                            <AnimatedPreview frames={frames} slug={slug} />
                        </motion.div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="p-6 space-y-3 md:max-w-2xl mx-auto md:mt-12">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                            <Rocket className="w-5 h-5" />
                            View Live Site
                        </a>
                    )}
                    <button className="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
                        <Code2 className="w-5 h-5" />
                        View Repository
                    </button>
                </div>
            </div>
        </div>
    );
}
