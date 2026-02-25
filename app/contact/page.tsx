'use client';

import { useState } from 'react';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { Terminal, ChevronRight, Edit3 } from 'lucide-react';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, FileJson, Code2 } from 'lucide-react';

export default function ContactPage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [inputVal, setInputVal] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputVal.trim()) {
            if (step === 0) setFormData({ ...formData, name: inputVal });
            if (step === 1) setFormData({ ...formData, email: inputVal });
            if (step === 2) setFormData({ ...formData, message: inputVal });

            setInputVal('');
            setStep(prev => Math.min(prev + 1, 3));
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Editor Tabs */}
            <div className="flex border-b border-primary/20 bg-slate-900/50 dark:bg-slate-950/50 overflow-x-auto hide-scrollbar z-10 sticky top-0">
                <EditorTab title="index.js" icon={FileCode2} iconColor="text-yellow-500" isActive={false} />
                <EditorTab title="projects.py" icon={FileJson} iconColor="text-blue-400" isActive={false} />
                <EditorTab title="contact.sh" icon={Code2} isActive={true} />
            </div>

            <div className="flex-1 p-4 md:p-8 font-mono text-sm sm:text-base overflow-y-auto custom-scrollbar flex flex-col max-w-3xl mx-auto w-full">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-terminal-green font-bold">guest@carulla:~$</span>
                    <span className="text-slate-900 dark:text-white">./contact.sh</span>
                </div>

                <div className="space-y-6 flex-1">
                    {/* Step 1: Name */}
                    <div className={`flex flex-col gap-2 pl-4 py-2 border-l-2 ${step >= 0 ? 'border-primary' : 'border-transparent'} ${step === 0 ? 'bg-primary/5 rounded-r-lg' : ''}`}>
                        <div className="flex items-center gap-2">
                            <ChevronRight className={`w-5 h-5 ${step === 0 ? 'text-primary' : 'text-slate-400'}`} />
                            <p className={`font-bold ${step === 0 ? 'text-primary' : 'text-slate-400'}`}>Enter your name:</p>
                        </div>
                        <div className="flex items-center pl-7">
                            {step > 0 ? (
                                <p className="text-slate-900 dark:text-white">{formData.name}</p>
                            ) : (
                                <div className="flex items-center w-full">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={inputVal}
                                        onChange={(e) => setInputVal(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full p-0 flex-1 ring-0 focus:ring-0"
                                    />
                                    <span className="ml-1 w-2 h-5 bg-primary animate-pulse shrink-0"></span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step 2: Email */}
                    {step >= 1 && (
                        <div className={`flex flex-col gap-2 pl-4 py-2 border-l-2 ${step >= 1 ? 'border-primary' : 'border-transparent'} ${step === 1 ? 'bg-primary/5 rounded-r-lg' : ''}`}>
                            <div className="flex items-center gap-2">
                                <ChevronRight className={`w-5 h-5 ${step === 1 ? 'text-primary' : 'text-slate-400'}`} />
                                <p className={`font-bold ${step === 1 ? 'text-primary' : 'text-slate-400'}`}>Enter your email:</p>
                            </div>
                            <div className="flex items-center pl-7">
                                {step > 1 ? (
                                    <p className="text-slate-900 dark:text-white">{formData.email}</p>
                                ) : (
                                    <div className="flex items-center w-full">
                                        <input
                                            autoFocus
                                            type="email"
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full p-0 flex-1 ring-0 focus:ring-0"
                                        />
                                        <span className="ml-1 w-2 h-5 bg-primary animate-pulse shrink-0"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Message */}
                    {step >= 2 && (
                        <div className={`flex flex-col gap-2 pl-4 py-2 border-l-2 ${step >= 2 ? 'border-primary' : 'border-transparent'} ${step === 2 ? 'bg-primary/5 rounded-r-lg' : ''}`}>
                            <div className="flex items-center gap-2">
                                <Edit3 className={`w-4 h-4 ${step === 2 ? 'text-primary' : 'text-slate-400'}`} />
                                <p className={`font-bold ${step === 2 ? 'text-primary' : 'text-slate-400'}`}>Type your message:</p>
                            </div>
                            <div className="flex items-center pl-7">
                                {step > 2 ? (
                                    <p className="text-slate-900 dark:text-white">{formData.message}</p>
                                ) : (
                                    <div className="flex items-center w-full">
                                        <input
                                            autoFocus
                                            type="text"
                                            value={inputVal}
                                            onChange={(e) => setInputVal(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            className="bg-transparent border-none outline-none text-slate-900 dark:text-white w-full p-0 flex-1 ring-0 focus:ring-0"
                                        />
                                        <span className="ml-1 w-2 h-5 bg-primary animate-pulse shrink-0"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit Action */}
                {step >= 3 && (
                    <div className="mt-12 flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
                        <button
                            onClick={() => {
                                alert('Message sent successfully! (Mock API call)');
                                setStep(0);
                                setFormData({ name: '', email: '', message: '' });
                            }}
                            className="group relative w-full md:w-auto overflow-hidden rounded-xl bg-primary px-12 py-4 text-white transition-all hover:ring-4 hover:ring-primary/30 active:scale-95 shadow-[0_0_20px_rgba(19,91,236,0.4)]"
                        >
                            <div className="flex items-center justify-center gap-3">
                                <span className="text-sm font-black tracking-[0.2em] uppercase">Execute Submit</span>
                                <Terminal className="w-5 h-5 font-bold" />
                            </div>
                        </button>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
                            Press enter or click to send payload
                        </p>
                    </div>
                )}
            </div>

            {/* Terminal Footer Status Bar */}
            <footer className="mt-auto border-t border-primary/20 bg-slate-900 dark:bg-slate-950 p-2 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-400">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-primary">
                        <span className="material-symbols-outlined text-xs">account_tree</span>
                        <span>main*</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-green-500">check_circle</span>
                        <span className="text-green-500/80">STATUS: READY</span>
                    </div>
                </div>
                <div className="flex items-center gap-3 hidden md:flex">
                    <span>UTF-8</span>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">sync</span>
                        <span>V.4.0.0</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
