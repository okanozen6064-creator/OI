
# ⚡️ Supabase Kurulum ve Mail Gönderimi (Hazır Komutlar)

Aşağıdaki komutları sırasıyla terminale yapıştırarak kurulumu tamamlayabilirsiniz.

## 1. Supabase'e Giriş
Tarayıcı penceresi açılacak, onay vermeniz gerekecek.
```bash
npx supabase login
```

## 2. Projeyi Bağlama
Veritabanı şifreniz (**Mbappe77..**) sorulursa girin.
```bash
npx supabase link --project-ref idolpbqftdfuymdfvbct
```

## 3. API Anahtarını Kaydetme
Resend API anahtarınızı güvenli bir şekilde Supabase'e ekler.
```bash
npx supabase secrets set RESEND_API_KEY=re_PZC9bwFV_RvePfQwW5LrdkduLDsDKF4bC
```

## 4. Fonksiyonu Canlıya Alma (Deploy)
Yazdığımız mail gönderme kodunu sunucuya yükler.
```bash
npx supabase functions deploy send-email
```

---

## 5. Son Adım: Webhook Oluşturma (Panelden)

Deploy işlemi bittikten sonra size bir URL verecek (Örn: `https://idolpbqftdfuymdfvbct.supabase.co/functions/v1/send-email`).

1.  Supabase Paneline gidin: [Database Webhooks](https://supabase.com/dashboard/project/idolpbqftdfuymdfvbct/database/hooks)
2.  **Create a new webhook** butonuna basın.
3.  **Name:** `mail-tetikleyici`
4.  **Table:** `public.leads`
5.  **Events:** `INSERT` (Sadece bunu seçin)
6.  **Type:** `HTTP Request`
7.  **Method:** `POST`
8.  **URL:** Size verilen URL'yi yapıştırın.
9.  **Confirm** diyerek kaydedin.

🎉 Artık sitenizden form doldurulduğunda otomatik olarak **okanozen6064@gmail.com** adresine mail gelecektir!
