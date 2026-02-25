"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface AnimatedPreviewProps {
    frames: string[];
    slug: string;
}

export function AnimatedPreview({ frames, slug }: AnimatedPreviewProps) {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Clean up paths: React/Next uses public paths relative to root, e.g., /web-apps-frames/coupe/...
    const validFrames = frames.length > 0;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isPlaying && validFrames) {
            interval = setInterval(() => {
                setCurrentFrame((prev) => (prev + 1) % frames.length);
            }, 1000); // 1 second per frame - adjust speed if needed
        }

        return () => clearInterval(interval);
    }, [isPlaying, frames.length, validFrames]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative group">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none z-10" />

            <div className="w-full aspect-[16/9] bg-slate-900 flex items-center justify-center relative overflow-hidden">
                {validFrames ? (
                    <>
                        {frames.map((frame, index) => (
                            <Image
                                key={frame}
                                src={frame}
                                alt={`${slug} preview frame ${index + 1}`}
                                fill
                                className={`object-contain transition-opacity duration-300 ${index === currentFrame ? "opacity-100" : "opacity-0"
                                    }`}
                                priority={index === 0}
                            />
                        ))}
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-background-dark grid-bg opacity-50 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">No Preview Frames</span>
                    </div>
                )}

                {/* Play/Pause Button Overlay on Hover */}
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/5 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                >
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white/90 hover:text-white hover:bg-white/20 transition-all transform hover:scale-110 shadow-xl">
                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </div>
                </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/90 backdrop-blur-sm flex justify-between items-center border-t border-slate-200 dark:border-slate-800 relative z-20">
                <div>
                    <p className="font-bold text-sm tracking-tight">{slug}-preview.ts</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex h-2 w-2 relative">
                            {isPlaying && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        </span>
                        <p className="text-xs text-slate-500 font-mono">
                            {currentFrame + 1} / {Math.max(frames.length, 1)} frames {isPlaying ? '(Playing)' : '(Paused)'}
                        </p>
                    </div>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
                    1000ms
                </div>
            </div>
        </div>
    );
}
