import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { projects } from '#constants';
import useWindowStore from '#store/window';

const FinderWindow = () => {
    const { closeWindow } = useWindowStore();

    return (
        <div className="bg-[#ffffff]/95 backdrop-blur-3xl h-full flex flex-col font-mona select-none overflow-hidden rounded-xl shadow-2xl">
            {/* Finder Header / Toolbar */}
            <div className="window-header h-[52px] bg-[#f2f1f0] border-b border-gray-200/60 flex items-center px-4 gap-6">
                {/* Traffic Lights */}
                <div id="window-controls" className="flex gap-2 min-w-[70px]">
                    <button className="close" onClick={() => closeWindow("finder")}></button>
                    <button className="minimize"></button>
                    <button className="maximize"></button>
                </div>

                {/* Toolbar Items */}
                <div className="flex items-center gap-5 text-[#4d4d4d]">
                    <div className="flex items-center gap-2">
                        <svg className="size-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <svg className="size-5 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <span className="text-[14px] font-bold tracking-tight">Projects</span>
                </div>

                {/* Search Bar / Right Side */}
                <div className="flex-1 flex justify-end gap-4">
                    <div className="w-48 h-7 bg-white/50 border border-gray-200/50 rounded-md flex items-center px-2 gap-2">
                        <svg className="size-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-[12px] text-gray-400 font-medium">Search</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-[#f2f1f0]/80 border-r border-gray-200/40 p-4 space-y-6">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">Favorites</h4>
                        <div className="flex items-center gap-2 p-1.5 bg-blue-500/10 text-blue-600 rounded-md">
                            <div className="size-4 bg-blue-500 rounded-sm" />
                            <span className="text-[12px] font-bold tracking-tight">Recents</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 text-gray-600 hover:bg-gray-200/50 rounded-md transition-colors">
                            <div className="size-4 bg-gray-400 rounded-sm" />
                            <span className="text-[12px] font-bold tracking-tight">Applications</span>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 text-gray-600 hover:bg-gray-200/50 rounded-md transition-colors">
                            <div className="size-4 bg-yellow-500 rounded-sm" />
                            <span className="text-[12px] font-bold tracking-tight">Downloads</span>
                        </div>
                    </div>
                </div>

                {/* File Grid */}
                <div className="flex-1 bg-white p-6 overflow-auto scrollbar-hide">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {projects.map((project) => (
                            <a 
                                key={project.id} 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-blue-50/50 transition-all duration-300"
                            >
                                <div className="size-20 bg-gray-50 rounded-2xl border border-black/5 shadow-sm p-3 relative group-hover:shadow-md transition-all">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="size-full object-contain filter group-hover:scale-110 transition-transform duration-500" 
                                    />
                                    {/* Small Project Indicator */}
                                    <div className="absolute -bottom-1 -right-1 size-5 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all">
                                        <svg className="size-2.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-8 9z" />
                                        </svg>
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-gray-700 text-center leading-tight max-w-[80px] group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </span>
                                <span className="text-[9px] font-extrabold text-gray-300 uppercase tracking-widest">{project.category}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="h-6 bg-[#f2f1f0] border-t border-gray-200/60 flex items-center justify-center px-4">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest">{projects.length} items, 1.4 GB available</span>
            </div>
        </div>
    );
};

const WrappedFinder = WindowWrapper(FinderWindow, "finder");

export default WrappedFinder;
