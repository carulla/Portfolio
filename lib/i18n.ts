import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                work: 'Work',
                stack: 'Stack',
                contact: 'Contact',
                settings: 'Settings'
            },
            home: {
                role: 'AI Analyst | Full Stack Developer | Vibe Coder',
                bio: '// Full Stack Developer with 6 years of tech experience, specializing in Vibe Coding, Low-Code, and No-Code solutions. Previously an English Teacher for 8 years, giving me an edge in top-tier communication, empathy for the end-user, and breaking down complex problems.'
            },
            projects: {
                explorer: 'Explorer',
                launch: 'Launch Live Experience',
                back: 'Back',
                readme: 'Welcome to my digital workspace. Navigate through the directory tree on the left to explore the various architectures, full-stack applications, and specialized tools I\'ve built.',
                overview: 'Overview',
                instructions: 'Instructions',
                select_file: 'Select a file from the Explorer to view the project source code and live demo.',
                evidencia_desc: 'EdTech platform using AI to capture student evidence and automate report cards for Maple Bear schools.',
                coupe_desc: 'Complete SaaS solution for salon and barbershop management with real-time scheduling.',
                fluentes_desc: 'Modern English acquisition web app built for deep immersion and practical communication.',
                justplay_desc: 'Custom operations platform for school sports, featuring automatic PIX payment registration.',
                running_desc: 'Digital tracking tool for kids reading fluency and literacy levels in bilingual schools.',
                bullet_1: 'Over 6 years of experience turning complex problems into elegant solutions.',
                bullet_2: 'Expertise in Next.js, Vue.js, TailwindCSS, and scaling backend services via Supabase.',
                bullet_3: 'Integrated AI agent systems, N8N workflows, and Vibe Coding architecture.',
                folder_portfolio: 'Portfolio',
                folder_apps: 'Web-Apps',
                folder_edtech: 'EdTech-Projects'
            },
            stack: {
                install: 'npm install skills',
                packages: '✨ added 3 packages, and audited 4 packages in 12ms',
                commits: 'Commits',
                experience: 'Experience',
                years: '6 Years'
            },
            ai: {
                greeting: "Hey there! 👋 I'm Gabriel's AI assistant — I know everything about him and his work.\n\nFeel free to ask me anything: his projects, his background, his stack, how to work with him... What would you like to know?",
                whois: "Gabriel Carulla is a full-time school teacher AND a SaaS founder — both at the same time. 🤯\n\nHe teaches ELA, Science and Math (in English!) at Maple Bear João Pessoa, a bilingual Canadian school in Brazil. But outside of school hours, he's been quietly building real products that real people pay for.\n\nHe taught himself to code in 2022 by relentlessly iterating with ChatGPT, earned a national award for it in 2023, and has since launched 5 live apps with real users. He's the kind of person who spots an unsolved problem and can't rest until he's cracked it.",
                fallback: "Hmm, I'm not sure I have a specific answer for that one. 🤔\n\nTry asking about Gabriel's projects, background, tech stack, teaching career, or how to work with him. Or rephrase — I might just be missing context!\n\nYou can also say \"I want to reach out\" and I'll connect you with Gabriel directly.",
                placeholder: "Ask me anything about Gabriel...",
                name_prompt: "Nice to meet you, {{name}}! 😊 What's the best WhatsApp number or email to reach you?",
                contact_prompt: "Got it! And what message would you like to send Gabriel?",
                success: "Perfect. ✅\n\nI've passed your message along to Gabriel. He'll hit you up on {{contact}} soon. He's quick! 🚀",
                lead_start: "Sure! I'll help you get in touch with Gabriel. 🤝\n\nFirst — what's your name?"
            }
        }
    },
    pt: {
        translation: {
            nav: {
                home: 'Início',
                work: 'Projetos',
                stack: 'Stack',
                contact: 'Contato',
                settings: 'Configurações'
            },
            home: {
                role: 'Analista de IA | Desenvolvedor Full Stack | Vibe Coder',
                bio: '// Desenvolvedor Full Stack com 6 anos de experiência em tecnologia, especializado em Vibe Coding, soluções Low-Code e No-Code. Anteriormente Professor de Inglês por 8 anos, o que me dá vantagem em comunicação de alto nível, empatia com o usuário final e resolução de problemas complexos.'
            },
            projects: {
                explorer: 'Explorador',
                launch: 'Lançar Experiência ao Vivo',
                back: 'Voltar',
                readme: 'Bem-vindo ao meu espaço de trabalho digital. Navegue pela árvore de diretórios à esquerda para explorar as várias arquiteturas, aplicações full-stack e ferramentas especializadas que construí.',
                overview: 'Visão Geral',
                instructions: 'Instruções',
                select_file: 'Selecione um arquivo no Explorador para visualizar o código-fonte do projeto e a demonstração ao vivo.',
                evidencia_desc: 'Plataforma EdTech usando IA para capturar evidências de alunos e automatizar boletins para escolas Maple Bear.',
                coupe_desc: 'Solução SaaS completa para gestão de salões e barbearias com agendamento em tempo real.',
                fluentes_desc: 'Web app moderno para aquisição de inglês, focado em imersão profunda e comunicação prática.',
                justplay_desc: 'Plataforma de operações personalizada para esportes escolares, com registro automático de pagamentos via PIX.',
                running_desc: 'Ferramenta digital para acompanhamento da fluência de leitura e níveis de alfabetização em escolas bilíngues.',
                bullet_1: 'Mais de 6 anos de experiência transformando problemas complexos em soluções elegantes.',
                bullet_2: 'Especialista em Next.js, Vue.js, TailwindCSS e escalonamento de serviços de backend via Supabase.',
                bullet_3: 'Sistemas integrados de agentes de IA, fluxos n8n e arquitetura Vibe Coding.',
                folder_portfolio: 'Portfólio',
                folder_apps: 'Web-Apps',
                folder_edtech: 'Projetos-Educacionais'
            },
            stack: {
                install: 'npm install habilidades',
                packages: '✨ adicionados 3 pacotes e auditados 4 pacotes em 12ms',
                commits: 'Commits',
                experience: 'Experiência',
                years: '6 Anos'
            },
            ai: {
                greeting: "Olá! 👋 Sou o assistente de IA do Gabriel — sei tudo sobre ele e seu trabalho.\n\nSinta-se à vontade para me perguntar qualquer coisa: seus projetos, sua trajetória, sua stack, como trabalhar com ele... O que você gostaria de saber?",
                whois: "Gabriel Carulla é professor em tempo integral E fundador de SaaS — ambos ao mesmo tempo. 🤯\n\nEle ensina ELA, Ciências e Matemática (em inglês!) na Maple Bear João Pessoa, uma escola bilíngue canadense no Brasil. Mas fora do horário escolar, ele tem construído silenciosamente produtos reais que pessoas reais pagam para usar.\n\nEle aprendeu a programar em 2022 iterando incansavelmente com o ChatGPT, ganhou um prêmio nacional por isso em 2023 e, desde então, lançou 5 aplicativos reais. Ele é o tipo de pessoa que vê um problema não resolvido e não descansa até resolvê-lo.",
                fallback: "Hmm, não tenho certeza se tenho uma resposta específica para isso. 🤔\n\nTente perguntar sobre os projetos do Gabriel, trajetória, stack tecnológica, carreira docente ou como trabalhar com ele. Ou reformule — posso estar sem contexto!\n\nVocê também pode dizer \"Quero entrar em contato\" e eu te conectarei diretamente com o Gabriel.",
                placeholder: "Pergunte-me qualquer coisa sobre o Gabriel...",
                name_prompt: "Prazer em te conhecer, {{name}}! 😊 Qual o melhor número de WhatsApp ou e-mail para falar com você?",
                contact_prompt: "Entendi! E que mensagem você gostaria de enviar para o Gabriel?",
                success: "Perfeito. ✅\n\nPassei sua mensagem para o Gabriel. Ele entrará em contato com você no {{contact}} em breve. Ele é rápido! 🚀",
                lead_start: "Claro! Vou te ajudar a entrar em contato com o Gabriel. 🤝\n\nPrimeiro — qual o seu nome?"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
