import React from 'react'
import gsap from 'gsap';
import { Dock, Navbar, Welcome, Home, LockScreen } from '#components'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import { Draggable } from 'gsap/Draggable';
import { Terminal, Safari, Resume, Finder, ImageViewer, TextFile, Contact, Photos, Archive } from '#windows';
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main id="main-screen">
      <LockScreen />
      <Navbar />
      <motion.div
        className="size-full absolute inset-0"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Home />
        <Welcome />
      </motion.div>
      <Dock />

      <div className='hidden md:block'>
        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <ImageViewer />
        <TextFile />
        <Contact />
        <Photos />
        <Archive />
      </div>
    </main>
  )
}

export default App