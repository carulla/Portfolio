import { cn } from '@/lib/utils';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface FileExplorerItemProps {
    name: string;
    type: 'file' | 'folder';
    icon: LucideIcon;
    iconColor?: string;
    isActive?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    depth?: number;
}

export function FileExplorerItem({
    name,
    type,
    icon: Icon,
    iconColor,
    isActive = false,
    isOpen = false,
    onClick,
    className,
    children,
    depth = 0,
}: FileExplorerItemProps) {
    // VS Code lists use ~12px per indent depth, plus some base padding.
    const paddingLeft = `${(depth * 12) + 8}px`;

    if (type === 'folder') {
        return (
            <div className="flex flex-col">
                <div
                    onClick={(e) => {
                        if (onClick) {
                            e.preventDefault();
                            onClick();
                        }
                    }}
                    style={{ paddingLeft }}
                    className={cn(
                        'flex cursor-pointer items-center py-[2px] hover:bg-[#2a2d2e] dark:hover:bg-[#2a2d2e] transition-colors overflow-hidden whitespace-nowrap',
                        isActive ? 'bg-[#37373d] dark:bg-[#37373d]' : 'bg-transparent',
                        className
                    )}
                >
                    <ChevronRight
                        className={cn(
                            'w-4 h-4 text-slate-400 shrink-0 transition-transform mr-0.5',
                            isOpen ? 'rotate-90' : ''
                        )}
                    />
                    <Icon className={cn('w-4 h-4 shrink-0 mr-1.5', iconColor || 'text-slate-400')} />
                    <span className="text-[13px] text-slate-700 dark:text-[#cccccc] select-none truncate">
                        {name}
                    </span>
                </div>
                {isOpen && children && (
                    <div className="flex flex-col">
                        {children}
                    </div>
                )}
            </div>
        );
    }

    // File item
    return (
        <div
            onClick={onClick}
            style={{ paddingLeft: `${(depth * 12) + 26}px` }} // Files don't have chevron, offset by 18px
            className={cn(
                'flex items-center py-[2px] cursor-pointer hover:bg-[#2a2d2e] dark:hover:bg-[#2a2d2e] transition-colors overflow-hidden whitespace-nowrap',
                isActive
                    ? 'bg-[#37373d] text-white dark:bg-[#37373d]'
                    : 'bg-transparent text-slate-700 dark:text-[#cccccc]',
                className
            )}
        >
            <Icon className={cn('w-4 h-4 shrink-0 mr-1.5', iconColor || 'text-slate-400')} />
            <span className={cn('text-[13px] select-none truncate', isActive ? 'text-white' : '')}>
                {name}
            </span>
        </div>
    );
}
