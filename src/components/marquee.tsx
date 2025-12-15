"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const images = [
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",
    "/7.png",
    "/8.png",
    "/9.png",
]

export function Marquee() {
    return (
        <div className="w-full overflow-hidden py-10">
            <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    className="flex flex-nowrap gap-16"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    style={{ width: "max-content" }}
                >
                    {/* We duplicate the array twice to ensure seamless looping on large screens */}
                    {[...images, ...images].map((src, index) => (
                        <div
                            key={index}
                            className="relative flex h-16 w-[160px] flex-shrink-0 items-center justify-center"
                        >
                            <Image
                                src={src}
                                alt={`Referans ${index + 1}`}
                                fill
                                className="object-contain grayscale transition duration-300 hover:grayscale-0 opacity-60 hover:opacity-100"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
