import { cn } from '@/lib/utils';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface FileExplorerItemProps {
    name: string;
    type: 'file' | 'folder';
    icon: LucideIcon;
    iconColor?: string;
    subtitle?: string;
    isActive?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export function FileExplorerItem({
    name,
    type,
    icon: Icon,
    iconColor,
    subtitle,
    isActive = false,
    isOpen = false,
    onClick,
    className,
    children,
}: FileExplorerItemProps) {
    if (type === 'folder') {
        return (
            <details className="group" open={isOpen}>
                <summary
                    onClick={(e) => {
                        if (onClick) {
                            e.preventDefault();
                            onClick();
                        }
                    }}
                    className={cn(
                        'flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 list-none transition-colors border-l-2',
                        isActive ? 'border-primary bg-primary/5' : 'border-transparent',
                        className
                    )}
                >
                    <ChevronRight
                        className={cn(
                            'w-4 h-4 text-slate-500 transition-transform',
                            isOpen ? 'rotate-90' : ''
                        )}
                    />
                    <span className="text-sm font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Icon className={cn('w-4 h-4', iconColor || 'text-primary opacity-80')} />
                        {name}
                    </span>
                </summary>
                <div className="flex flex-col ml-4 border-l border-slate-200 dark:border-slate-800">
                    {children}
                </div>
            </details>
        );
    }

    // File item
    return (
        <div
            onClick={onClick}
            className={cn(
                'group flex flex-col gap-3 p-4 mx-2 my-1 rounded-lg transition-all cursor-pointer border',
                isActive
                    ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(19,91,236,0.15)]'
                    : 'bg-transparent border-transparent hover:bg-primary/5 dark:hover:bg-primary/10 hover:border-primary/20',
                className
            )}
        >
            <div className="flex items-center gap-3">
                <Icon className={cn('w-5 h-5', iconColor || 'text-slate-400')} />
                <div className="flex flex-col">
                    <span className={cn('text-sm font-medium', isActive ? 'text-primary' : 'text-slate-700 dark:text-slate-200')}>
                        {name}
                    </span>
                    {subtitle && (
                        <span className="text-[10px] text-slate-500 uppercase font-medium tracking-tight">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>
            {children && <div className="mt-2">{children}</div>}
        </div>
    );
}
