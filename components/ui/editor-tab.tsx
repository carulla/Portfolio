import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { X } from 'lucide-react';

interface EditorTabProps {
    title: string;
    icon?: LucideIcon;
    iconColor?: string;
    isActive?: boolean;
    onClose?: () => void;
    className?: string;
}

export function EditorTab({
    title,
    icon: Icon,
    iconColor,
    isActive = false,
    onClose,
    className,
}: EditorTabProps) {
    return (
        <div
            className={cn(
                'group flex flex-none items-center justify-center border-b-2 px-4 py-3 gap-2 min-w-40 max-w-56 transition-colors cursor-pointer',
                isActive
                    ? 'border-primary bg-background-light dark:bg-background-dark'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-800',
                className
            )}
        >
            {Icon && (
                <Icon
                    className={cn('w-4 h-4', iconColor || (isActive ? 'text-primary' : 'text-slate-500'))}
                />
            )}
            <span
                className={cn(
                    'text-xs font-bold uppercase tracking-wider truncate',
                    isActive ? 'text-primary' : 'text-slate-600 dark:text-slate-400'
                )}
            >
                {title}
            </span>
            {onClose && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className={cn(
                        'ml-auto rounded p-0.5 transition-colors',
                        isActive ? 'opacity-100 text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800' : 'opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-500'
                    )}
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}
