// Free translation via MyMemory (https://mymemory.translated.net) — no API
// key, no account needed. Good enough for a personal reader. Has a modest
// daily quota per IP, so we translate each article only once (ever) and
// store the result permanently — see app.js.

async function translateText(text) {
  const trimmed = (text || '').trim();
  if (!trimmed) return '';
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed.slice(0, 480))}&langpair=en|ar`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return '';
    const data = await res.json();
    return data?.responseData?.translatedText || '';
  } catch (e) {
    console.log('  ⚠️  فشل الاتصال بخدمة الترجمة:', e.message);
    return '';
  }
}

module.exports = { translateText };
