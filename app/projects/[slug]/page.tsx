'use client';

import { useParams } from 'next/navigation';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, Play, Code2, Rocket } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedPreview } from '@/components/ui/animated-preview';

// Mock data for project image frame lengths. We use the manually extracted list
// of valid paths so Next.js static export does not need fs on the client side.
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

// Mappings manually extracted from directory to prevent fs import entirely on the client
const PROJECT_FRAMES: Record<string, string[]> = {
    'coupe': [
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.01.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.09.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.16.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.22.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.29.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.38.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.18.57.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.19.06.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.19.17.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.19.42.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.19.47.png",
        "/web-apps-frames/coupe/Captura de Tela 2026-02-25 às 08.20.03.png",
    ],
    'fluentes': [
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.20.46.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.20.53.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.20.59.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.21.05.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.21.12.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.21.18.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.21.30.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.21.51.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.22.05.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.23.11.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.23.27.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.23.34.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.23.46.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.23.56.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.24.09.png",
        "/web-apps-frames/fluentes/Captura de Tela 2026-02-25 às 08.24.23.png",
    ],
    'just-play-sports': [
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.25.35.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.25.44.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.25.51.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.25.54.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.25.59.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.26.04.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.26.07.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.26.16.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.26.30.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.26.45.png",
        "/web-apps-frames/justplay/Captura de Tela 2026-02-25 às 08.27.05.png",
    ],
    'evidencia': [
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.27.37.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.27.44.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.27.51.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.27.58.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.28.21.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.28.25.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.28.31.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.28.49.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.28.52.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.28.55.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.29.02.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.29.12.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.29.33.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.29.57.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.30.05.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.30.17.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.30.31.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.30.43.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.31.05.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.31.14.png",
        "/web-apps-frames/evidencia/Captura de Tela 2026-02-25 às 08.31.32.png",
    ],
    'running-records': [
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.13.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.19.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.25.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.31.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.39.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.45.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.51.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.32.58.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.33.11.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.33.28.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.33.37.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.34.00.png",
        "/web-apps-frames/runningrecords/Captura de Tela 2026-02-25 às 08.34.15.png",
    ]
};

// Generate frames safely using our extracted object avoiding fs entirely
function getFramesForProject(slug: string): string[] {
    return PROJECT_FRAMES[slug] || [];
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
    const slug = params.slug as string;

    const project = PROJECT_DATA[slug] || {
        name: `${slug}.js`,
        lang: 'javascript',
        lines: [
            { num: '01', code: <p className="text-slate-500 italic">// Project content not found...</p> }
        ],
        framesFolderName: null
    };

    const frames = project.framesFolderName ? getFramesForProject(project.framesFolderName) : [];

    return (
        <div className="flex flex-col h-full w-full">
            {/* Target File Tab */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 overflow-x-auto hide-scrollbar">
                <EditorTab title={project.name} icon={FileCode2} iconColor="text-blue-400" isActive={true} />
            </div>

            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col bg-white dark:bg-background-dark pb-24">

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
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 bg-gradient-to-t from-white dark:from-background-dark via-white dark:via-background-dark to-transparent pt-12 md:max-w-2xl mx-auto md:relative md:bg-none md:mt-12">
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
