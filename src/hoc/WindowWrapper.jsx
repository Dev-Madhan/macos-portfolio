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
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex, data } = windows[windowKey];
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
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            transition={{ 
                                duration: 0.3,
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