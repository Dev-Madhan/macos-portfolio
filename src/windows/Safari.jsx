import React, { useState, useRef } from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { blogPosts } from '#constants';
import useWindowStore from '#store/window';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Share, LayoutGrid, List, RotateCw, Lock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const SafariWindow = () => {
    const { closeWindow } = useWindowStore();
    
    // UI References
    const contentRef = useRef(null);

    // Header States
    const [copied, setCopied] = useState(false);
    const [isGridView, setIsGridView] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleShare = () => {
        navigator.clipboard.writeText("https://sruthika.design/journal");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        
        // GSAP smooth blur timeline simulating deep native refresh
        gsap.to(contentRef.current, {
            opacity: 0.5,
            filter: "blur(4px)",
            y: 5,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(contentRef.current, {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 0.4,
                        ease: "power3.out",
                        onComplete: () => setIsRefreshing(false)
                    });
                }, 500);
            }
        });
    };

    return (
        <div className="bg-[#ffffff]/95 backdrop-blur-xl h-full flex flex-col font-mona select-none overflow-hidden rounded-xl shadow-2xl border border-white/20">
            {/* Safari Chrome / Toolbar */}
            <div id="window-header" className="window-header h-[52px] bg-[#f6f6f6]/95 backdrop-blur-md border-b border-gray-200/60 flex items-center px-4 gap-2 shrink-0 z-20">
                {/* Traffic Lights */}
                <div id="window-controls" className="flex gap-2 min-w-[70px]">
                    <button className="close" onClick={() => closeWindow("safari")} aria-label="Close Safari"></button>
                    <button className="minimize" aria-label="Minimize Safari"></button>
                    <button className="maximize" aria-label="Maximize Safari"></button>
                </div>

                {/* Left Navigation Actions */}
                <div className="hidden sm:flex items-center gap-1 text-gray-500">
                    <button className="p-1 rounded-md hover:bg-gray-200 transition-colors opacity-40 cursor-not-allowed" aria-label="Go Back">
                        <ChevronLeft size={16} strokeWidth={2} />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-200 transition-colors opacity-40 cursor-not-allowed" aria-label="Go Forward">
                        <ChevronRight size={16} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`p-1.5 ml-2 rounded-md transition-colors ${sidebarOpen ? 'bg-gray-200 text-black' : 'hover:bg-gray-200'}`}
                        aria-label="Toggle Sidebar"
                    >
                        <BookOpen size={15} strokeWidth={2} />
                    </button>
                </div>

                {/* Address Bar */}
                <div 
                    onClick={handleShare}
                    className="flex-1 max-w-[400px] md:max-w-xl mx-auto h-7 bg-white/80 border border-gray-200/50 rounded-md shadow-sm flex items-center justify-between px-2.5 overflow-hidden cursor-pointer hover:bg-white transition-colors group relative"
                >
                    <div className="w-4"></div> {/* Spacer for center alignment */}
                    
                    <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-80 transition-opacity">
                        <Lock size={12} className="text-gray-500" />
                        <span className="text-[12px] font-medium text-gray-600 tracking-tight truncate">sruthika.design/journal</span>
                    </div>

                    <button 
                        onClick={(e) => { e.stopPropagation(); handleRefresh(); }}
                        className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-700 transition-colors"
                        aria-label="Refresh Page"
                    >
                        <RotateCw size={12} strokeWidth={2.5} className={isRefreshing ? 'animate-spin text-blue-500' : ''} />
                    </button>
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center gap-1 text-gray-500 min-w-[70px] justify-end relative">
                    <button onClick={handleShare} className="p-1.5 hidden xs:block hover:bg-gray-200 rounded-md transition-colors" aria-label="Share">
                        <Share size={15} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={() => setIsGridView(!isGridView)}
                        className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
                        aria-label={isGridView ? "Switch to List View" : "Switch to Grid View"}
                    >
                        {isGridView ? <List size={16} strokeWidth={2} /> : <LayoutGrid size={15} strokeWidth={2} />}
                    </button>

                    {/* Copied Toast */}
                    <AnimatePresence>
                        {copied && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute top-10 right-0 bg-white shadow-xl border border-gray-200 rounded-lg p-2 text-xs text-black whitespace-nowrap z-50 pointer-events-none"
                            >
                                Link copied!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden bg-white/40">
                {/* Optional Reading List Sidebar */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 220, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-[#f6f6f6]/60 border-r border-gray-200/60 flex-shrink-0 overflow-y-auto custom-scrollbar"
                        >
                            <div className="p-4 w-[220px]">
                                <h3 className="font-bold text-xs text-gray-400 mb-3 uppercase tracking-wider">Reading List</h3>
                                <div className="flex flex-col gap-2">
                                    {blogPosts.map((post) => (
                                        <a href={post.link} target="_blank" rel="noopener noreferrer" key={post.id} className="text-[12px] font-medium text-gray-700 truncate hover:text-blue-600 transition-colors py-1.5 px-2 rounded hover:bg-gray-200/50">
                                            {post.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* List/Grid View Content */}
                <div className={`flex-1 overflow-auto bg-white px-4 sm:px-8 md:px-10 py-6 md:py-8 custom-scrollbar ${isRefreshing ? 'pointer-events-none' : ''}`}>
                    <div ref={contentRef} className="max-w-3xl mx-auto will-change-transform">
                        <header className="mb-6 md:mb-8 text-center sm:text-left">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight mb-1.5">Journal</h1>
                            <p className="text-[13px] md:text-[14px] text-gray-400 font-medium tracking-tight opacity-70">Curated articles on interface design and digital strategies.</p>
                        </header>

                        <Separator className="bg-gray-100 mb-6 md:mb-8" />

                        <motion.div layout className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4" : "flex flex-col pb-4"}>
                            <AnimatePresence>
                                {blogPosts.map((post, index) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                                        key={post.id} 
                                        className="flex flex-col relative"
                                    >
                                        <a 
                                            href={post.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className={`group flex ${isGridView ? 'flex-col gap-4 h-full justify-between border-2 border-gray-100/60 rounded-2xl p-5 bg-white shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-gray-200 hover:-translate-y-[2px]' : 'flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-4 md:py-5 rounded-2xl border-2 border-transparent hover:bg-gray-100/50 -mx-2 sm:-mx-4 px-2 sm:px-4'} transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                                        >
                                            <motion.div layout="position" className="flex flex-col gap-1 md:gap-2">
                                                <div className="flex items-center gap-3">
                                                    {!isGridView && (
                                                        <span className="text-[11px] md:text-[12px] text-gray-400 font-semibold tabular-nums w-4">
                                                            0{index + 1}
                                                        </span>
                                                    )}
                                                    <Badge variant="secondary" className="bg-gray-100/60 text-gray-500 group-hover:bg-gray-200/80 group-hover:text-gray-700 text-[9px] md:text-[10px] uppercase font-bold tracking-widest rounded-md border-0 pointer-events-none transition-colors duration-300">
                                                        UI Case Study
                                                    </Badge>
                                                    <span className="text-[11px] md:text-[12px] text-gray-400 font-medium group-hover:text-gray-500 transition-colors duration-300">{post.date}</span>
                                                </div>
                                                <h3 className={`font-bold text-gray-800 tracking-tight transition-colors duration-300 mt-1 ${isGridView ? 'text-[16px] leading-snug' : 'text-[18px] md:text-[20px]'}`}>
                                                    {post.title}
                                                </h3>
                                            </motion.div>
                                            
                                            <motion.div layout="position" className={`${isGridView ? 'mt-3 flex justify-end w-full' : 'hidden sm:flex'}`}>
                                                <Button variant="outline" size="icon" className={`${isGridView ? 'opacity-100 border-2 border-gray-200/60 bg-gray-50/50' : 'bg-transparent border-2 border-transparent opacity-0'} text-gray-400 group-hover:bg-white group-hover:border-gray-300 shadow-none group-hover:shadow-sm group-hover:opacity-100 group-hover:text-gray-600 transition-all duration-300 rounded-full h-8 w-8 md:h-9 md:w-9`}>
                                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isGridView ? 1.5 : 2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Button>
                                            </motion.div>
                                        </a>
                                        {(!isGridView && index < blogPosts.length - 1) && <Separator className="bg-gray-100/70 my-1 absolute bottom-0 left-0 right-0 z-10" />}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        <div className="mt-12 md:mt-20 flex justify-center opacity-70 pb-8">
                            <Badge variant="outline" className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest border-gray-200/70 rounded-md px-4 py-1.5 shadow-sm pointer-events-none">
                                End of Journal — 2026
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WrappedSafari = WindowWrapper(SafariWindow, "safari");

export default WrappedSafari;
