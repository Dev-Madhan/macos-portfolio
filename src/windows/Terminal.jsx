import React from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { techStack } from '#constants';
import { Check, Flag } from 'lucide-react';
import useWindowStore from '#store/window';
import { motion } from 'framer-motion';

const Terminal = () => {
    const { closeWindow } = useWindowStore();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return <>
        <div id="window-header">
            <div id="window-controls">
                <div className="close" onClick={() => closeWindow("terminal")}></div>
                <div className="minimize"></div>
                <div className="maximize"></div>
            </div>
            <h2 className='font-mona'>Tech Stack</h2>
            <div className='w-20'></div> {/* Space balance */}
        </div>

        <motion.div
            className='techstack'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.p className='prompt' variants={itemVariants}>
                <span className='font-bold'>@sruthika % </span> show tech stack
                <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                    className="ms-1 text-gray-500 font-light"
                >
                    |
                </motion.span>
            </motion.p>

            <motion.div className='label' variants={itemVariants}>
                <p>Category</p>
                <p>Technologies</p>
            </motion.div>

            <ul className='content'>
                {techStack.map(({ category, items }) => (
                    <motion.li key={category} variants={itemVariants}>
                        <Check className='check' size={20} />
                        <h3>{category}</h3>
                        <ul>
                            {items.map((item, i) => (
                                <li key={i}>{item}{i < items.length - 1 ? "," : ""}</li>
                            ))}
                        </ul>
                    </motion.li>
                ))}
            </ul>

            <motion.div className='footnote' variants={itemVariants}>
                <p>
                    <Check size={18} /> {techStack.length} of {techStack.length} categories loaded successfully (100%)
                </p>
                <p className='text-gray-600 mt-1 !ms-0'>
                    <Flag size={14} fill="currentColor" />
                     Render time 6ms
                </p>
            </motion.div>
        </motion.div>
    </>
}

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;