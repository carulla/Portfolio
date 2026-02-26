'use client';

import { useState, useEffect, useRef } from 'react';
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
    previewFrames?: string[];
}

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Portfolio' : '';

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
    previewFrames,
}: FileExplorerItemProps) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [showPreview, setShowPreview] = useState(true);
    const [isHovered, setIsHovered] = useState(false); // Kept for other hover effects if needed
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (showPreview && previewFrames && previewFrames.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentFrame(prev => (prev + 1) % previewFrames.length);
            }, 2000); // Slower frame rate
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [showPreview, previewFrames]);

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
            className="flex flex-col"
        >
            <div
                onClick={onClick}
                style={{ paddingLeft: `${(depth * 12) + 26}px` }}
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

            {/* Animated mini preview on hover */}
            {previewFrames && previewFrames.length > 0 && showPreview && (
                <div
                    style={{ marginLeft: `${(depth * 12) + 26}px` }}
                    className="mr-2 mt-1 mb-2 rounded-md overflow-hidden border border-slate-700 shadow-lg aspect-[16/9] relative bg-slate-900 max-w-[200px]"
                >
                    {previewFrames.map((frame, index) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            key={frame}
                            src={`${BASE_PATH}${frame}`}
                            alt={`${name} preview`}
                            className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out ${index === currentFrame ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
