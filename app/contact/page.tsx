'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, FileJson, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
    id: string;
    sender: 'ai' | 'user';
    text: string;
};

// Knowledge base about Gabriel Carulla for the AI to use
const GABRIEL_KNOWLEDGE = {
    name: "Gabriel Carulla",
    role: "Full Stack Developer & AI Analyst",
    experience: "6+ years in tech, 8+ years as an English Teacher",
    specialties: ["Vibe Coding", "Low-Code / No-Code", "AI Agent Systems", "Full Stack Development"],
    techStack: ["Next.js", "Vue.js", "TypeScript", "TailwindCSS", "Supabase", "N8N", "Framer Motion"],
    projects: {
        "Coupe": "Complete SaaS for Salon and Barbershop management and communication. Currently adopted by active businesses.",
        "Fluentes": "Language Learning Web App with dozens of active monthly users, focusing on fluid, practical English acquisition.",
        "JustPlay Sports": "Web application tailored for a sports-in-school company, streamlining operations and scheduling.",
        "EvidencIA": "Evidence Registering and Classroom Managing system designed specifically to reduce teacher workload.",
        "Running Records": "EdTech application for Kids Literacy Teaching, allowing educators to track reading fluency progress."
    },
    background: "Previously an English Teacher for 8 years, giving him an edge in top-tier communication, empathy for the end-user, and breaking down complex problems.",
    approach: "Specializes in turning complex problems into elegant, scalable solutions using modern web technologies and AI-powered workflows."
};

function getAIResponse(userText: string, step: number, formData: { name: string; phone: string; message: string }): string {
    const lower = userText.toLowerCase();

    // If in free-chat mode (step >= 3 means done, but we handle general questions in steps 0-2 too)
    // Check for questions about Gabriel regardless of step
    if (lower.includes('who is gabriel') || lower.includes('about gabriel') || lower.includes('tell me about')) {
        return `Gabriel Carulla is a ${GABRIEL_KNOWLEDGE.role} with ${GABRIEL_KNOWLEDGE.experience}. ${GABRIEL_KNOWLEDGE.approach} He specializes in ${GABRIEL_KNOWLEDGE.specialties.join(', ')}.`;
    }
    if (lower.includes('project') || lower.includes('work') || lower.includes('portfolio')) {
        const projectList = Object.entries(GABRIEL_KNOWLEDGE.projects)
            .map(([name, desc]) => `• ${name}: ${desc}`)
            .join('\n');
        return `Here are Gabriel's projects:\n${projectList}`;
    }
    if (lower.includes('stack') || lower.includes('tech') || lower.includes('tools') || lower.includes('language')) {
        return `Gabriel's tech stack includes: ${GABRIEL_KNOWLEDGE.techStack.join(', ')}. He specializes in ${GABRIEL_KNOWLEDGE.specialties.join(', ')}.`;
    }
    if (lower.includes('experience') || lower.includes('background') || lower.includes('history')) {
        return `${GABRIEL_KNOWLEDGE.background} He now has ${GABRIEL_KNOWLEDGE.experience}, specializing in ${GABRIEL_KNOWLEDGE.specialties.slice(0, 2).join(' and ')}.`;
    }
    if (lower.includes('contact') || lower.includes('hire') || lower.includes('reach') || lower.includes('email')) {
        return "You're in the right place! Just tell me your name and I'll help you send Gabriel a message directly. 🚀";
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('oi') || lower.includes('olá')) {
        return `Hey there! 👋 I'm Gabriel's AI assistant. I know all about his work and projects. Feel free to ask me anything, or I can help you send him a message!`;
    }

    return '';
}

