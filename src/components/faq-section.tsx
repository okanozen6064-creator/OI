"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"

const faqs = [
    {
        question: "OI Agency Tam Olarak Kimdir?",
        answer: "Biz (Okan & İbrahim), minimalizm ve yüksek teknolojiyi harmanlayan, İstanbul merkezli butik bir dijital tasarım stüdyosuyuz. Karmaşık ajans hiyerarşileri yerine, doğrudan kurucularla çalıştığınız şeffaf bir süreç sunuyoruz."
    },
    {
        question: "Web sitem Google'da nasıl üst sıralarda çıkar?",
        answer: "Tüm projelerimizi Google Core Web Vitals standartlarına %100 uyumlu kodluyoruz. Temiz kod yapısı (Clean Code) ve doğru SEO stratejileriyle sitenizi arama motorlarının seveceği bir altyapıyla teslim ediyoruz."
    },
    {
        question: "Proje teslim süreniz nedir?",
        answer: "Projenin kapsamına göre değişmekle birlikte, standart bir kurumsal web sitesini 1-2 hafta içinde, daha kapsamlı otomasyon sistemlerini ise 3-4 hafta içinde yayına alıyoruz."
    },
    {
        question: "Sitemi daha sonra kendim güncelleyebilir miyim?",
        answer: "Kesinlikle. Size özel, kullanımı çok kolay bir yönetim paneli hazırlıyoruz. Kod bilginiz olmasa dahi içerikleri, görselleri ve blog yazılarını rahatlıkla güncelleyebilirsiniz."
    },
    {
        question: "Hangi sektörlerle çalışıyorsunuz?",
        answer: "Sektör ayırt etmiyoruz; ancak vizyonu olan, dijitaldeki varlığına değer veren ve 'premium' bir duruş sergilemek isteyen markalarla çalışmayı tercih ediyoruz."
    },
    {
        question: "Bakım ve güncelleme desteği veriyor musunuz?",
        answer: "Evet. Proje tesliminden sonra da yanınızdayız. Teknik bakım, güvenlik güncellemeleri ve içerik yönetimi için aylık destek paketlerimiz mevcuttur."
    },
    {
        question: "Size her an ulaşabilir miyim?",
        answer: "En büyük farkımız bu. WhatsApp üzerinden doğrudan Okan veya İbrahim ile iletişimde olursunuz. Aracı yok, bekleme müziği yok, anında dönüş var."
    },
    {
        question: "Tasarım tamamen bana özel mi olacak?",
        answer: "Asla hazır şablon (template) kullanmıyoruz. Markanızın kimliğine, hedef kitlesine ve stratejisine uygun, %100 özgün ve 'terzi işi' tasarımlar yapıyoruz."
    }
]

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
    return (
        <div className="border-b border-stone-200">
            <button
                onClick={onClick}
                className="flex w-full items-center justify-between py-6 text-left focus:outline-none group"
            >
                <span className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                    {question}
                </span>
                <span className="ml-6 flex-shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors">
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pb-6 text-stone-500 leading-relaxed">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="bg-stone-50 py-24 sm:py-32" id="faq">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left Column: Intro Text */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="h-px w-8 bg-stone-400"></span>
                            <span className="text-xs font-mono tracking-widest uppercase text-stone-500 font-semibold">S.S.S</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl mb-6">
                                Sıkça Sorulan Sorular
                            </h2>
                            <p className="text-stone-600 text-lg leading-relaxed">
                                Sıkça sorulan soruların cevaplarını burada derledik. Aklınıza takılan başka bir konu olursa lütfen iletişime geçmekten çekinmeyin. Size birkaç saat içinde dönüş yapacağımızdan emin olabilirsiniz!
                            </p>
                        </div>

                        <div className="pt-4 border-t border-stone-200">
                            <p className="font-serif italic text-stone-800 text-xl">
                                – Okan & İbrahim (OI)
                            </p>
                            <p className="text-sm font-mono text-stone-400 mt-1 uppercase tracking-wider">
                                Dijital Mimari ve Strateji
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="lg:col-span-7">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
