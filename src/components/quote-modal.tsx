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
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-7xl w-full mx-4">
                <div className="relative bg-stone-950 w-full overflow-hidden rounded-3xl shadow-2xl min-h-[650px] flex flex-col border border-stone-800">

                    {/* Background Wireframe Image - Bottom */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/dark-wireframe-bg.png"
                            alt="Digital Landscape"
                            className="w-full h-full object-cover opacity-40 mix-blend-screen"
                        />
                        {/* Gradient overlay to fade edges */}
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/90"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-8 md:p-12 lg:p-20 flex flex-col items-center w-full">

                        <div className="text-center mb-16 space-y-2">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                                PROJEYİ <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">BAŞLATALIM</span>
                            </h2>
                            <p className="text-stone-400 text-lg uppercase tracking-[0.2em] font-medium">
                                Geleceği Birlikte Tasarlayalım
                            </p>
                        </div>

                        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                            {/* LEFT: Form Card */}
                            <div className="lg:col-span-6 w-full">
                                <div className="bg-stone-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/5 p-8 lg:p-10 transform transition-all hover:border-orange-500/30 group">
                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-gradient-to-b from-orange-500 to-amber-600 rounded-full"></span>
                                        Bize Mesaj Gönderin
                                    </h3>

                                    {success ? (
                                        <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-[0_0_30px_-5px_rgba(74,222,128,0.3)]">
                                                <CheckCircle className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Talebiniz Alındı!</h3>
                                            <p className="text-stone-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Name Input */}
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-4 text-stone-500 group-focus-within/input:text-orange-500 transition-colors">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Adınız Soyadınız"
                                                        className="w-full pl-12 pr-4 py-4 bg-stone-950/50 border border-stone-800 rounded-xl outline-none focus:border-orange-500 focus:bg-stone-900/80 transition-all font-medium text-stone-200 placeholder:text-stone-600"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    />
                                                </div>

                                                {/* Phone Input */}
                                                <div className="relative group/input">
                                                    <div className="absolute left-4 top-4 text-stone-500 group-focus-within/input:text-orange-500 transition-colors">
                                                        <Phone className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="Telefon No"
                                                        className="w-full pl-12 pr-4 py-4 bg-stone-950/50 border border-stone-800 rounded-xl outline-none focus:border-orange-500 focus:bg-stone-900/80 transition-all font-medium text-stone-200 placeholder:text-stone-600"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Input */}
                                            <div className="relative group/input">
                                                <div className="absolute left-4 top-4 text-stone-500 group-focus-within/input:text-orange-500 transition-colors">
                                                    <Mail className="w-5 h-5" />
                                                </div>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="E-posta Adresiniz"
                                                    className="w-full pl-12 pr-4 py-4 bg-stone-950/50 border border-stone-800 rounded-xl outline-none focus:border-orange-500 focus:bg-stone-900/80 transition-all font-medium text-stone-200 placeholder:text-stone-600"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            {/* Service Input */}
                                            <div className="relative group/input">
                                                <div className="absolute left-4 top-4 text-stone-500 group-focus-within/input:text-orange-500 transition-colors">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Projenizden kısaca bahsedin..."
                                                    className="w-full pl-12 pr-4 py-4 bg-stone-950/50 border border-stone-800 rounded-xl outline-none focus:border-orange-500 focus:bg-stone-900/80 transition-all font-medium text-stone-200 placeholder:text-stone-600 resize-none"
                                                    value={formData.serviceNeeded}
                                                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-5 rounded-xl transition-all shadow-lg shadow-orange-900/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg uppercase tracking-wider relative overflow-hidden group"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {loading ? "Gönderiliyor..." : "Teklif Alın"}
                                                    {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                                                </span>
                                                {loading && <Loader2 className="w-5 h-5 animate-spin relative z-10 ml-2" />}

                                                {/* Button shine effect */}
                                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* RIGHT: Info Side */}
                            <div className="lg:col-span-6 flex flex-col justify-center space-y-16 pt-8 lg:pt-4">

                                {/* Intro Text */}
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-bold text-white">
                                        Hayalinizdeki Projeyi <br />
                                        <span className="text-stone-500">Gerçeğe Dönüştürelim.</span>
                                    </h3>
                                    <p className="text-stone-400 leading-relaxed text-lg max-w-lg border-l-2 border-orange-500/50 pl-6">
                                        Her büyük marka bir fikirle başlar. Biz, bu fikri dijital bir sanat eserine çevirmek için buradayız.
                                    </p>
                                </div>

                                {/* Contact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/905013046064"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group bg-stone-900/40 border border-white/5 p-6 rounded-2xl hover:bg-stone-800/60 transition-colors flex flex-col gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">WhatsApp</h4>
                                            <p className="text-stone-500 text-sm">Hızlı İletişim</p>
                                        </div>
                                    </a>

                                    {/* Location */}
                                    <div className="group bg-stone-900/40 border border-white/5 p-6 rounded-2xl hover:bg-stone-800/60 transition-colors flex flex-col gap-4">
                                        <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">Konum</h4>
                                            <p className="text-stone-500 text-sm font-mono mt-1 tracking-tight">36°44'02.1"N 29°55'07.5"E</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Socials Minimal */}
                                <div className="flex items-center gap-6 pt-4">
                                    <span className="text-stone-600 font-medium uppercase tracking-widest text-sm">Takipte Kalın</span>
                                    <div className="h-px bg-stone-800 flex-1"></div>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-stone-400 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
                                        <a href="#" className="text-stone-400 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
                                        <a href="#" className="text-stone-400 hover:text-white transition-colors"><Globe className="w-6 h-6" /></a>
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
