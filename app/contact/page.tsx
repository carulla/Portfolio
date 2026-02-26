'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GABRIEL_KB, SYSTEM_PROMPT } from '@/lib/gabriel-knowledge';

type Message = {
    id: string;
    sender: 'ai' | 'user';
    text: string;
};

// Lead capture steps
type LeadStep = 'chat' | 'ask-name' | 'ask-contact' | 'ask-message' | 'done';

// -------------------------------------------------------
// Context-aware response engine (no live API, pure RAG)
// -------------------------------------------------------
function getAIResponse(
    userText: string,
    leadStep: LeadStep,
    formData: { name: string; contact: string; message: string }
): { response: string; nextStep?: LeadStep; updatedForm?: Partial<typeof formData> } {

    const lower = userText.toLowerCase().trim();
    const kb = GABRIEL_KB;

    // --- LEAD CAPTURE FLOW ---
    if (leadStep === 'ask-name') {
        return {
            response: `Nice to meet you, ${userText}! 😊 What's the best WhatsApp number or email to reach you?`,
            nextStep: 'ask-contact',
            updatedForm: { name: userText },
        };
    }
    if (leadStep === 'ask-contact') {
        return {
            response: `Got it! And what message would you like to send Gabriel?`,
            nextStep: 'ask-message',
            updatedForm: { contact: userText },
        };
    }
    if (leadStep === 'ask-message') {
        return {
            response: `Perfect. ✅\n\nI've passed your message along to Gabriel. He'll hit you up on ${formData.contact} soon. He's quick! 🚀`,
            nextStep: 'done',
            updatedForm: { message: userText },
        };
    }

    // --- DETECT LEAD CAPTURE INTENT ---
    const leadTriggers = kb.leadCaptureKeywords;
    const wantsContact = leadTriggers.some(kw => lower.includes(kw));
    if (wantsContact) {
        return {
            response: `Sure! I'll help you get in touch with Gabriel. 🤝\n\nFirst — what's your name?`,
            nextStep: 'ask-name',
        };
    }

    // --- KNOWLEDGE-BASED Q&A ---

    // Greetings
    if (/^(hi|hey|hello|oi|olá|ola|salut|bonjour|hola)[\s!?]*$/.test(lower) || lower.startsWith('hi ') || lower.startsWith('hey ')) {
        return {
            response: `Hey there! 👋 I'm Gabriel's AI assistant — I know everything about him and his work.\n\nFeel free to ask me anything: his projects, his background, his stack, how to work with him... What would you like to know?`,
        };
    }

    // Who is Gabriel / About
    if (lower.includes('who is') || lower.includes('about gabriel') || lower.includes('tell me about') || lower.includes('quem é')) {
        return {
            response: `Gabriel Carulla is a full-time school teacher AND a SaaS founder — both at the same time. 🤯\n\nHe teaches ELA, Science and Math (in English!) at Maple Bear João Pessoa, a bilingual Canadian school in Brazil. But outside of school hours, he's been quietly building real products that real people pay for.\n\nHe taught himself to code in 2022 by copy-pasting console errors into ChatGPT, earned a national award for it in 2023, and has since launched multiple live apps. He's the kind of person who sees an unsolved problem and can't rest until he's solved it.`,
        };
    }

    // Origin / Location
    if (lower.includes('where') && (lower.includes('from') || lower.includes('live') || lower.includes('based') || lower.includes('location') || lower.includes('mora') || lower.includes('cidade'))) {
        return {
            response: `Gabriel is originally from Brasília but has been living in João Pessoa, Paraíba for the past 11 years. 🌴\n\nSo yes — tropical vibes, full-time teacher by day, SaaS builder by night.`,
        };
    }

    // Background / Education / Teaching
    if (lower.includes('teacher') || lower.includes('school') || lower.includes('maple bear') || lower.includes('education') || lower.includes('background') || lower.includes('history') || lower.includes('formação')) {
        return {
            response: `Gabriel has 2 bachelor's degrees — English Language & Literature and Journalism. He got into university by placing 1st on a private uni exam AND 2nd at UFPB (a top federal university), while still in high school.\n\nHe's been a full-time English teacher for 8+ years. Right now he teaches Year 4 (ELA, Science, and Math) at Maple Bear João Pessoa — a bilingual Canadian school where all classes are in English.\n\nHis teaching background gave him something most developers don't have: the ability to communicate clearly, empathize with users, and break down complex problems into simple ones.`,
        };
    }

    // How he learned to code / origin story
    if (lower.includes('learn') && lower.includes('code') || lower.includes('started coding') || lower.includes('aprendeu') || lower.includes('programming') || lower.includes('began') || lower.includes('started coding') || lower.includes('origin') || lower.includes('story') || lower.includes('começou')) {
        return {
            response: `In 2022, Gabriel was asked to automate the school's Report Card generation — a process that was eating hours of teacher time every cycle.\n\nHe had no coding background. He taught himself by iterating with ChatGPT, copying console errors, pasting them into Bing (which had the best free GPT-4 at the time), fixing, breaking, and fixing again. This was before MCP tools and modern AI assistants made this easy — he did it the hard way.\n\nThe automation worked. In 2023, Maple Bear gave the school a **Golden Plate Award** at the National Convention for it. 🏆\n\nThat project gave Gabriel strong JS/HTML/CSS foundations — and an obsession with building things that actually solve real problems.`,
        };
    }

    // Projects overview
    if ((lower.includes('project') || lower.includes('work') || lower.includes('portfolio') || lower.includes('app') || lower.includes('built') || lower.includes('projetos')) && !lower.includes('coupe') && !lower.includes('fluentes') && !lower.includes('evidenc') && !lower.includes('justplay') && !lower.includes('running')) {
        return {
            response: `Gabriel has 5 live projects, all with real users:\n\n🏆 **EvidencIA** — EdTech SaaS for classroom evidence management, AI-powered, used by Maple Bear teachers across Brazil.\n\n✂️ **Coupe.SaaS** — Salon & barbershop management platform with 3 paying customers.\n\n🗣️ **Fluentes.app** — English learning app used daily with his own private students.\n\n⚽ **JustPlay Sports App** — Custom operations platform delivered to a sports-in-school company.\n\n📚 **Running Records** — Kids literacy tracking tool for educators.\n\nWant details on any specific one?`,
        };
    }

    // EvidencIA
    if (lower.includes('evidencia') || lower.includes('evidência') || lower.includes('report card') || lower.includes('edtech') || lower.includes('classroom')) {
        const p = kb.projects["EvidencIA"];
        return {
            response: `EvidencIA is Gabriel's most ambitious project — and honestly, one of the most impressive stories. 🚀\n\nIt started as a simple AppScript to automate school Report Cards. In 2025 he rebuilt it from scratch as a full micro-SaaS with:\n\n${p.features.map(f => `• ${f}`).join('\n')}\n\nIt's currently free while Gabriel validates it with Maple Bear teachers across Brazil. Monetization is coming — he wants to make sure it's truly useful before charging for it.\n\nOh, and the original version of this idea won a **national award** in 2023. 🏅`,
        };
    }

    // Coupe
    if (lower.includes('coupe') || lower.includes('salon') || lower.includes('barbershop') || lower.includes('saas')) {
        const p = kb.projects["Coupe.SaaS"];
        return {
            response: `Coupe is Gabriel's main revenue-generating product right now — a complete SaaS for salons and barbershops.\n\n${p.description}\n\nIt has **3 real paying customers** and Gabriel is being intentionally careful about growth — fixing bugs, tightening support, and expanding slowly so no one falls through the cracks.\n\nThe hardest parts? WhatsApp API integrations and daily user-driven iterations. He handles all support himself and turns around fixes fast.`,
        };
    }

    // Fluentes
    if (lower.includes('fluentes') || lower.includes('english app') || lower.includes('language app') || lower.includes('language learning')) {
        const p = kb.projects["Fluentes.app"];
        return {
            response: `Fluentes is Gabriel's personal English learning platform — and he literally uses it every day in his own online private classes. 📱\n\n${p.description}\n\nIt has dozens of active paying users, mostly his students. There's something cool about a developer who uses his own app daily — it means every bug gets caught fast.`,
        };
    }

    // JustPlay / PIX integration
    if (lower.includes('justplay') || lower.includes('just play') || lower.includes('sports') || lower.includes('pix') || lower.includes('inter bank') || lower.includes('payment')) {
        const p = kb.projects["JustPlay Sports App"];
        return {
            response: `JustPlay was a client delivery project — Gabriel built a custom operations app for a sports-in-school company.\n\nThe most impressive technical feat here? He integrated **Inter Bank's PIX API** to automatically activate student enrollments the moment payment was confirmed — no third-party processor, matching by user ID, generating QR codes for zero-fee transactions.\n\nIt was delivered as a fixed-price project (substantial payment) with a small monthly maintenance retainer afterward.`,
        };
    }

    // Stack / Tech
    if (lower.includes('stack') || lower.includes('tech') || lower.includes('tools') || lower.includes('framework') || lower.includes('language') || lower.includes('tecnologia')) {
        return {
            response: `Gabriel's stack:\n\n**Languages:** TypeScript, JavaScript, HTML, CSS\n**Frontend:** Next.js, Vue.js, TailwindCSS, Framer Motion\n**Backend:** Supabase, Edge Functions, AppScript\n**AI & Automation:** N8N, OpenAI/Gemini APIs, RAG systems, AI Agents\n**Integrations:** WhatsApp API, Inter Bank PIX, Google Drive API, Telegram API\n\nHis specialty is combining these pieces into full-stack products that actually ship — not just prototypes.`,
        };
    }

    // Availability / hire / work together
    if (lower.includes('available') || lower.includes('freelance') || lower.includes('hire') || lower.includes('disponível') || lower.includes('work with')) {
        return {
            response: `Yes, Gabriel is open to new projects! 🟢\n\nHe works on:\n• Fixed-price projects\n• Monthly retainers\n• Hourly (negotiable)\n\nHis philosophy: **Win-Win only.** He won't take a deal that doesn't benefit both sides.\n\nHe's also open to considering a full-time AI Developer role if the mission aligns with his values and the compensation makes sense.\n\nWant to leave your contact so Gabriel can reach out?`,
        };
    }

    // Languages / multilingual
    if (lower.includes('language') && !lower.includes('tech') && !lower.includes('framework') && !lower.includes('coding') || lower.includes('speak') || lower.includes('idioma') || lower.includes('french') || lower.includes('spanish') || lower.includes('portuguese') || lower.includes('bilingual')) {
        return {
            response: `Gabriel speaks 4 languages (and counting):\n\n🇧🇷 Portuguese — native\n🇺🇸 English — fully fluent (teaches professionally in English)\n🇫🇷 French — fluent\n🇪🇸 Spanish — currently learning, self-imposed 4-month mastery goal\n\nHe's clearly someone who enjoys the challenge of learning. Makes sense — he's also a language teacher.`,
        };
    }

    // Personal / hobbies
    if (lower.includes('hobby') || lower.includes('hobbies') || lower.includes('personal') || lower.includes('family') || lower.includes('fun') || lower.includes('guitar') || lower.includes('music') || lower.includes('father') || lower.includes('dad') || lower.includes('pai') || lower.includes('filha')) {
        return {
            response: `Outside of coding and teaching, Gabriel:\n\n🎸 Plays guitar and sings\n🌎 Is obsessed with learning languages (currently going for Spanish in 4 months)\n👧 Is a father to a 5-year-old daughter and stepfather to 2 boys (one already taller than him 😄)\n🎓 Has 2 bachelor's degrees and a national award for EdTech innovation\n\nOh, and he's a Gemini — which probably explains the "gets intensely obsessed with things until he masters them" energy.`,
        };
    }

    // Award / success / Maple Bear convention
    if (lower.includes('award') || lower.includes('prize') || lower.includes('convention') || lower.includes('prêmio') || lower.includes('reconhecimento') || lower.includes('gold')) {
        return {
            response: `In 2023, Maple Bear awarded Gabriel's school a **Golden Plate** at the National Convention as a Success Case in AI-powered education.\n\nThis was for his AppScript automation that used AI to generate student Report Cards — a project he built entirely from scratch with no prior coding experience, just persistence and ChatGPT. 🏆`,
        };
    }

    // Superpower / what makes him different
    if (lower.includes('different') || lower.includes('unique') || lower.includes('superpower') || lower.includes('special') || lower.includes('stand out') || lower.includes('why gabriel') || lower.includes('why you') || lower.includes('why him')) {
        return {
            response: `A few things set Gabriel apart:\n\n**1. He's a doer.** He doesn't just plan — he ships. Real products, real users, real problems solved.\n\n**2. He understands people.** 8 years of teaching gave him exceptional communication, empathy, and the ability to break down complexity into clarity.\n\n**3. He learned the hard way.** No bootcamp, no CS degree. He built things by breaking them, fixing them, and shipping anyway. That makes him resilient.\n\n**4. He's obsessive about real problems.** He won't build something just because it's technically interesting — it has to solve something real.\n\n**5. He teaches full-time and still ships products.** If he can manage SaaS support, new features, students, and 3 subjects at a bilingual school simultaneously — he can handle your project.`,
        };
    }

    // How are you / small talk
    if (lower.includes('how are you') || lower.includes('como vai') || lower.includes('tudo bem')) {
        return {
            response: `All good, thanks for asking! 😊 I'm Gabriel's AI, so I don't have feelings per se — but I am fully loaded with knowledge about him and ready to answer whatever you're curious about.\n\nWhat would you like to know?`,
        };
    }

    // What can you do / what do you know
    if (lower.includes('what can you') || lower.includes('what do you know') || lower.includes('what can i ask') || lower.includes('o que você sabe')) {
        return {
            response: `Pretty much anything about Gabriel! 🧠 Try me:\n\n• His background and story\n• His projects and how they work\n• His tech stack\n• His availability and how to hire him\n• His personal side (hobbies, family, etc.)\n• Or just say you want to leave a message and I'll help you get in touch with him.`,
        };
    }

    // Default fallback
    return {
        response: `That's a great question — I might not have a specific answer for that one, but I can tell Gabriel you asked! 😄\n\nIn the meantime, feel free to ask me about his projects, background, tech stack, or availability. Or if you'd like to reach out directly, just say the word!`,
    };
}

