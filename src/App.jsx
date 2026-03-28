import { Navbar, Welcome } from '#components'
import React from 'react'
import { motion } from 'framer-motion'

const App = () => {
  return (
    <main>
      <Navbar />
      <motion.div
        className="size-full absolute inset-0"
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Welcome />
      </motion.div>
    </main>
  )
}

export default App