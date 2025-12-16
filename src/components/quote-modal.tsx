"use client"

import * as React from "react"
import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, CheckCircle, Loader2, Phone, MessageCircle, User, Mail, MessageSquare, Instagram, Linkedin, Globe, MapPin, ArrowRight } from "lucide-react"
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
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-6xl w-[95vw] md:w-full mx-auto max-h-[92vh] overflow-y-auto outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-[48%]">
                <div className="relative bg-[#FAFAF9] w-full rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden ring-1 ring-black/5">

                    {/* Background Texture - Architectural Grid (Subtle) */}
                    <div className="absolute inset-0 z-0 opacity-[0.25] pointer-events-none mix-blend-multiply">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-stone-100 via-transparent to-transparent"></div>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row min-h-[600px]">

                        {/* LEFT: INFO & BRANDING (Darker or Image side in some designs, but here we keep it Editorial Text) */}
                        {/* Actually, user feedback implies 'form boxes' are ugly. Let's make the Right Side the 'Visual' anchor and Left Side the 'Clean Form'. 
                           Let's swap standard layout: Left = Form, Right = Info.
                           But to make it NOT look like boxes, we will use a split background or just whitespace. */
                        }

                        {/* SECTION 1: THE FORM (Left - 60%) */}
                        <div className="w-full md:w-7/12 p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-[#FAFAF9]/80 backdrop-blur-sm order-2 md:order-1">
                            <div className="mb-10">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-stone-900 leading-none mb-3">
                                    PROJEYİ <span className="text-stone-400">BAŞLAT</span>
                                </h2>
                                <p className="text-stone-500 font-medium">Bize hayalinizdeki projeden bahsedin.</p>
                            </div>

                            {success ? (
                                <div className="flex flex-col items-center justify-center py-20 animate-in fade-in space-y-4">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-stone-900">Mesajınız Alındı!</h3>
                                        <p className="text-stone-500 max-w-xs mx-auto mt-2">Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Ad Soyad</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Adınız Soyadınız"
                                                className="w-full h-12 px-4 bg-white border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900 rounded-lg outline-none transition-all placeholder:text-stone-300 text-stone-900"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Telefon</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="(5XX) XXX XX XX"
                                                className="w-full h-12 px-4 bg-white border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900 rounded-lg outline-none transition-all placeholder:text-stone-300 text-stone-900"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">E-posta</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="ornek@sirket.com"
                                            className="w-full h-12 px-4 bg-white border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900 rounded-lg outline-none transition-all placeholder:text-stone-300 text-stone-900"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Proje Notları</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Aklınızdaki fikirleri kısaca anlatın..."
                                            className="w-full p-4 bg-white border-0 ring-1 ring-stone-200 focus:ring-2 focus:ring-stone-900 rounded-lg outline-none transition-all placeholder:text-stone-300 text-stone-900 resize-none leading-relaxed"
                                            value={formData.serviceNeeded}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-14 bg-stone-900 hover:bg-black text-white font-bold rounded-lg transition-all shadow-xl shadow-stone-900/10 hover:shadow-stone-900/20 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base uppercase tracking-widest group"
                                        >
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                <>
                                                    Teklif Alın <span className="text-stone-500 group-hover:text-white transition-colors">→</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* RIGHT: EDITORIAL / CONTACT (Right - 40%) */}
                        <div className="w-full md:w-5/12 bg-white flex flex-col justify-between p-8 md:p-12 lg:p-16 border-l border-stone-100 order-1 md:order-2">

                            {/* Top decorative */}
                            <div className="hidden md:block">
                                <div className="w-12 h-1 bg-stone-900 mb-8"></div>
                                <h3 className="text-2xl font-bold text-stone-900 leading-snug mb-4">
                                    Hayalinizdeki Projeyi<br />
                                    Gerçeğe Dönüştürelim.
                                </h3>
                                <p className="text-stone-500 text-sm leading-relaxed">
                                    Markanız için sadece bir web sitesi değil, yaşayan ve büyüyen bir dijital ekosistem tasarlıyoruz.
                                </p>
                            </div>

                            {/* Mobile visual header */}
                            <div className="md:hidden mb-6 flex items-center gap-3">
                                <div className="h-px bg-stone-300 flex-1"></div>
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">İletişim & Vizyon</span>
                                <div className="h-px bg-stone-300 flex-1"></div>
                            </div>

                            <div className="space-y-8 md:space-y-12">

                                {/* WhatsApp */}
                                <div className="group cursor-pointer">
                                    <h4 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2 group-hover:text-emerald-600 transition-colors">Hızlı İletişim & Destek</h4>
                                    <a href="https://wa.me/905013046064" target="_blank" className="flex items-center gap-3 group/link">
                                        <span className="text-2xl font-bold text-stone-900 group-hover/link:underline decoration-2 underline-offset-4 decoration-emerald-500 transition-all">WhatsApp</span>
                                        <ArrowRight className="w-5 h-5 -rotate-45 text-stone-300 group-hover/link:text-emerald-500 transition-colors" />
                                    </a>
                                </div>

                                {/* Location */}
                                <div>
                                    <h4 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Konum</h4>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-mono text-stone-900 bg-stone-100 w-fit px-3 py-1.5 rounded border border-stone-200 select-all">36°44'02.1"N 29°55'07.5"E</span>
                                    </div>
                                </div>

                                {/* Footer-ish */}
                                <div className="hidden md:block pt-8 text-stone-400 text-xs leading-relaxed border-t border-stone-100 mt-auto">
                                    <p>Yeni projeler için müsaitiz.</p>
                                    <p>© {new Date().getFullYear()} OI Agency.</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
