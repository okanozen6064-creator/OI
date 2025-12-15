"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { SplashScreen } from "@/components/splash-screen"
import { PricingSection } from "@/components/pricing-section"
import { ContactModal } from "@/components/contact-modal"
import { Marquee } from "@/components/marquee"

export default function Home() {
  const [isSplashComplete, setIsSplashComplete] = useState(false)

  return (
    <main className="min-h-screen bg-stone-50 selection:bg-stone-900 selection:text-white font-sans text-stone-900 overflow-x-hidden">
      <SplashScreen onComplete={() => setIsSplashComplete(true)} />

      <div className="relative z-0">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/50 backdrop-blur-md border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-2xl font-black tracking-tighter text-stone-900">OI</span>
            <div className="flex items-center gap-6">
              <a href="#pricing" className="text-sm font-medium text-stone-600 hover:text-stone-900 hidden sm:block">
                Hizmetler
              </a>
              <ContactModal>
                <button className="rounded-none border border-stone-900 bg-stone-900 px-5 py-2 text-sm font-bold text-white hover:bg-stone-800 transition-colors">
                  Projeyi Başlat
                </button>
              </ContactModal>
            </div>
          </div>
        </nav>

        {/* Editorial Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 px-6 lg:px-8 max-w-7xl mx-auto min-h-[85vh] flex flex-col justify-center">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -z-10 opacity-30 transform rotate-12 pointer-events-none">
            <div className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-stone-300/40 to-transparent rounded-full blur-3xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-3 border-b border-stone-300 pb-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-mono tracking-widest uppercase text-stone-500 font-semibold">Yeni projeler için uygun</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-stone-900 leading-[0.9] lg:leading-[0.85]">
                DİJİTAL <br />
                <span className="text-stone-300 selection:bg-stone-300 selection:text-white">MİMARİ</span><br />
                VE STRATEJİ.
              </h1>

              <p className="text-xl sm:text-2xl text-stone-600 max-w-2xl font-light leading-relaxed tracking-tight">
                Biz <strong className="font-semibold text-stone-900">Okan & İbrahim (OI)</strong>. Markalar için sadece web sitesi değil, yaşayan dijital ekosistemler tasarlıyoruz.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <ContactModal>
                  <button className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-none border-2 border-stone-900 bg-stone-900 px-10 font-medium text-stone-50 transition-all duration-300 hover:bg-transparent hover:text-stone-900">
                    <span className="mr-2 text-lg">Projeyi Başlat</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                </ContactModal>
                <a href="#pricing" className="inline-flex h-14 items-center justify-center rounded-none border-b-2 border-stone-300 px-6 font-medium text-stone-500 transition-colors hover:text-stone-900 hover:border-stone-900">
                  Paketleri İncele
                </a>
              </div>
            </div>

            {/* Right Abstract Stats/Visual */}
            <div className="lg:col-span-4 flex flex-col gap-12 lg:items-end lg:justify-end pb-4 opacity-100">
              <div className="hidden lg:block w-32 h-32 border border-stone-200 rounded-full relative animate-[spin_10s_linear_infinite]">
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-stone-900 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </motion.div>
        </section>

        <Marquee />

        {/* Modern Tech / Features Section */}
        <section className="py-24 bg-white/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">

              {/* Left Column: Typography Content */}
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold tracking-tight text-stone-900">Temiz Kod & Altyapı</h3>
                  <p className="mt-4 text-stone-600 leading-relaxed font-light">
                    Solid prensiplerine uygun, tamamen type-safe ve modüler bir mimari.
                    Next.js 14 App Router ile geleceğe hazır, geliştirilebilir sistemler kuruyoruz.
                  </p>
                  <div className="mt-4 flex gap-3 text-xs font-mono text-stone-400 uppercase tracking-widest">
                    <span>TypeScript</span>
                    <span>•</span>
                    <span>Server Components</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold tracking-tight text-stone-900">Estetik & Performans</h3>
                  <p className="mt-4 text-stone-600 leading-relaxed font-light">
                    Google Core Web Vitals uyumlu, ışık hızında açılış süreleri.
                    Kullanıcı deneyimini önceliklendiren, modern arayüzler.
                  </p>
                  <div className="mt-4 flex gap-3 text-xs font-mono text-stone-400 uppercase tracking-widest">
                    <span>Tailwind</span>
                    <span>•</span>
                    <span>Framer</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold tracking-tight text-stone-900">Veri Odaklı Büyüme</h3>
                  <p className="mt-4 text-stone-600 leading-relaxed font-light">
                    Sadece tasarım değil, ölçülebilir stratejiler.
                    Düzenli raporlama ve analiz ile dijital büyümeyi garanti altına alıyoruz.
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Visual Tech Representation */}
              <div className="relative lg:h-full flex items-center justify-center">
                <div className="relative w-full max-w-sm aspect-square bg-stone-100/50 rounded-full flex items-center justify-center border border-stone-200">
                  <div className="absolute inset-0 rounded-full border border-stone-200 animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-8 rounded-full border border-stone-200 animate-[spin_20s_linear_infinite_reverse]" />
                  <div className="absolute inset-16 rounded-full border border-stone-200 animate-[spin_10s_linear_infinite]" />

                  <div className="text-center space-y-2 z-10 p-8 bg-white/80 backdrop-blur rounded-full shadow-sm border border-stone-100">
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Powered By</p>
                    <div className="text-3xl font-black tracking-tighter text-stone-900">NEXT.JS 14</div>
                    <div className="text-sm font-medium text-stone-500 tracking-widest">TURBOPACK</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <PricingSection />

        <footer className="py-12 bg-stone-100 border-t border-stone-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl font-black tracking-tighter text-stone-400">OI</span>
          </div>
          <p className="text-sm text-stone-500 font-medium">
            © {new Date().getFullYear()} OI Digital Agency.
          </p>
        </footer>
      </div>
    </main>
  )
}
