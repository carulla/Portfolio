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

export default function ContactPage() {
    // 0: Ask Name, 1: Ask Phone, 2: Ask Message, 3: Done
    const [step, setStep] = useState(0);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial-1', sender: 'ai', text: "Hi there! I'm Gabriel's AI assistant. 👋" },
        { id: 'initial-2', sender: 'ai', text: "I can take a message and securely forward it to his terminal. Before we start, what's your name?" }
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
        if (!inputVal.trim() || isTyping || step >= 3) return;

        const userText = inputVal.trim();
        const newMessages = [...messages, { id: Date.now().toString(), sender: 'user' as const, text: userText }];
        setMessages(newMessages);
        setInputVal('');
        setIsTyping(true);

        // Process step transition with simulated AI delay
        setTimeout(() => {
            let aiResponse = '';

            if (step === 0) {
                setFormData(prev => ({ ...prev, name: userText }));
                aiResponse = `Nice to meet you, ${userText}! Could I get your phone number or email so we can reach you back?`;
                setStep(1);
            } else if (step === 1) {
                setFormData(prev => ({ ...prev, phone: userText }));
                aiResponse = "Perfect. What message would you like me to pass along?";
                setStep(2);
            } else if (step === 2) {
                setFormData(prev => ({ ...prev, message: userText }));
                aiResponse = "Thanks! I've encrypted your message and dispatched it. Gabriel will get back to you soon. Have a great day! ✨";
                setStep(3);

                // In a real app, you would send the `formData` payload to your API here.
                console.log('Sending payload:', { ...formData, message: userText });
            }

            setMessages([...newMessages, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse }]);
            setIsTyping(false);

            // Auto-focus input for next step if not done
            if (step < 2) {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }, 800 + Math.random() * 600); // Random delay between 800ms to 1400ms for realism
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-background-dark overflow-hidden">
            {/* Editor Tabs - Keep the IDE immersion */}
            <div className="flex border-b border-primary/20 bg-white dark:bg-slate-950/50 overflow-x-auto hide-scrollbar z-10 sticky top-0">
                <EditorTab title="index.js" icon={FileCode2} iconColor="text-yellow-500" isActive={false} />
                <EditorTab title="projects.py" icon={FileJson} iconColor="text-blue-400" isActive={false} />
                <EditorTab title="contact.ai" icon={MessageSquare} iconColor="text-emerald-500" isActive={true} />
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col pt-4 pb-24 md:pb-32 px-4 md:px-8">
                <div className="max-w-2xl w-full mx-auto flex flex-col gap-4">

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
                                    max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed
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

            {/* Input Dock */}
            <div className="absolute flex flex-col bottom-[80px] md:bottom-[45px] left-0 right-0 bg-gradient-to-t from-slate-50 dark:from-background-dark via-slate-50 dark:via-background-dark to-transparent pt-12 pb-4 px-4 md:px-8 border-t-transparent z-20">
                <div className="max-w-2xl w-full mx-auto relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${step >= 3 ? 'hidden' : 'block'}`}></div>

                    <div className={`relative flex items-center bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 transition-all ${step >= 3 ? 'opacity-50 pointer-events-none' : ''}`}>

                        <div className="pl-4 pr-2 flex items-center justify-center shrink-0">
                            {step === 0 ? <User className="w-5 h-5 text-slate-400" /> : <MessageSquare className="w-5 h-5 text-slate-400" />}
                        </div>

                        <input
                            ref={inputRef}
                            autoFocus
                            type={step === 1 ? 'text' : 'text'}
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isTyping || step >= 3}
                            placeholder={
                                step === 0 ? "Type your name..." :
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
                <div className="text-center mt-3 text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium tracking-wide">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Powered by Vibe Engine
                </div>
            </div>

            {/* Terminal Footer Status Bar */}
            <footer className="absolute bottom-0 left-0 right-0 h-[45px] border-t border-slate-200 dark:border-primary/20 bg-slate-100 dark:bg-slate-950 p-2 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-slate-500 z-30">
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
                <div className="flex items-center gap-3 hidden md:flex">
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
