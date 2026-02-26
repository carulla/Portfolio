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
    return Array.from({ length: count }, (_, i) => `/web-apps-frames/${folder}/frame-${i + 1}.webp`);
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
        liveUrl: 'https://coupebrasil.cloud',
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

                    {/* Animated Preview Component with Magic Border Beam */}
                    {frames.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 mx-4 md:mx-auto md:w-[95%] max-w-7xl relative rounded-xl p-[1px] overflow-hidden group shadow-2xl shadow-primary/10"
                        >
                            {/* Magic UI Border Beam implementation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]"
                                style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, var(--color-primary) 360deg)' }} />
                            <div className="absolute inset-[1px] bg-slate-100 dark:bg-slate-900 rounded-xl" />

                            {/* Actual Preview Content */}
                            <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center min-h-[220px] md:min-h-[40vh] lg:min-h-[55vh] max-h-[70vh]">
                                <AnimatedPreview frames={frames} slug={slug} />
                            </div>
                        </motion.div>
                    )}

                    {/* Magic UI Shimmer Action Button */}
                    <div className="p-6 md:pb-12 space-y-3 md:mx-auto md:w-[90%] lg:w-[80%] max-w-6xl md:mt-8 w-full">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900 dark:bg-slate-800 px-8 py-4 md:py-6 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_8px_rgba(19,91,236,0.3)] md:text-lg"
                            >
                                {/* Shimmer sweep effect */}
                                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                                    <div className="relative h-full w-8 bg-white/20" />
                                </div>

                                {/* Inner content */}
                                <div className="relative flex items-center gap-3 z-10">
                                    <Rocket className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
                                    <span>Launch Live Experience</span>
                                </div>

                                {/* Subtle inner border */}
                                <div className="absolute inset-0 rounded-xl border border-white/10" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
