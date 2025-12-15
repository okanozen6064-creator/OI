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
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-6xl w-full mx-4">
                <div className="relative bg-[#ffffff] w-full overflow-hidden rounded-3xl shadow-2xl min-h-[600px] flex flex-col">

                    {/* Background Wireframe Image - Bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-[300px] z-0 opacity-100 pointer-events-none">
                        <img
                            src="/wireframe-bg.png"
                            alt="Digital Landscape"
                            className="w-full h-full object-cover object-bottom opacity-80"
                        />
                        {/* Gradient overlay to blend top */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-transparent"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col items-center">

                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-stone-900 mb-12 text-center">
                            Projeyi Başlatalım
                        </h2>

                        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                            {/* LEFT: Form Card */}
                            <div className="lg:col-span-5 w-full">
                                <div className="bg-white rounded-2xl shadow-xl border-2 border-stone-100 p-8 transform transition-all hover:shadow-2xl">
                                    <h3 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                                        <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                                        Bize Mesaj Gönderin
                                    </h3>

                                    {success ? (
                                        <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-xl font-bold text-stone-900 mb-2">Gönderildi!</h3>
                                            <p className="text-stone-500 text-sm">En kısa sürede dönüş yapacağız.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            {/* Name Input */}
                                            <div className="relative group">
                                                <div className="absolute left-1 top-1 bottom-1 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-focus-within:bg-orange-500 group-focus-within:text-white transition-all">
                                                    <User className="w-5 h-5" />
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Adınız Soyadınız"
                                                    className="w-full pl-14 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl outline-none focus:border-orange-500 transition-all font-medium text-stone-900 placeholder:text-stone-400"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                />
                                            </div>

                                            {/* Email Input */}
                                            <div className="relative group">
                                                <div className="absolute left-1 top-1 bottom-1 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-focus-within:bg-orange-500 group-focus-within:text-white transition-all">
                                                    <Mail className="w-5 h-5" />
                                                </div>
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="E-posta Adresiniz"
                                                    className="w-full pl-14 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl outline-none focus:border-orange-500 transition-all font-medium text-stone-900 placeholder:text-stone-400"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>

                                            {/* Phone Input (added to match previous form capabilities) */}
                                            <div className="relative group">
                                                <div className="absolute left-1 top-1 bottom-1 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-focus-within:bg-orange-500 group-focus-within:text-white transition-all">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <input
                                                    required
                                                    type="tel"
                                                    placeholder="Telefon Numaranız"
                                                    className="w-full pl-14 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl outline-none focus:border-orange-500 transition-all font-medium text-stone-900 placeholder:text-stone-400"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>

                                            {/* Service Input */}
                                            <div className="relative group">
                                                <div className="absolute left-1 top-1 bottom-1 w-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-focus-within:bg-orange-500 group-focus-within:text-white transition-all">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Hizmet / Mesajınız"
                                                    className="w-full pl-14 pr-4 py-3 bg-stone-50 border-2 border-stone-100 rounded-xl outline-none focus:border-orange-500 transition-all font-medium text-stone-900 placeholder:text-stone-400"
                                                    value={formData.serviceNeeded}
                                                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
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
                            <div className="lg:col-span-7 flex flex-col justify-center space-y-12 pt-8 lg:pt-0">

                                {/* Chat Section */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-stone-900">Canlı Konuşalım</h3>
                                    <p className="text-stone-500 leading-relaxed max-w-md">
                                        Yazışmak yerine konuşmayı mı tercih edersiniz? Ekibimizle WhatsApp üzerinden veya doğrudan arayarak anında iletişime geçebilirsiniz.
                                    </p>
                                    <a
                                        href="https://wa.me/905013046064"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128c7e] text-white font-bold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg group"
                                    >
                                        <MessageCircle className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                                        WhatsApp'tan Başlat
                                    </a>
                                </div>

                                {/* Social Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-stone-900">Bizi Takip Edin</h3>
                                    <div className="flex items-center gap-4">
                                        <a href="#" className="w-12 h-12 bg-stone-900 text-white rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors">
                                            <span className="font-bold text-xl">X</span>
                                        </a>
                                        <a href="#" className="w-12 h-12 bg-[#0077b5] text-white rounded-xl flex items-center justify-center hover:bg-[#005582] transition-colors">
                                            <Linkedin className="w-6 h-6" />
                                        </a>
                                        <a href="#" className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity">
                                            <Instagram className="w-6 h-6" />
                                        </a>
                                    </div>
                                </div>

                                {/* Address / Concept Section */}
                                <div className="space-y-4 relative">
                                    <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-orange-500" />
                                        Dijital Merkezimiz
                                    </h3>
                                    <div className="space-y-1">
                                        <p className="text-stone-800 font-medium text-lg">Sınırsız Dijital Alan</p>
                                        <p className="text-stone-500">Antalya'dan Dünyaya, Remote & Global.</p>
                                        <p className="text-orange-600 font-mono text-sm pt-2">36.8969° N, 30.7133° E</p>
                                    </div>

                                    {/* Decorative element for 'cool web design thing' */}
                                    <div className="absolute -right-10 top-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-blue-400/20 rounded-full blur-[40px] pointer-events-none"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
