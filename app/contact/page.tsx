'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare } from 'lucide-react';
import { EditorTab } from '@/components/ui/editor-tab';
import { FileCode2, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GABRIEL_KB, SYSTEM_PROMPT } from '@/lib/gabriel-knowledge';
import { useTranslation } from 'react-i18next';

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
    formData: { name: string; contact: string; message: string },
    t: any
): { response: string; nextStep?: LeadStep; updatedForm?: Partial<typeof formData> } {

    const lower = userText.toLowerCase().trim();
    const kb = GABRIEL_KB;

    // --- LEAD CAPTURE FLOW ---
    if (leadStep === 'ask-name') {
        return {
            response: t('ai.name_prompt', { name: userText }),
            nextStep: 'ask-contact',
            updatedForm: { name: userText },
        };
    }
    if (leadStep === 'ask-contact') {
        return {
            response: t('ai.contact_prompt'),
            nextStep: 'ask-message',
            updatedForm: { contact: userText },
        };
    }
    if (leadStep === 'ask-message') {
        return {
            response: t('ai.success', { contact: formData.contact }),
            nextStep: 'done',
            updatedForm: { message: userText },
        };
    }

    // --- DETECT LEAD CAPTURE INTENT ---
    const leadTriggers = kb.leadCaptureKeywords;
    const wantsContact = leadTriggers.some(kw => lower.includes(kw));
    if (wantsContact) {
        return {
            response: t('ai.lead_start'),
            nextStep: 'ask-name',
        };
    }

    // --- HELPER: match any of a list of keywords ---
    const has = (...words: string[]) => words.some(w => lower.includes(w));

    // --- KNOWLEDGE-BASED Q&A ---

    // Greetings
    if (has('hi', 'hey', 'hello', 'oi', 'olá', 'ola', 'salut', 'bonjour', 'hola', 'howdy', 'sup', 'yo', 'e aí', 'eai', 'tudo bem', 'tudo bom', 'good morning', 'good afternoon', 'good evening')) {
        return {
            response: t('ai.greeting'),
        };
    }

    // Who / what is Gabriel — very broad including Portuguese
    if (has('who is', 'who are', 'quem é', 'quem e', 'tell me about', 'about gabriel', 'sobre gabriel', 'sobre ele', "who's gabriel", 'what does he do', 'what he does', 'o que ele faz', 'o que faz', 'what does gabriel', 'what is he', 'what is gabriel', 'what is his', 'descreva', 'describe', 'resumo', 'summary', 'overview', 'introdução', 'introduce', 'apresente', 'me fale')) {
        return {
            response: t('ai.whois'),
        };
    }

    // Job / occupation / current role
    if (has('job', 'occupation', 'role', 'position', 'profession', 'cargo', 'profissão', 'profissao', 'trabalho', 'o que ele trabalha', 'what does gabriel do', 'current job', 'day job', 'full time', 'full-time', 'emprego', 'atualmente', 'currently')) {
        return {
            response: `Gabriel wears two hats at the same time:\n\n👨‍🏫 **Day job**: Full-time ELA, Science & Math teacher at Maple Bear João Pessoa — a bilingual Canadian school where all classes are in English. He teaches Year 4.\n\n💻 **Beyond school hours**: SaaS founder and developer. He's built and launched 5 live projects, including products with paying customers.\n\nBasically: teacher by day, builder by night.`,
        };
    }

    // Location / where
    if (has('where', 'location', 'city', 'country', 'brazil', 'brasil', 'cidade', 'mora', 'vive', 'based', 'origem', 'origin', 'brasília', 'brasília', 'joão pessoa', 'joao pessoa', 'paraíba', 'paraiba')) {
        return {
            response: `Gabriel is originally from Brasília but has been living in João Pessoa, Paraíba for the past 11 years. 🌴\n\nSo yes — tropical vibes, full-time teacher by day, SaaS builder by night.`,
        };
    }

    // Education / degrees
    if (has('degree', 'university', 'college', 'studied', 'graduate', 'bachelor', 'faculdade', 'formação', 'formacao', 'graduação', 'graduacao', 'ufpb', 'journalism', 'jornalismo', 'english degree', 'letras', 'educated', 'academia')) {
        return {
            response: `Gabriel has 2 bachelor's degrees:\n📰 Journalism\n📖 English Language & Literature\n\nHe got into university while still in high school — placing **1st** on a private university entrance exam and **2nd** at UFPB (Universidade Federal da Paraíba). He quit high school early because he'd already secured his university spots. That "skip the unnecessary, go straight to results" mindset has defined his whole journey.`,
        };
    }

    // Teaching / school / Maple Bear
    if (has('teacher', 'teaching', 'school', 'maple bear', 'bilingual', 'professor', 'ensino', 'ensina', 'aula', 'year 4', 'science', 'math', 'ela', 'english teacher', 'canadian')) {
        return {
            response: `Gabriel has been an English teacher for 8+ years. Right now he teaches Year 4 at Maple Bear João Pessoa — a bilingual Canadian franchise where all classes are conducted entirely in English (ELA, Science, and Math).\n\nHis teaching background gave him something most developers don't have: elite communication skills, deep empathy for users, and the ability to break complex problems into something simple.`,
        };
    }

    // How he learned to code / career transition
    if (has('learn', 'started', 'começou', 'aprendeu', 'programming', 'origin story', 'how did', 'como aprendeu', 'como começou', 'self-taught', 'autodidata', 'história', 'historia', 'story', 'began', 'transition', 'transição', 'transicao', 'from teacher', 'career change', 'mudança de carreira')) {
        return {
            response: `In 2022, Gabriel was asked to automate the school's Report Card generation — a process eating hours of teacher time every cycle.\n\nHe had zero coding background. He taught himself by iterating with ChatGPT via Bing (best free GPT-4 at the time), copying console errors, pasting them back, and repeating — before modern AI tooling made this easy. He did it the hard way.\n\nThe automation worked. In 2023, Maple Bear awarded his school a **Golden Plate** at the National Convention for this innovation. 🏆\n\nThat gave him solid JS/HTML/CSS foundations — and an obsession with solving real problems nobody else has tackled yet.`,
        };
    }

    // Projects overview
    if (has('project', 'projects', 'apps', 'portfolio', 'built', 'projetos', 'aplicativo', 'aplicativos', 'produto', 'produtos', 'criou', 'desenvolveu', 'fez', 'o que construiu', 'what has he built', 'what did he build')) {
        if (!has('coupe', 'fluentes', 'evidenc', 'justplay', 'just play', 'running')) {
            return {
                response: `Gabriel has 5 live projects, all with real users:\n\n🏆 **EvidencIA** — EdTech SaaS for classroom evidence management, AI-powered, used by Maple Bear teachers across Brazil.\n\n✂️ **Coupe.SaaS** — Salon & barbershop management platform with 3 paying customers.\n\n🗣️ **Fluentes.app** — English learning app used daily in his own private classes.\n\n⚽ **JustPlay Sports App** — Custom operations platform delivered to a sports-in-school company.\n\n📚 **Running Records** — Kids literacy tracking tool for educators.\n\nWant details on any specific one?`,
            };
        }
    }

    // EvidencIA
    if (has('evidencia', 'evidência', 'report card', 'classroom management', 'evidences', 'evidências')) {
        const p = kb.projects["EvidencIA"];
        return {
            response: `EvidencIA is Gabriel's most ambitious project. 🚀\n\nIt started as a school AppScript. In 2025 he rebuilt it as a full micro-SaaS:\n\n${p.features.slice(0, 5).map(f => `• ${f}`).join('\n')}\n...and more.\n\nCurrently free while Gabriel validates with Maple Bear teachers across Brazil. The original version won a **national award** in 2023. 🏅`,
        };
    }

    // Coupe
    if (has('coupe', 'salon', 'barbershop', 'barbearia', 'salão', 'salao', 'coupebrasil')) {
        return {
            response: `Coupe is Gabriel's main revenue-generating product — a complete SaaS for salons and barbershops.\n\nIt has **3 real paying customers** and Gabriel is being deliberately careful about growth — fixing bugs, ensuring solid support, expanding slowly.\n\nHardest parts: WhatsApp API integrations and real-time user feedback iterations. He handles all support himself.`,
        };
    }

    // Fluentes
    if (has('fluentes', 'english app', 'language app', 'language learning', 'aprender inglês', 'aprender ingles')) {
        return {
            response: `Fluentes is Gabriel's personal English learning platform — built for his own students and used by him every single day in online classes. 📱\n\nIt has dozens of active paying users. He literally eats his own cooking on this one.`,
        };
    }

    // JustPlay / PIX
    if (has('justplay', 'just play', 'sports app', 'pix', 'inter bank', 'enrollment', 'matrícula', 'qr code')) {
        return {
            response: `JustPlay was a client delivery — Gabriel built a custom operations platform for a sports-in-school company.\n\nMost impressive technical feat: integrating **Inter Bank's PIX API** to automatically activate student enrollments on payment confirmation — matching by user ID, generating QR codes for zero-fee transactions, no third-party processor.\n\nDelivered as a fixed-price project with a monthly maintenance retainer.`,
        };
    }

    // Running Records
    if (has('running records', 'running record', 'literacy', 'leitura', 'reading fluency', 'fluency')) {
        return {
            response: `Running Records is an EdTech tool for kids' literacy tracking — allowing educators to monitor reading fluency progress for early learners. 📚\n\nLive, and designed with the teacher's workflow in mind — exactly the kind of user Gabriel knows from the inside.`,
        };
    }

    // Tech stack
    if (has('stack', 'tech', 'tools', 'framework', 'technology', 'tecnologia', 'uses', 'usa', 'utiliza', 'typescript', 'next.js', 'vue', 'supabase', 'n8n', 'tailwind', 'react', 'node', 'ferramenta')) {
        return {
            response: `Gabriel's stack:\n\n**Languages:** TypeScript, JavaScript, HTML, CSS\n**Frontend:** Next.js, Vue.js, TailwindCSS, Framer Motion\n**Backend:** Supabase, Edge Functions, AppScript\n**AI & Automation:** N8N, OpenAI/Gemini APIs, RAG systems, AI Agents\n**Integrations:** WhatsApp API, Inter Bank PIX, Google Drive API, Telegram API\n\nHis specialty: combining these into full-stack products that actually ship — not just prototypes.`,
        };
    }

    // Availability / hire
    if (has('available', 'availability', 'hire', 'freelance', 'disponível', 'disponivel', 'contratar', 'work with', 'work together', 'open to', 'taking projects', 'new project', 'collaborate', 'parceria')) {
        return {
            response: `Yes, Gabriel is open to new projects! 🟢\n\nHe works as:\n• Fixed-price projects\n• Monthly retainers\n• Hourly (negotiable)\n\nHis philosophy: **Win-Win only.** He won't take a deal that doesn't benefit both sides.\n\nHe's also open to a full-time AI Developer role if the mission and compensation align.\n\nWant to leave your contact so Gabriel can reach out?`,
        };
    }

    // Pricing / cost
    if (has('price', 'pricing', 'cost', 'budget', 'how much', 'quanto', 'valor', 'preço', 'preco', 'rate', 'fee', 'charge', 'cobrar', 'cobras')) {
        return {
            response: `Gabriel doesn't have fixed public rates — every project is different. His approach: let's talk, understand the scope, and agree on something fair for both sides.\n\nHis motto: **Win-Win only.**\n\nWant to start that conversation? Just say you'd like to reach out and I'll connect you with Gabriel directly.`,
        };
    }

    // Languages spoken
    if (has('idioma', 'idiomas', 'fala', 'língua', 'lingua', 'french', 'francês', 'frances', 'spanish', 'espanhol', 'portuguese', 'português', 'multilingual', 'polyglot', 'quantas línguas', 'quantas linguas')) {
        return {
            response: `Gabriel speaks 4 languages (and counting):\n\n🇧🇷 Portuguese — native\n🇺🇸 English — professional fluency (teaches in English full-time)\n🇫🇷 French — fluent\n🇪🇸 Spanish — currently learning, self-imposed 4-month mastery goal\n\nHe's clearly someone who enjoys the challenge. Makes sense — he's a language teacher by trade.`,
        };
    }

    // Personal / hobbies / family
    if (has('hobby', 'hobbies', 'personal', 'family', 'família', 'familia', 'fun', 'guitar', 'music', 'música', 'father', 'dad', 'pai', 'filha', 'daughter', 'son', 'filho', 'children', 'kids', 'fora do trabalho', 'outside work', 'gemini', 'zodiac', 'signo', 'sings', 'canta', 'toca', 'vida pessoal')) {
        return {
            response: `Outside of coding and teaching, Gabriel:\n\n🎸 Plays guitar and sings\n🌎 Gets obsessed with learning languages (currently targeting Spanish fluency in 4 months)\n👧 Is a father to a 5-year-old daughter and stepfather to 2 boys — one already taller than him 😄\n♊ Is a Gemini (which explains the intense hyperfocus energy)\n🎓 Has 2 bachelor's degrees and a national EdTech award\n\nHe genuinely loves both teaching and learning — he's never stopped doing both simultaneously.`,
        };
    }

    // Award / recognition
    if (has('award', 'prize', 'prêmio', 'premio', 'convention', 'recognition', 'reconhecimento', 'golden', 'gold plate', 'national', 'nacional', 'success case')) {
        return {
            response: `In 2023, Maple Bear awarded Gabriel's school a **Golden Plate** at the National Convention as a Success Case in AI-powered education. 🏆\n\nThis was for the AppScript automation he built from scratch — with zero prior coding experience — that used AI to generate student Report Cards, saving hours per cycle.`,
        };
    }

    // What makes him different
    if (has('different', 'unique', 'superpower', 'special', 'stand out', 'why gabriel', 'why him', 'diferencial', 'diferente', 'strengths', 'pontos fortes', 'better', 'expertise')) {
        return {
            response: `A few things set Gabriel apart:\n\n**1. He's a doer.** He doesn't just plan — he ships. Real products, real users, real problems solved.\n\n**2. He understands people.** 8 years of teaching gave him elite communication, empathy, and the ability to simplify complexity.\n\n**3. He learned the hard way.** No bootcamp, no CS degree — just persistence and relentless iteration. That makes him resilient.\n\n**4. He's obsessive about real problems.** He won't build just because it's technically cool — it has to solve something real.\n\n**5. He teaches full-time AND runs a SaaS.** If he can manage support, new features, students, and 3 subjects simultaneously — he can handle your project.`,
        };
    }

    // Small talk / how are you
    if (has('how are you', 'como vai', 'tudo bem', 'tudo bom', 'hows it going', "how's it going")) {
        return {
            response: `All good, thanks! 😊 I'm Gabriel's AI — fully charged and ready to answer whatever you're curious about.\n\nWhat would you like to know?`,
        };
    }

    // What can you do
    if (has('what can you', 'what do you know', 'what can i ask', 'o que você sabe', 'capabilities', 'help me with', 'can you help', 'pode me ajudar')) {
        return {
            response: `Pretty much anything about Gabriel! 🧠 Try me:\n\n• His background and story\n• His projects and how they work\n• His tech stack and tools\n• His availability and how to hire him\n• His personal side (hobbies, family, languages...)\n\nOr just say you want to leave him a message — I'll handle that too.`,
        };
    }

    // Catch-all fallback
    return {
        response: t('ai.fallback'),
    };
}

// -------------------------------------------------------
// COMPONENT
// -------------------------------------------------------
export default function ContactPage() {
    const { t } = useTranslation();
    const [leadStep, setLeadStep] = useState<LeadStep>('chat');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'initial-1',
            sender: 'ai',
            text: t('ai.greeting').split('\n\n')[0],
        },
        {
            id: 'initial-2',
            sender: 'ai',
            text: t('ai.greeting').split('\n\n').slice(1).join('\n\n'),
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
        if (leadStep === 'ask-name') return t('ai.placeholder_name') || 'Your name...';
        if (leadStep === 'ask-contact') return t('ai.placeholder_contact') || 'WhatsApp or email...';
        if (leadStep === 'ask-message') return t('ai.placeholder_message') || 'Your message for Gabriel...';
        if (leadStep === 'done') return t('ai.sent') || 'Message sent! ✅';
        return t('ai.placeholder');
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
            const { response, nextStep, updatedForm } = getAIResponse(userText, leadStep, formData, t);

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
