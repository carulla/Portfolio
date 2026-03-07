'use client';

import { useEffect, useState } from 'react';
import '@/lib/i18n';
import { useTranslation } from 'react-i18next';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch by only rendering children after mount
    // but the actual context is already provided by initReactI18next
    if (!mounted) {
        return <div className="invisible">{children}</div>;
    }

    return <>{children}</>;
}
