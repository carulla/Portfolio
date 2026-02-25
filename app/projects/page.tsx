import { EditorTab } from '@/components/ui/editor-tab';
import { FileJson } from 'lucide-react';

export default function ProjectsDefaultPage() {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Editor Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 overflow-x-auto hide-scrollbar">
                <EditorTab title="README.md" icon={FileJson} iconColor="text-purple-400" isActive={true} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar markdown-body">
                <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-slate-100"># Gabriel Carulla Projects Workspace</h1>

                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    Welcome to my digital workspace. Navigate through the directory tree on the left to explore the various architectures, full-stack applications, and specialized tools I've built.
                </p>

                <h2 className="text-xl font-bold text-primary mt-8 mb-4">## Overview</h2>
                <ul className="space-y-2 mb-6 text-slate-600 dark:text-slate-300">
                    <li className="flex gap-2">
                        <span className="text-primary font-bold">{'>'}</span> Over 6 years of experience turning complex problems into elegant solutions.
                    </li>
                    <li className="flex gap-2">
                        <span className="text-primary font-bold">{'>'}</span> Expertise in Next.js, Vue.js, TailwindCSS, and scaling backend services via Supabase.
                    </li>
                    <li className="flex gap-2">
                        <span className="text-primary font-bold">{'>'}</span> Integrated AI agent systems, N8N workflows, and Vibe Coding architecture.
                    </li>
                </ul>

                <h2 className="text-xl font-bold text-primary mt-8 mb-4">## Instructions</h2>
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border border-slate-800">
                    <span className="text-terminal-green">guest@carulla</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-primary">~</span>
                    <span className="text-slate-100">$ </span>
                    <span className="text-slate-300">cat README.md</span>
                    <br /><br />
                    <span className="text-terminal-cyan">Select a file from the Explorer to view the project source code and live demo.</span>
                </div>
            </div>
        </div>
    );
}
