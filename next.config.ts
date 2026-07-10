import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set explicit workspace root for Turbopack to prevent SST cache errors
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Enable React strict mode for better development practices
  reactStrictMode: true,

  // 🚀 تحسين أداء الصور وضغطها التلقائي لتخفيف الحجم على الزوار
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // ⚡ تفعيل الضغط الفائق (Gzip / Brotli Compression) لتصغير حجم الصفحات لأقصى حد
  compress: true,

  // 🛡️ إخفاء معلومات الخادم لأسباب أمنية
  poweredByHeader: false,

  // Optimize external packages for server components
  serverExternalPackages: ['nodemailer'],

  // 💡 ملاحظة بخصوص الـ Static Export الكامل (بدون خادم Node):
  // جميع صفحات الواجهة العامة (/ و /ecosystem و /security و /roadmap و /whitepaper) مبنية بالفعل كصفحات ستاتيك (Static HTML) بنسبة 100%.
  // إذا كنت تريد تحويل المشروع بالكامل إلى مجلد ملفات HTML ستاتيك فقط (out/) لرفعها على استضافة ساكنة بدون APIs، يمكنك تفعيل السطر التالي:
  // output: 'export',

  // 🌐 ترويسات التخزين المؤقت الذكي (CDN & Edge Caching Headers) لخدمة ملايين الزوار بأقل استهلاك للخادم
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // التخزين المؤقت الدائم للملفات الثابتة والصور والخطوط (سنة كاملة)
        source: '/(.*)\\.(webp|png|jpg|svg|ico|woff2|js|css)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // التخزين المؤقت لصفحات الموقع العامة على شبكة Cloudflare و الـ CDNs لتخفيف الضغط بنسبة 99% عند دخول زوار كثر
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

export default nextConfig;
