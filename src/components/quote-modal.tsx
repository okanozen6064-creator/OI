"use client"

import * as React from "react"
import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, CheckCircle, Loader2, Phone, MessageCircle, User, Mail, MessageSquare, Instagram, Linkedin, Globe, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            "fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "fixed left-[50%] top-[50%] z-[60] grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] overflow-hidden bg-stone-950 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl border border-stone-800",
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="absolute right-4 top-4 z-50 rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/* Custom Quote Form Content */
export function QuoteModal({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        serviceNeeded: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        full_name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        service_needed: formData.serviceNeeded
                    }
                ])

            if (error) throw error

            setSuccess(true)
            // Optional: Reset form after success
            // setFormData({ fullName: "", email: "", phone: "", serviceNeeded: "" }) 
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya bizi arayın.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-7xl w-[95vw] md:w-full mx-auto max-h-[90vh] overflow-y-auto">
                <div className="relative bg-[#FAFAF9] w-full rounded-2xl md:rounded-[2rem] shadow-2xl flex flex-col border border-stone-200 overflow-hidden">

                    {/* Background Architectural Wireframe - Minimalist */}
                    <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply pointer-events-none">
                        <img
                            src="/light-wireframe-bg.png"
                            alt="Architectural Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-5 md:p-12 lg:p-16 flex flex-col items-center w-full">

                        <div className="text-center mb-8 md:mb-12 space-y-2 md:space-y-4">
                            <h2 className="text-3xl md:text-7xl font-black tracking-tighter text-stone-900 leading-[0.9]">
                                PROJEYİ <br className="hidden md:block" />
                                <span className="text-stone-400">BAŞLATALIM</span>
                            </h2>
                            <p className="text-stone-500 text-sm md:text-lg uppercase tracking-widest font-medium">
                                Dijital Mimari & Strateji
                            </p>
                        </div>

                        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">

                            {/* LEFT: Form Card */}
                            <div className="lg:col-span-6 w-full">
                                <div className="bg-white rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-stone-100 p-6 md:p-8 lg:p-10 relative overflow-hidden group">
                                    {/* Orange accent line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>

                                    <h3 className="text-xl md:text-2xl font-bold text-stone-900 mb-6 md:mb-8 flex items-center gap-3">
                                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                        Bize Mesaj Gönderin
                                    </h3>

                                    {success ? (
                                        <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
                                                <CheckCircle className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-stone-900 mb-2">Talebiniz Alındı!</h3>
                                            <p className="text-stone-500">En kısa sürede sizinle iletişime geçeceğiz.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                            {/* SQL Injection Note: Supabase client automatically parameterizes queries, preventing SQL injection. */}

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                {/* Name Input */}
                                                <div className="group/input">
                                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block">Ad Soyad</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Adınız Soyadınız"
                                                        className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 focus:border-stone-900 rounded-lg outline-none transition-all font-medium text-stone-900 placeholder:text-stone-300"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    />
                                                </div>

                                                {/* Phone Input */}
                                                <div className="group/input">
                                                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block">Telefon</label>
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="05XX..."
                                                        className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 focus:border-stone-900 rounded-lg outline-none transition-all font-medium text-stone-900 placeholder:text-stone-300"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className="group/input">
                                                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block">E-posta</label>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="ornek@sirket.com"
                                                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 focus:border-stone-900 rounded-lg outline-none transition-all font-medium text-stone-900 placeholder:text-stone-300"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            {/* Service Input */}
                                            <div className="group/input">
                                                <label className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 block">Proje Detayları</label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Nasıl bir projeye ihtiyacınız var?"
                                                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-100 focus:border-stone-900 rounded-lg outline-none transition-all font-medium text-stone-900 placeholder:text-stone-300 resize-none"
                                                    value={formData.serviceNeeded}
                                                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-stone-900/10 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base uppercase tracking-widest"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Gönderiliyor...
                                                    </>
                                                ) : (
                                                    "Teklif Alın"
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT: Info Side */}
                            <div className="lg:col-span-6 flex flex-col justify-center space-y-8 md:space-y-12 pt-4 lg:pt-4">

                                {/* Intro Text */}
                                <div className="space-y-4 md:space-y-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-stone-900 leading-tight">
                                        Hayalinizdeki Projeyi <br />
                                        <span className="text-orange-600">Gerçeğe Dönüştürelim.</span>
                                    </h3>
                                    <p className="text-stone-600 leading-relaxed text-base md:text-lg max-w-lg border-l-2 border-stone-200 pl-4 md:pl-6">
                                        Markanız için sadece bir web sitesi değil, yaşayan ve büyüyen bir <strong className="text-stone-900">dijital ekosistem</strong> tasarlıyoruz.
                                    </p>
                                </div>

                                {/* Contact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/905013046064"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-white border border-stone-200 p-4 md:p-6 rounded-xl hover:shadow-lg hover:border-emerald-200 transition-all flex flex-col gap-2 md:gap-3"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MessageCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-stone-900 font-bold text-base">WhatsApp</h4>
                                            <p className="text-stone-500 text-sm">Hızlı İletişim & Destek</p>
                                        </div>
                                    </a>

                                    {/* Location */}
                                    <div className="group bg-white border border-stone-200 p-4 md:p-6 rounded-xl hover:shadow-lg hover:border-orange-200 transition-all flex flex-col gap-2 md:gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-stone-900 font-bold text-base">Konum</h4>
                                            <p className="text-stone-500 text-xs font-mono mt-1 tracking-tight">36°44'02.1"N 29°55'07.5"E</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Minimal Footer */}
                                <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-stone-500 text-sm font-medium">Yeni projeler için müsaitiz</span>
                                    </div>
                                    <div className="flex gap-4 opacity-60 hover:opacity-100 transition-opacity">
                                        <a href="#" className="text-stone-900"><Instagram className="w-5 h-5" /></a>
                                        <a href="#" className="text-stone-900"><Linkedin className="w-5 h-5" /></a>
                                        <a href="#" className="text-stone-900"><Globe className="w-5 h-5" /></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