// -------------------------------------------------------
// COMPONENT
// -------------------------------------------------------
export default function ContactPage() {
    const [leadStep, setLeadStep] = useState<LeadStep>('chat');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'initial-1',
            sender: 'ai',
            text: `Hey! 👋 I'm Gabriel's AI assistant.`,
        },
        {
            id: 'initial-2',
            sender: 'ai',
            text: `I know everything about him — his projects, background, skills, how to work with him, and the story behind it all.\n\nAsk me anything, or just say you want to leave him a message and I'll handle that too. What's on your mind?`,
        },
    ]);
    const [inputVal, setInputVal] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const getPlaceholder = () => {
        if (leadStep === 'ask-name') return 'Your name...';
        if (leadStep === 'ask-contact') return 'WhatsApp or email...';
        if (leadStep === 'ask-message') return 'Your message for Gabriel...';
        if (leadStep === 'done') return 'Message sent! ✅';
        return 'Ask me anything about Gabriel...';
    };

    const handleSend = () => {
        if (!inputVal.trim() || isTyping || leadStep === 'done') return;

        const userText = inputVal.trim();
        const newMessages: Message[] = [
            ...messages,
            { id: Date.now().toString(), sender: 'user' as const, text: userText },
        ];
        setMessages(newMessages);
        setInputVal('');
        setIsTyping(true);

        setTimeout(() => {
            const { response, nextStep, updatedForm } = getAIResponse(userText, leadStep, formData);

            if (updatedForm) {
                setFormData(prev => ({ ...prev, ...updatedForm }));
                // Log complete payload when message is captured
                if (leadStep === 'ask-message') {
                    const finalPayload = { ...formData, ...updatedForm };
                    console.log('📬 Lead captured:', finalPayload);
                }
            }

            if (nextStep) setLeadStep(nextStep);

            setMessages([
                ...newMessages,
                { id: (Date.now() + 1).toString(), sender: 'ai' as const, text: response },
            ]);
            setIsTyping(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }, 700 + Math.random() * 500);
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

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col pt-4 px-4 md:px-8">
                <div className="max-w-2xl w-full mx-auto flex flex-col gap-4 pb-4">

                    {/* Timestamp */}
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
                                {msg.sender === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-primary flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-primary/20">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}

                                <div className={`
                                    max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed whitespace-pre-line
                                    ${msg.sender === 'user'
                                        ? 'bg-primary text-white rounded-br-sm shadow-md shadow-primary/10'
                                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-sm shadow-sm border border-slate-100 dark:border-slate-700'
                                    }
                                `}>
                                    {msg.text}
                                </div>

                                {msg.sender === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                                        <User className="w-4 h-4 text-slate-500" />
                                    </div>
                                )}
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
            <div className="flex-shrink-0 bg-slate-50 dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3">
                <div className="max-w-2xl w-full mx-auto relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${leadStep === 'done' ? 'hidden' : 'block'}`} />

                    <div className={`relative flex items-center bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-1.5 border border-slate-200 dark:border-slate-800 transition-all ${leadStep === 'done' ? 'opacity-50 pointer-events-none' : ''}`}>

                        <div className="pl-4 pr-2 flex items-center justify-center shrink-0">
                            {leadStep === 'ask-name' ? <User className="w-5 h-5 text-slate-400" /> : <MessageSquare className="w-5 h-5 text-slate-400" />}
                        </div>

                        <input
                            ref={inputRef}
                            autoFocus
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isTyping || leadStep === 'done'}
                            placeholder={getPlaceholder()}
                            className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white px-2 py-3.5 focus:ring-0 placeholder:text-slate-400 text-sm md:text-base"
                        />

                        <button
                            onClick={handleSend}
                            disabled={!inputVal.trim() || isTyping || leadStep === 'done'}
                            className={`p-3 rounded-xl flex items-center justify-center transition-all ${inputVal.trim() && !isTyping && leadStep !== 'done'
                                ? 'bg-primary text-white shadow-md hover:bg-primary/90'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                }`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="text-center mt-2 text-[10px] text-slate-400 flex items-center justify-center gap-1 font-medium tracking-wide">
                    <Sparkles className="w-3 h-3 text-emerald-500" /> Powered by Vibe Engine
                </div>
            </div>

            {/* Status Bar */}
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
                        <span>v2.0.0</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
