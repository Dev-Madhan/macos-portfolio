import useWindowStore from '#store/window'
import React, { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(() => {
            if (isOpen && ref.current) {
                const dr = Draggable.create(ref.current, {
                    type: "top,left",
                    bounds: "#main-screen",
                    handle: "#window-header",
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
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            transition={{ 
                                duration: 0.15,
                                ease: [0.12, 0, 0.39, 0]
                            }}
                        >
                            <Component {...props} />
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