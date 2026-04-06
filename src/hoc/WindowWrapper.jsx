import useWindowStore from '#store/window'
import React, { useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
// eslint-disable-next-line no-unused-vars
import gsap from 'gsap'; 
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const focusWindow = useWindowStore((state) => state.focusWindow);
        const isOpen = useWindowStore((state) => state.windows[windowKey].isOpen);
        const zIndex = useWindowStore((state) => state.windows[windowKey].zIndex);
        const data = useWindowStore((state) => state.windows[windowKey].data);
        const ref = useRef(null);

        useGSAP(() => {
            if (isOpen && ref.current) {
                const dr = Draggable.create(ref.current, {
                    type: "top,left",
                    bounds: "#main-screen",
                    handle: ref.current.querySelector(".window-header"),
                    dragClickables: false, // Ensure clicks on buttons inside translate to the close function
                    onPress: () => focusWindow(windowKey),
                    zIndexBoost: false
                });
                return () => dr[0].kill();
            }
        }, [isOpen]);

        return (
            <AnimatePresence>
                {isOpen && (
                    <section
                        id={windowKey}
                        ref={ref}
                        style={{ zIndex }}
                        className="absolute"
                    >
                        <motion.div
                            className="size-full"
                            initial={{ opacity: 0, scale: 0.94, filter: "blur(4px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ 
                                opacity: 0, 
                                scale: 0.97, 
                                filter: "blur(4px)",
                                transition: { duration: 0.13, ease: "easeOut" } 
                            }}
                            transition={{ 
                                duration: 0.32, 
                                ease: [0.22, 1, 0.36, 1] 
                            }}
                        >
                            <Component {...props} item={data} />
                        </motion.div>
                    </section>
                )}
            </AnimatePresence>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`

    return Wrapped;
}

export default WindowWrapper