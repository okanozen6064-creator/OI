"use client"

import { motion } from "framer-motion"
import { Sparkles, TrendingUp, Handshake } from "lucide-react"

const features = [
    {
        title: "Kişiye Özel İlgi",
        description: "Ekibimizle doğrudan çalışmak, projenizin hak ettiği odaklanmış ve bireysel ilgiyi görmesini garanti eder. Vizyonunuzu, hedeflerinizi ve zorluklarınızı derinlemesine anlayarak, web sitenizin ve markanızın iş kimliğinizi tam olarak yansıtmasını sağlıyoruz. Bizim için asla 'sıradan bir müşteri' değilsiniz; başarınız, bizim görevimizdir.",
        icon: Handshake
    },
    {
        title: "Ulaşılabilir Çözümler",
        description: "Seçkin müşterilere hitap etsek de, en iyi işletmelerin bile bütçelere sadık kalması gerektiğini biliyoruz. Butik yapımız, kaliteden veya sofistike duruştan ödün vermeden rekabetçi fiyatlar sunmamıza olanak tanır. Optimize edilmiş giderlerimiz, yüksek kaliteli tasarım ve marka hizmetlerini ulaşılabilir fiyatlarla sunmamızı sağlar.",
        icon: TrendingUp
    },
    {
        title: "Uzmanlık ve Esneklik",
        description: "Dijital pazarlamadaki deneyimimiz, bize benzersiz bir uzmanlık ve çok yönlü bir beceri seti kazandırıyor. Değişen ihtiyaçlarınıza hızla uyum sağlamaya hazır, çevik ve duyarlıyız. Amacımız, sadece şık görünen değil, aynı zamanda işletmeniz için önemli bir büyüme ve etkileşim sağlayan bir web sitesi ve marka yaratmaktır.",
        icon: Sparkles
    }
]

export function WhyChooseUs() {
    return (
        <section className="bg-white py-24 sm:py-32 border-t border-stone-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base font-semibold leading-7 text-stone-500 uppercase tracking-widest">Farkımız</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                        Neden Butik Hizmetlerimizi Seçmelisiniz?
                    </p>
                </div>
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-start"
                            >
                                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-900">
                                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-bold leading-7 text-stone-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-4 flex-auto text-base leading-7 text-stone-600 font-light">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
