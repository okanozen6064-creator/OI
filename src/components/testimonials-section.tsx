"use client"

import { Star } from "lucide-react"

const testimonials = [
    {
        name: "Emre Yılmaz",
        date: "15/11/2024",
        initial: "E",
        color: "bg-orange-100 text-orange-600",
        text: "Dürüst olmak gerekirse, web sitesi için arayışa girdiğimizde bu kadarını beklemiyordum. Sadece 'iş görsün yeter' diyorduk. Ama Okan ve İbrahim bizi şaşırttı. Yeni site harika görünüyor, inanılmaz hızlı açılıyor ve müşterilerimiz aradıklarını hemen bulabiliyor.",
    },
    {
        name: "Selin Kaya",
        date: "02/12/2024",
        initial: "S",
        color: "bg-emerald-100 text-emerald-600",
        text: "Eski sitemiz sanki 2010'dan kalma gibiydi, hem de kötü anlamda. OI Agency aldı, baştan aşağı yeniledi. Şimdi marka kimliğimizi tam yansıtıyor. En önemlisi mobilde kusursuz çalışıyor, eskiden bu büyük bir sorundu bizim için.",
    },
    {
        name: "Burak Demir",
        date: "10/12/2024",
        initial: "B",
        color: "bg-blue-100 text-blue-600",
        text: "Yeni sitemizi yayına aldık ve tepkiler muazzam. OI Agency, karmaşık iş yapımızı alıp çok sade ve anlaşılır bir vitrine dönüştürdü. Kullanıcıların siteyle etkileşimi gözle görülür şekilde arttı. Kesinlikle tavsiye ediyorum.",
    },
]

function GoogleIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
            />
            <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
            />
            <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26..81-.58z"
                fill="#FBBC05"
            />
            <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
            />
        </svg>
    )
}

export function TestimonialsSection() {
    return (
        <section className="bg-stone-950 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-left sm:text-center">
                        <span className="opacity-50">Önce İnsan,</span> <br className="sm:hidden" />
                        <span>Her Zaman.</span>
                    </h2>
                </div>

                <div className="mx-auto grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-between bg-white rounded-2xl p-8 shadow-xl border border-stone-800/10 h-full"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold ${testimonial.color}`}>
                                        {testimonial.initial}
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-900">{testimonial.name}</div>
                                        <div className="text-xs text-stone-400 font-medium">{testimonial.date}</div>
                                    </div>
                                </div>

                                <p className="text-stone-600 leading-relaxed text-sm mb-8">
                                    "{testimonial.text}"
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between">
                                <div className="font-semibold text-sm text-stone-900 cursor-pointer hover:underline">
                                    Devamını Oku
                                </div>
                                <div className="flex items-center gap-2">
                                    <GoogleIcon />
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
