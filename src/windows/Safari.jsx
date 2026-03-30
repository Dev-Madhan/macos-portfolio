import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { blogPosts } from '#constants';
import useWindowStore from '#store/window';
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SafariWindow = () => {
    const { closeWindow } = useWindowStore();

    return (
        <div className="bg-[#ffffff] h-full flex flex-col font-mona select-none overflow-hidden rounded-xl shadow-2xl">
            {/* Safari Chrome / Toolbar */}
            <div id="window-header" className="window-header h-[52px] bg-[#f6f6f6] border-b border-gray-200/60 flex items-center px-4 gap-4">
                {/* Traffic Lights */}
                <div id="window-controls" className="flex gap-2 min-w-[70px]">
                    <div className="close" onClick={() => closeWindow("safari")}></div>
                    <div className="minimize"></div>
                    <div className="maximize"></div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4 text-gray-400">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </div>

                {/* Address Bar */}
                <div className="flex-1 max-w-xl mx-auto h-7 bg-white border border-gray-200/50 rounded-md shadow-sm flex items-center justify-center px-3">
                    <span className="text-[12px] font-medium text-gray-500 tracking-tight">sruthika.design/journal</span>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-4 text-gray-500">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
            </div>

            {/* List View Content using Shadcn */}
            <div className='flex-1 overflow-auto bg-white px-5 md:px-10 py-8 scrollbar-hide'>
                <div className="max-w-2xl mx-auto text-center">
                    <header className="mb-8">
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1.5">Journal</h1>
                        <p className="text-[14px] text-gray-400 font-medium tracking-tight opacity-70">Curated articles on interface design and digital strategies.</p>
                    </header>

                    <Separator className="bg-gray-100 mb-8" />

                    <div className="flex flex-col gap-2">
                        {blogPosts.map((post, index) => (
                            <div key={post.id} className="flex flex-col">
                                <a 
                                    href={post.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-5 rounded-xl hover:bg-gray-50/70 transition-colors duration-200 -mx-4 px-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[12px] text-gray-400 font-semibold tabular-nums w-4">
                                                0{index + 1}
                                            </span>
                                            <Badge variant="secondary" className="bg-gray-100/80 text-gray-600 hover:bg-gray-200 text-[10px] uppercase font-bold tracking-widest rounded-md border-0 pointer-events-none">
                                                UI Case Study
                                            </Badge>
                                            <span className="text-[12px] text-gray-400 font-medium">{post.date}</span>
                                        </div>
                                        <h3 className="text-[20px] font-bold text-gray-800 tracking-tight group-hover:text-pink-600 transition-colors duration-200 mt-1">
                                            {post.title}
                                        </h3>
                                    </div>
                                    <div className="hidden md:flex">
                                        <Button variant="outline" size="icon" className="group-hover:bg-white bg-transparent border-transparent group-hover:border-gray-200/60 shadow-none group-hover:shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 text-gray-500 rounded-full h-9 w-9">
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Button>
                                    </div>
                                </a>
                                {index < blogPosts.length - 1 && <Separator className="bg-gray-50 my-1" />}
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 flex justify-center opacity-70">
                        <Badge variant="outline" className="text-[10px] text-gray-400 font-bold uppercase tracking-widest border-gray-200/70 rounded-full px-4 py-1.5 shadow-sm pointer-events-none">
                            End of Journal — 2026
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WrappedSafari = WindowWrapper(SafariWindow, "safari");

export default WrappedSafari;
