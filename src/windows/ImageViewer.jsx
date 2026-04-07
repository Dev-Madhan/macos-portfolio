import React, { useRef, useState, useEffect } from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { 
    ZoomIn, 
    ZoomOut, 
    RotateCw, 
    Share, 
    Info, 
    Sidebar,
    Crop,
    Edit3
} from 'lucide-react';
import useWindowStore from '#store/window';
import { formatBytes } from '#lib/utils';

const ImageViewer = ({ item }) => {
    const { closeWindow } = useWindowStore();
    const containerRef = useRef(null);
    const zoomLabelRef = useRef(null);
    const imgRef = useRef(null);
    
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageDetails, setImageDetails] = useState({
        width: 0,
        height: 0,
        size: item?.size || '...',
        created: item?.created || 'Today',
        colorSpace: 'RGB',
        alpha: 'No'
    });

    const handleImageLoad = (e) => {
        setIsImageLoaded(true);
        const { naturalWidth, naturalHeight } = e.target;
        setImageDetails(prev => ({
            ...prev,
            width: naturalWidth,
            height: naturalHeight
        }));
        
        // If item doesn't have size, try to fetch it (fallback)
        if (!item?.size) {
            fetch(item?.imageUrl, { method: 'HEAD' })
                .then(res => {
                    const size = res.headers.get('content-length');
                    if (size) {
                        setImageDetails(prev => ({ ...prev, size: formatBytes(size) }));
                    }
                })
                .catch(() => {
                    setImageDetails(prev => ({ ...prev, size: '2.4 MB' }));
                });
        }
    };

    useEffect(() => {
        setIsImageLoaded(false);
        setImageError(false);
        if (imgRef.current && imgRef.current.complete) {
            handleImageLoad({ target: imgRef.current });
        }
    }, [item?.imageUrl]);

    const showZoomLabel = () => {
        if (zoomLabelRef.current) {
            gsap.killTweensOf(zoomLabelRef.current);
            gsap.fromTo(zoomLabelRef.current, 
                { opacity: 0, y: 10, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
            );
            gsap.to(zoomLabelRef.current, {
                opacity: 0,
                y: -10,
                scale: 0.9,
                duration: 0.3,
                delay: 1.5,
                ease: "power2.in"
            });
        }
    };

    const handleZoomIn = () => {
        setZoom(prev => {
            const newZoom = Math.min(prev + 0.25, 4);
            showZoomLabel();
            return newZoom;
        });
    };

    const handleZoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.25, 0.25);
            showZoomLabel();
            return newZoom;
        });
    };

    const handleRotate = () => {
        setRotation(prev => prev + 90);
    };

    const handleShare = () => {
        setShowShare(true);
        setTimeout(() => setShowShare(false), 2000);
    };

    return (
        <div className="bg-[#ffffff]/95 backdrop-blur-xl h-full flex flex-col font-inter select-none overflow-hidden rounded-xl shadow-2xl border border-white/20">
            {/* macOS Preview Toolbar */}
            <div id="window-header" className="window-header h-[52px] border-b border-gray-200/60 flex items-center px-4 gap-4 shrink-0 bg-[#f6f6f6]/90">
                {/* Traffic Lights */}
                <div id="window-controls" className="flex gap-2 min-w-[70px]">
                    <button className="close" onClick={() => closeWindow("imgfile")} aria-label="Close Preview" title="Close" />
                    <button className="minimize" aria-label="Minimize Preview" title="Minimize" />
                    <button className="maximize" aria-label="Maximize Preview" title="Maximize" />
                </div>

                {/* File Title */}
                <div className="flex-1 flex justify-center text-center mx-2 h-full items-center pointer-events-none">
                    <div className="flex flex-col items-center leading-tight">
                        <span className="text-[13px] font-bold text-gray-700 tracking-tight truncate max-w-[200px]">
                            {item?.name || 'Preview'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                            {item?.fileType?.toUpperCase() || 'IMAGE'} — {imageDetails.size} — {imageDetails.width > 0 ? `${imageDetails.width} × ${imageDetails.height}` : 'Calculating...'}
                        </span>
                    </div>
                </div>

                {/* Preview Actions Group */}
                <div className="flex items-center gap-1 text-gray-500 relative">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={`p-1.5 rounded-md transition-colors ${isSidebarOpen ? 'bg-gray-200 text-black' : 'hover:bg-gray-200'}`}
                        aria-label="Toggle Thumbnails"
                    >
                        <Sidebar size={15} strokeWidth={2} />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                    <button onClick={handleZoomOut} className="p-1.5 hover:bg-gray-200 rounded-md transition-colors" aria-label="Zoom Out">
                        <ZoomOut size={16} strokeWidth={2} />
                    </button>
                    <button onClick={handleZoomIn} className="p-1.5 hover:bg-gray-200 rounded-md transition-colors" aria-label="Zoom In">
                        <ZoomIn size={16} strokeWidth={2} />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                    <button onClick={handleRotate} className="p-1.5 hover:bg-gray-200 rounded-md transition-colors" aria-label="Rotate Image">
                        <RotateCw size={15} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={() => setIsEditMode(!isEditMode)}
                        className={`p-1.5 rounded-md transition-colors ${isEditMode ? 'bg-gray-200 text-black' : 'hover:bg-gray-200'}`}
                        aria-label="Toggle Edit Mode"
                    >
                        <Edit3 size={15} strokeWidth={2} />
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 mx-1"></div>
                    <button onClick={handleShare} className="p-1.5 hover:bg-gray-200 rounded-md transition-colors" aria-label="Share Image">
                        <Share size={15} strokeWidth={2} />
                    </button>
                    <button 
                        onClick={() => setIsInfoOpen(!isInfoOpen)}
                        className={`p-1.5 rounded-md transition-colors ${isInfoOpen ? 'bg-gray-200 text-black' : 'hover:bg-gray-200'}`}
                        aria-label="Toggle Image Info"
                    >
                        <Info size={15} strokeWidth={2} />
                    </button>

                    <AnimatePresence>
                        {showShare && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute top-10 right-8 bg-white shadow-xl border border-gray-200 rounded-lg p-2 text-xs text-black whitespace-nowrap z-50 pointer-events-none"
                            >
                                Link copied to clipboard
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Edit Toolbar */}
            <AnimatePresence>
                {isEditMode && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 40, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#f6f6f6] border-b border-gray-200/60 flex items-center justify-center gap-6 shrink-0 overflow-hidden"
                    >
                        <span className="flex items-center gap-1.5 text-xs text-gray-600 font-medium cursor-pointer hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-200/70">
                            <Crop size={14} /> Crop
                        </span>
                        <div className="w-[1px] h-4 bg-gray-300"></div>
                        <span className="text-xs text-gray-600 font-medium cursor-pointer hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-200/70">Markup</span>
                        <span className="text-xs text-gray-600 font-medium cursor-pointer hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-200/70">Adjust Color</span>
                        <span className="text-xs text-gray-600 font-medium cursor-pointer hover:text-black transition-colors px-2 py-1 rounded hover:bg-gray-200/70">Adjust Size</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Layout */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 200, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-[#f0f0f0]/90 border-r border-gray-200/60 overflow-y-auto shrink-0 flex flex-col z-10 custom-scrollbar"
                        >
                            <div className="p-4 w-[200px]">
                                <h3 className="text-xs font-semibold text-gray-500 mb-3">Thumbnails</h3>
                                <div className="w-full aspect-square bg-white shadow-sm rounded-md border-2 border-blue-500 p-1 cursor-pointer">
                                    <img src={item?.imageUrl} alt="thumb" className="w-full h-full object-cover rounded-sm" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            {/* Image Canvas Area */}
            <div ref={containerRef} className="flex-1 bg-[#efefef] p-6 flex items-center justify-center relative overflow-hidden group">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    className="relative max-w-full max-h-full flex-center z-10"
                    layout
                >
                    <AnimatePresence>
                        {!isImageLoaded && !imageError && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#efefef]/50 backdrop-blur-[2px]"
                            >
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-400"></div>
                                <p className="mt-4 text-[13px] font-medium text-gray-400 animate-pulse">Opening image...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.img 
                        animate={{ 
                            scale: zoom, 
                            rotate: rotation,
                            ...(zoom <= 1 ? { x: 0, y: 0 } : {}),
                            opacity: isImageLoaded ? 1 : 0
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        src={item?.imageUrl} 
                        alt={item?.name}
                        ref={imgRef}
                        onLoad={handleImageLoad}
                        onError={() => setImageError(true)}
                        style={{ transformOrigin: 'center center' }}
                        className="max-w-full max-h-[calc(100vh-250px)] rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white object-contain border border-white/40 pointer-events-none transition-opacity duration-300"
                    />
                    
                    {/* Floating Zoom Label (animated by GSAP) */}
                    <div 
                        ref={zoomLabelRef}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-white font-medium opacity-0 pointer-events-none"
                    >
                        {Math.round(zoom * 100)} %
                    </div>
                </motion.div>
                
                {/* Secondary Image Background (blurred behind main image for depth) */}
                <div className="absolute inset-0 z-0 overflow-hidden opacity-10 blur-3xl pointer-events-none scale-125">
                     <img 
                        src={item?.imageUrl} 
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

                {/* Info Sidebar */}
                <AnimatePresence>
                    {isInfoOpen && (
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 250, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="bg-[#f6f6f6]/95 backdrop-blur-md border-l border-gray-200/60 overflow-y-auto shrink-0 z-10 custom-scrollbar"
                        >
                            <div className="p-4 w-[250px] flex flex-col gap-4 text-xs">
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">General Information</h3>
                                    <div className="p-3 bg-white rounded-md border border-gray-200 shadow-sm flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Name</span>
                                            <span className="font-medium truncate ml-2 text-right max-w-[120px]">{item?.name || 'Image'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Kind</span>
                                            <span className="font-medium">{item?.fileType?.toUpperCase() || 'JPEG'} Image</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Size</span>
                                            <span className="font-medium">{imageDetails.size}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Created</span>
                                            <span className="font-medium">{imageDetails.created}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">More Info</h3>
                                    <div className="p-3 bg-white rounded-md border border-gray-200 shadow-sm flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Dimensions</span>
                                            <span className="font-medium">{imageDetails.width} × {imageDetails.height}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Color Space</span>
                                            <span className="font-medium">RGB</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Alpha Channel</span>
                                            <span className="font-medium text-gray-400">{(item?.fileType?.toLowerCase() === 'png' || item?.fileType?.toLowerCase() === 'webp') ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Navigation / Bottom Indicator */}
            <div className="h-4 bg-[#f6f6f6] shrink-0 border-t border-gray-200/60 flex items-center justify-center">
                <div className="w-1/3 max-w-[100px] h-1 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
};

export default WindowWrapper(ImageViewer, 'imgfile');
