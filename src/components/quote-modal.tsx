"use client"

import * as React from "react"
import { useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, CheckCircle, Loader2, Phone } from "lucide-react"
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
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-5xl">
                <div className="flex flex-col lg:flex-row overflow-hidden rounded-3xl shadow-2xl">

                    {/* Left Side: Dark Info Panel */}
                    <div className="bg-black/95 relative flex-1 p-10 lg:p-14 text-white flex flex-col justify-center min-h-[300px] lg:min-h-[600px]">
                        {/* Decorative Background Mesh */}
                        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">OI Digital Agency</h3>
                            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-8 leading-tight">
                                Ücretsiz Danışmanlık <br className="hidden lg:block" /> Alın.
                            </h2>
                            <p className="text-stone-400 text-lg mb-10 leading-relaxed max-w-md">
                                Projenizi hayata geçirmek için ilk adımı atın. Uzman ekibimiz size özel stratejiler geliştirmek için hazır.
                            </p>

                            <a href="tel:+905013046064" className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-orange-900/20 group w-fit">
                                <Phone className="mr-3 h-5 w-5 fill-current" />
                                <span className="text-lg">+90 501 304 60 64</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Side: White Form Panel */}
                    <div className="bg-white flex-1 p-10 lg:p-14 flex flex-col justify-center relative">
                        {success ? (
                            <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-stone-900 mb-2">Talebiniz Alındı!</h3>
                                <p className="text-stone-600">En kısa sürede sizinle iletişime geçeceğiz.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-stone-900 mb-8 flex items-center gap-2">
                                    Hemen Teklif Alın
                                </h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-medium text-stone-500 ml-1">Ad Soyad</label>
                                        <input
                                            id="fullName"
                                            required
                                            type="text"
                                            placeholder="Adınız ve Soyadınız"
                                            className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-stone-500 ml-1">E-posta</label>
                                        <input
                                            id="email"
                                            required
                                            type="email"
                                            placeholder="ornek@sirket.com"
                                            className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-stone-500 ml-1">Telefon Numarası</label>
                                        <input
                                            id="phone"
                                            required
                                            type="tel"
                                            placeholder="05XX XXX XX XX"
                                            className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="service" className="text-sm font-medium text-stone-500 ml-1">İhtiyacınız Olan Hizmet</label>
                                        <input
                                            id="service"
                                            type="text"
                                            placeholder="Örn: Web Tasarım, SEO, E-ticaret..."
                                            className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                                            value={formData.serviceNeeded}
                                            onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-orange-900/10 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Gönderiliyor...
                                                </>
                                            ) : (
                                                "Teklif İste"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
