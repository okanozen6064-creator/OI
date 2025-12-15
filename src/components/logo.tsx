export function Logo({ className = "w-8 h-8", fontSize = "18" }: { className?: string, fontSize?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="32" height="32" rx="6" className="fill-stone-900" />
            <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-stone-50 font-sans"
                fontWeight="900"
                fontSize={fontSize}
                style={{ fontFamily: 'var(--font-geist-sans)' }} // Ensure it matches site font if possible
            >
                OI
            </text>
        </svg>
    )
}
