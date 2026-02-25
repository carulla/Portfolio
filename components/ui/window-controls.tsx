import { cn } from '@/lib/utils';

export function WindowControls({ className }: { className?: string }) {
    return (
        <div className={cn("flex gap-1.5", className)}>
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
        </div>
    );
}
