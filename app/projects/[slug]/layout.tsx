export function generateStaticParams() {
    return [
        { slug: 'coupe' },
        { slug: 'fluentes' },
        { slug: 'just-play-sports' },
        { slug: 'evidencia' },
        { slug: 'running-records' }
    ];
}

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
