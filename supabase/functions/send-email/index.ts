// @ts-nocheck

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface LeadRecord {
    full_name: string
    email: string
    phone: string
    service_needed: string
    created_at: string
}

interface WebhookPayload {
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    table: string
    record: LeadRecord
    schema: string
    old_record: null | LeadRecord
}

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const payload: WebhookPayload = await req.json()

        console.log('Webhook payload:', payload)

        // Sadece INSERT işlemlerinde çalışsın
        if (payload.type !== 'INSERT') {
            return new Response('Not an insert event, skipped', {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            })
        }

        const { full_name, email, phone, service_needed, created_at } = payload.record

        if (!RESEND_API_KEY) {
            console.error('RESEND_API_KEY is not set')
            throw new Error('Internal Server Error: Missing API Key')
        }

        // Resend API'ye istek at
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: 'OI Agency Form <onboarding@resend.dev>', // Eğer kendi domainin varsa burayı değiştir: noreply@oiagency.com
                to: 'okanozen6064@gmail.com', // Kullanıcının mail adresi
                subject: `Yeni Teklif Talebi: ${full_name}`,
                html: `
          <h1>Yeni Müşteri Talebi! 🎉</h1>
          <p>Web sitenden yeni bir form dolduruldu.</p>
          <ul>
            <li><strong>Ad Soyad:</strong> ${full_name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Telefon:</strong> ${phone}</li>
            <li><strong>Hizmet:</strong> ${service_needed}</li>
            <li><strong>Tarih:</strong> ${new Date(created_at).toLocaleString('tr-TR')}</li>
          </ul>
          <p>Hemen iletişime geç!</p>
        `,
            }),
        })

        const data = await res.json()
        console.log('Resend Response:', data)

        return new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
