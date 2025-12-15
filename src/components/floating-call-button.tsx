"use client"

import { Phone } from "lucide-react"

export function FloatingCallButton() {
    return (
        <a
            href="tel:+905013046064"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
            aria-label="Bizi Arayın"
        >
            <Phone className="h-6 w-6 fill-current animate-pulse lg:animate-none" />
            <span className="hidden group-hover:block ml-3 font-bold whitespace-nowrap overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                +90 501 304 60 64
            </span>
        </a>
    )
}