export default function ContactPage() {
    // 0: Ask Name, 1: Ask Phone, 2: Ask Message, 3: Done
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial-1', sender: 'ai', text: "Hi there! I'm Gabriel's AI assistant. 👋" },
        { id: 'initial-2', sender: 'ai', text: `I know all about Gabriel — he's a ${GABRIEL_KNOWLEDGE.role} with ${GABRIEL_KNOWLEDGE.experience}. Ask me anything about his projects or skills, or I can take a message for him! What's your name?` }
    ]);
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Form data accumulation
    const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputVal.trim() || isTyping) return;
        if (step >= 3) return;

        const userText = inputVal.trim();
        const newMessages: Message[] = [...messages, { id: Date.now().toString(), sender: 'user' as const, text: userText }];
        setMessages(newMessages);
        setInputVal('');
        setIsTyping(true);

        setTimeout(() => {
            // Check for knowledge-based response first
            const knowledgeResponse = getAIResponse(userText, step, formData);

            let aiResponse = '';

            if (knowledgeResponse) {
                // It's a question about Gabriel — answer it, stay on same step
                aiResponse = knowledgeResponse;
                if (step === 0) {
                    aiResponse += "\n\nBy the way, what's your name? I'd love to help you reach out to Gabriel.";
                }
            } else if (step === 0) {
                setFormData(prev => ({ ...prev, name: userText }));
                aiResponse = `Nice to meet you, ${userText}! Could I get your phone number or email so we can reach you back?`;
                setStep(1);
            } else if (step === 1) {
                setFormData(prev => ({ ...prev, phone: userText }));
                aiResponse = "Perfect. What message would you like me to pass along to Gabriel?";
                setStep(2);
            } else if (step === 2) {
                setFormData(prev => ({ ...prev, message: userText }));
                aiResponse = "Thanks! I've encrypted your message and dispatched it. Gabriel will get back to you soon. Have a great day! ✨";
                setStep(3);
                console.log('Sending payload:', { ...formData, message: userText });
            }

            setMessages([...newMessages, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse }]);
            setIsTyping(false);

            if (step < 2 && !knowledgeResponse) {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }, 800 + Math.random() * 600);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-background-dark overflow-hidden">
            {/* Editor Tabs */}
            <div className="flex border-b border-primary/20 bg-white dark:bg-slate-950/50 overflow-x-auto hide-scrollbar z-10 flex-shrink-0">
                <EditorTab title="index.js" icon={FileCode2} iconColor="text-yellow-500" isActive={false} />
                <EditorTab title="projects.py" icon={FileJson} iconColor="text-blue-400" isActive={false} />
                <EditorTab title="contact.ai" icon={MessageSquare} iconColor="text-emerald-500" isActive={true} />
            </div>

            {/* Chat Area — takes up all remaining space */}
            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col pt-4 px-4 md:px-8">
                <div className="max-w-2xl w-full mx-auto flex flex-col gap-4 pb-4">

                    {/* Timestamp Header */}
                    <div className="text-center text-xs text-slate-400 font-medium py-4">
                        Secure Connection Established • {new Date().toLocaleDateString()}
                    </div>

                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-3 w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* AI Avatar */}
                                {msg.sender === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-primary flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-primary/20">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div className={`
                                    max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed whitespace-pre-line
                                    ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-sm shadow-md shadow-primary/10'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700'
                                    }
                                `}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3 w-full justify-start"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-primary flex items-center justify-center shrink-0 mt-1">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 border border-slate-100 dark:border-slate-700">
                                <motion.div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                                <motion.div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                                <motion.div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-500" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Dock — fixed at bottom of flex, not absolute */}
            <div className="flex-shrink-0 bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3">
                <div className="max-w-2xl w-full mx-auto relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${step >= 3 ? 'hidden' : 'block'}`}></div>

                    <div className={`relative flex items-center bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 transition-all ${step >= 3 ? 'opacity-50 pointer-events-none' : ''}`}>

                        <div className="pl-4 pr-2 flex items-center justify-center shrink-0">
                            {step === 0 ? <User className="w-5 h-5 text-slate-400" /> : <MessageSquare className="w-5 h-5 text-slate-400" />}
                        </div>

                        <input
                            ref={inputRef}
                            autoFocus
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isTyping || step >= 3}
                            placeholder={
                                step === 0 ? "Type your name or ask me about Gabriel..." :
                                    step === 1 ? "Enter phone or email..." :
                                        step === 2 ? "Leave a message..." :
                                            "Session closed."
                            }
                            className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white px-2 py-3.5 focus:ring-0 placeholder:text-slate-400 text-sm md:text-base"
                        />

                        <button
                            onClick={handleSend}
                            disabled={!inputVal.trim() || isTyping || step >= 3}
                            className={`p-3 rounded-xl flex items-center justify-center transition-all ${inputVal.trim() && !isTyping && step < 3
                                ? 'bg-primary text-white shadow-md hover:bg-primary/90'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* AI Footer note */}
                <div className="text-center mt-2 text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium tracking-wide">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Powered by Vibe Engine
                </div>
            </div>

            {/* Terminal Footer Status Bar */}
            <footer className="flex-shrink-0 h-[45px] border-t border-slate-200 dark:border-primary/20 bg-slate-100 dark:bg-slate-950 p-2 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-primary">
                        <span className="material-symbols-outlined text-xs">account_tree</span>
                        <span>main*</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-emerald-500">check_circle</span>
                        <span className="text-emerald-500/80">AI READY</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <span>UTF-8</span>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">sync</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
