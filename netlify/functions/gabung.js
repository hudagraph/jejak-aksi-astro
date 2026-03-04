export const config = {
  path: "/api/gabung",
};

export default async function handler(req) {
  // Hanya terima POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { nama, email, whatsapp, domisili, peran } = body;

  // Validasi sederhana
  if (!nama || !email || !whatsapp || !domisili || !peran) {
    return new Response(JSON.stringify({ error: "Semua field wajib diisi." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

  const errors = [];

  // ── 1. Kirim email konfirmasi via Resend ──────────────────────────────────
  try {
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Jejak Aksi <halo@jejakaksi.com>",
        to: [email],
        reply_to: "halo@jejakaksi.com",
        subject: `Selamat datang di Jejak Aksi, ${nama}! 🎉`,
        html: buildEmailHtml({ nama, email, whatsapp, domisili, peran }),
      }),
    });

    if (!emailRes.ok) {
      const errData = await emailRes.json().catch(() => ({}));
      errors.push(`Resend error: ${errData?.message || emailRes.statusText}`);
    }
  } catch (err) {
    errors.push(`Resend exception: ${err.message}`);
  }

  // ── 2. Simpan ke Google Sheets via Apps Script ────────────────────────────
  if (APPS_SCRIPT_URL) {
    try {
      const sheetRes = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, whatsapp, domisili, peran }),
      });

      if (!sheetRes.ok) {
        errors.push(`Apps Script error: ${sheetRes.statusText}`);
      }
    } catch (err) {
      errors.push(`Apps Script exception: ${err.message}`);
    }
  }

  // Kembalikan sukses meski ada error non-kritis (misal Sheets gagal, email tetap terkirim)
  return new Response(
    JSON.stringify({
      success: true,
      warnings: errors.length > 0 ? errors : undefined,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}

// ── Template Email HTML ───────────────────────────────────────────────────────
function buildEmailHtml({ nama, peran, domisili }) {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Selamat Datang di Jejak Aksi</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a5c3a 0%,#2e8b57 100%);padding:40px 48px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.75);font-size:13px;letter-spacing:2px;text-transform:uppercase;">Jejak Aksi</p>
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:700;line-height:1.3;">
                Selamat Datang, ${nama}! 🎉
              </h1>
              <p style="margin:12px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">
                Pendaftaranmu berhasil diterima.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px;">

              <p style="margin:0 0 24px;color:#374151;font-size:15px;line-height:1.7;">
                Hei <strong>${nama}</strong>,<br/><br/>
                Terima kasih sudah mendaftar untuk bergabung dengan komunitas <strong>Jejak Aksi</strong>!
                Kami senang kamu mau menjadi bagian dari gerakan ini — setiap langkah kecilmu punya makna besar. 🙌
              </p>

              <!-- Info Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border-left:4px solid #2e8b57;border-radius:0 8px 8px 0;margin:0 0 28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:1px;">Detail Pendaftaranmu</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 12px 4px 0;color:#6b7280;font-size:14px;white-space:nowrap;">Peran</td>
                        <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:600;">: ${peran}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;color:#6b7280;font-size:14px;white-space:nowrap;">Domisili</td>
                        <td style="padding:4px 0;color:#111827;font-size:14px;font-weight:600;">: ${domisili}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 12px 4px 0;color:#6b7280;font-size:14px;white-space:nowrap;">Status</td>
                        <td style="padding:4px 0;color:#16a34a;font-size:14px;font-weight:700;">: ✅ Terdaftar</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <p style="margin:0 0 12px;color:#111827;font-size:15px;font-weight:700;">Langkah selanjutnya:</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:28px;height:28px;background:#d1fae5;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#065f46;">1</td>
                      <td style="padding-left:12px;color:#374151;font-size:14px;line-height:1.6;">Tunggu pesan dari kami via WhatsApp atau email untuk arahan onboarding.</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:28px;height:28px;background:#d1fae5;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#065f46;">2</td>
                      <td style="padding-left:12px;color:#374151;font-size:14px;line-height:1.6;">Jelajahi cerita dan proyek di website kami.</td>
                    </tr></table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0"><tr>
                      <td style="width:28px;height:28px;background:#d1fae5;border-radius:50%;text-align:center;vertical-align:middle;font-size:13px;font-weight:700;color:#065f46;">3</td>
                      <td style="padding-left:12px;color:#374151;font-size:14px;line-height:1.6;">Siapkan dirimu untuk berkontribusi sesuai peran yang kamu pilih!</td>
                    </tr></table>
                  </td>
                </tr>
              </table>

              <p style="margin:32px 0 0;color:#374151;font-size:15px;line-height:1.7;">
                Ada pertanyaan? Balas email ini atau hubungi kami di
                <a href="mailto:halo@jejakaksi.com" style="color:#2e8b57;font-weight:600;">halo@jejakaksi.com</a>.
              </p>

              <p style="margin:20px 0 0;color:#374151;font-size:15px;">
                Salam hangat,<br/>
                <strong>Tim Jejak Aksi</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 48px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;line-height:1.6;">
                © 2025 Jejak Aksi — Melangkah Bersama<br/>
                <a href="https://jejakaksi.com" style="color:#6b7280;">jejakaksi.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
