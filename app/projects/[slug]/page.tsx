'use client';

import { useParams } from 'next/navigation';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, Play, Code2, Rocket } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
        liveUrl: 'https://app.coupebrasil.cloud'
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
        liveUrl: 'https://app.fluentesparasempre.com.br'
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
        liveUrl: 'https://justplaysports.com.br'
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
        liveUrl: 'https://evidencia-evidencia.74xbo3.easypanel.host/'
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
        liveUrl: 'https://education-runningrecords.jezior.easypanel.host/'
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
        ]
    };

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

                    {/* Media Preview (Mock) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 mx-6 md:mx-12 relative group max-w-2xl"
                    >
                        <div className="absolute -top-3 left-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter z-10 shadow-md">
                            Media Preview
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
                            <div className="w-full aspect-[16/9] bg-slate-900 flex items-center justify-center relative">
                                {/* Standard placeholder pattern to look like a project preview */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-background-dark grid-bg opacity-50" />
                                <Play className="w-16 h-16 text-white/50 z-10 group-hover:text-primary transition-colors cursor-pointer" />
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900/90 backdrop-blur-sm flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
                                <div>
                                    <p className="font-bold text-sm">{slug}-preview.png</p>
                                    <p className="text-xs text-slate-500">1.2 MB — 1920x1080</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
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
