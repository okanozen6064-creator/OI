"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"



export function SplashScreen({ onComplete }: { onComplete?: () => void }) {
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Total duration before initiating exit: 0.5s (enter) + 1.5s (stay) = 2.0s
        const timer = setTimeout(() => {
            setShow(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence
            onExitComplete={() => {
                if (onComplete) onComplete()
            }}
        >
            {show && (
                <motion.div
                    key="splash"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        opacity: 1, // Keep opacity to mask content while sliding
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }, // Smooth ease
                    }}
                >
                    <motion.h1
                        className="text-9xl font-bold tracking-tighter text-stone-900"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.8, ease: "easeOut" },
                        }}
                    >
                        OI
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
