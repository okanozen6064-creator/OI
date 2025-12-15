"use client"

import { Check } from "lucide-react"
import { ContactModal } from "./contact-modal"

const tiers = [
    {
        name: "Dijital Vitrin",
        id: "tier-vitrin",
        price: "5.000 ₺",
        suffix: "Tek Seferlik",
        description: "Markanız için modern ve profesyonel bir başlangıç.",
        features: [
            "Modern Web Sitesi Tasarımı",
            "1 Yıl Domain & Hosting Hediye",
            "Tam Mobil Uyumluluk",
            "Temel SEO Optimizasyonu",
            "WhatsApp Entegrasyonu",
        ],
        note: "Yıllık Yenileme: Güncel Kurdan",
        cta: "Teklif Al",
    },
    {
        name: "Otomasyon Sistemi",
        id: "tier-otomasyon",
        price: "12.500 ₺",
        suffix: "Tek Seferlik",
        description: "İşletmenizin yükünü hafifleten akıllı sistemler.",
        features: [
            "Her şey dahil (Dijital Vitrin)",
            "Gelişmiş Rezervasyon Sistemi",
            "Otomatik E-posta/SMS Bildirimleri",
            "2 Yıl Hosting Hediye",
            "Google Maps İşletme Kaydı",
            "Özel Yönetim Paneli",
        ],
        cta: "Teklif Al",
        featured: true,
    },
    {
        name: "360° Büyüme Partneri",
        id: "tier-partner",
        price: "15.000 ₺",
        suffix: "+ 5.000 ₺/Ay",
        subPrice: "Kurulum Bedeli",
        description: "Tam kapsamlı dijital yönetim ve büyüme operasyonu.",
        features: [
            "Full Web & İçerik Yönetimi",
            "Sosyal Medya (Haftalık 3 Post + 2 Story)",
            "Düzenli Reklam Yönetimi (Meta/Google)",
            "Detaylı Aylık Raporlama",
            "7/24 Öncelikli Destek",
            "Rakip Analizi & Strateji",
        ],
        cta: "Partner Olun",
    },
]

export function PricingSection() {
    return (
        <div className="bg-white py-24 sm:py-32" id="pricing">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl">
                        Basit, Şeffaf Fiyatlandırma
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        İşletmenizin ihtiyacına en uygun paketi seçin, gerisini profesyonellere bırakın.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md ${tier.featured ? "border-slate-900 shadow-md ring-1 ring-slate-900" : "border-slate-200"
                                }`}
                        >
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold leading-8 text-slate-900">
                                    {tier.name}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {tier.description}
                                </p>
                            </div>
                            <div className="mb-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-slate-900">
                                    {tier.price}
                                </span>
                                {tier.suffix && (
                                    <span className="text-sm font-semibold leading-6 text-slate-500">
                                        {tier.subPrice ? `(${tier.subPrice}) ${tier.suffix}` : tier.suffix}
                                    </span>
                                )}
                            </div>
                            <ul role="list" className="mb-8 space-y-3 text-sm leading-6 text-slate-600 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-5 w-5 flex-none text-slate-900" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                                {tier.note && (
                                    <li className="flex gap-x-3 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-100">
                                        * {tier.note}
                                    </li>
                                )}
                            </ul>
                            <ContactModal>
                                <button
                                    className={`mt-auto block w-full rounded-md px-3 py-2.5 text-center text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:opacity-90 transition-opacity ${tier.featured
                                            ? "bg-slate-900 text-white focus-visible:outline-slate-900"
                                            : "bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    {tier.cta}
                                </button>
                            </ContactModal>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
