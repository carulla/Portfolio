'use client';

import { useParams, useRouter } from 'next/navigation';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, Play, Code2, Rocket, ChevronLeft, Database, LayoutTemplateIcon, FileJson } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedPreview } from '@/components/ui/animated-preview';
import { useTranslation } from 'react-i18next';

// Mock data for project image frame lengths.
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

// Generate frames sequentially
function getFramesForProject(slug: string): string[] {
    const folder = FOLDER_NAMES[slug];
    const count = PROJECT_FRAMECOUNTS[slug] || 0;
    if (!folder || count === 0) return [];
    return Array.from({ length: count }, (_, i) => `/web-apps-frames/${folder}/frame-${i + 1}.webp`);
}

interface Project {
    name: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
    videoUrl: string;
    tags: string[];
    liveUrl: string;
}

export default function ProjectSlugPage() {
    const params = useParams();
    const router = useRouter();
    const { t } = useTranslation();
    const slug = params.slug as string;

    const projects: Record<string, Project> = {
        'evidencia': {
            name: 'EvidencIA',
            description: t('projects.evidencia_desc'),
            icon: Database,
            iconColor: 'text-emerald-500',
            videoUrl: '/evidencia-hero-video/%d.webp',
            tags: ['Next.js', 'Typescript', 'AI', 'Google AppScript', 'Firebase'],
            liveUrl: 'https://evidencia.vercel.app'
        },
        'coupe': {
            name: 'Coupe Brasil',
            description: t('projects.coupe_desc'),
            icon: FileCode2,
            iconColor: 'text-blue-400',
            videoUrl: '/portfolio/coupe.mp4',
            tags: ['Vue.js', 'Supabase', 'Tailwind', 'Node.js'],
            liveUrl: 'https://coupebrasil.com.br'
        },
        'fluentes': {
            name: 'Fluentes.app',
            description: t('projects.fluentes_desc'),
            icon: LayoutTemplateIcon,
            iconColor: 'text-yellow-500',
            videoUrl: '/portfolio/fluentes.mp4',
            tags: ['React', 'Next.js', 'AI', 'Framer Motion'],
            liveUrl: 'https://fluentes.app'
        },
        'just-play-sports': {
            name: 'JustPlay Sports',
            description: t('projects.justplay_desc'),
            icon: FileJson,
            iconColor: 'text-orange-500',
            videoUrl: '/portfolio/justplay.mp4',
            tags: ['React', 'Node.js', 'PIX API', 'PostgreSQL'],
            liveUrl: 'https://justplay.com.br'
        },
        'running-records': {
            name: 'Running Records',
            description: t('projects.running_desc'),
            icon: FileCode2,
            iconColor: 'text-purple-400',
            videoUrl: '/portfolio/running.mp4',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
            liveUrl: 'https://running-records.vercel.app'
        }
    };

    const project = projects[slug] || {
        name: 'Project Not Found',
        description: 'This project code is still in the shadows...',
        tags: [],
        icon: FileCode2,
        iconColor: 'text-slate-400',
        videoUrl: '',
        liveUrl: '#'
    };

    const frames = getFramesForProject(slug);

    // Dynamic Code blocks for the "terminal" feel
    const lines = [
        { num: '01', code: <p><span className="text-purple-500">const</span> <span className="text-blue-500">Project</span> = {'{'}</p> },
        { num: '02', code: <p className="ml-4">name: <span className="text-emerald-500">"{project.name}"</span>,</p> },
        { num: '03', code: <p className="ml-4">description: <span className="text-amber-500">"{project.description}"</span>,</p> },
        { num: '04', code: <p className="ml-4">tech: [<span className="text-emerald-500">{project.tags.map(tag => `"${tag}"`).join(', ')}</span>],</p> },
        { num: '05', code: <p>{'};'}</p> },
    ];

    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 overflow-x-auto hide-scrollbar z-10 sticky top-0 items-center text-slate-700 dark:text-[#cccccc]">
                <button
                    onClick={() => router.push('/projects')}
                    className="md:hidden flex items-center justify-center p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 border-r border-slate-200 dark:border-slate-800 pr-3 mr-1"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider ml-1">{t('projects.back')}</span>
                </button>
                <EditorTab title={project.name} icon={project.icon} iconColor={project.iconColor} isActive={true} />
            </div>

            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col bg-white dark:bg-background-dark pb-6">
                <div className="flex flex-col pt-4 font-mono text-xs md:text-sm leading-relaxed w-full">
                    {lines.map((line, i) => (
                        <div key={i} className="flex hover:bg-primary/5 px-4 py-0.5 transition-colors">
                            <span className="w-10 text-slate-400 shrink-0 text-right pr-4 select-none opacity-50">{line.num}</span>
                            <div className="text-slate-900 dark:text-slate-100 flex-1 overflow-x-auto hide-scrollbar whitespace-nowrap">
                                {line.code}
                            </div>
                        </div>
                    ))}

                    {frames.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 mx-4 md:mx-auto md:w-[95%] max-w-7xl relative rounded-xl p-[1px] overflow-hidden group shadow-2xl shadow-primary/10"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite]"
                                style={{ background: 'conic-gradient(from 0deg, transparent 0 340deg, var(--color-primary) 360deg)' }} />
                            <div className="absolute inset-[1px] bg-slate-100 dark:bg-slate-900 rounded-xl" />

                            <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center min-h-[220px] md:min-h-[40vh] lg:min-h-[55vh] max-h-[70vh]">
                                <AnimatedPreview frames={frames} slug={slug} />
                            </div>
                        </motion.div>
                    )}

                    <div className="p-6 md:pb-12 space-y-3 md:mx-auto md:w-[90%] lg:w-[80%] max-w-6xl md:mt-8 w-full">
                        {project.liveUrl && project.liveUrl !== '#' && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-slate-900 dark:bg-slate-800 px-8 py-4 md:py-6 font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_8px_rgba(19,91,236,0.3)] md:text-lg"
                            >
                                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                                    <div className="relative h-full w-8 bg-white/20" />
                                </div>

                                <div className="relative flex items-center gap-3 z-10">
                                    <Rocket className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
                                    <span>{t('projects.launch')}</span>
                                </div>

                                <div className="absolute inset-0 rounded-xl border border-white/10" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
