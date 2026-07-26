// Turns a locally-formatted phone number into a wa.me link with the right
// country code, so tapping it opens a WhatsApp chat directly — no manual
// dialing or guessing the country code.

export type PhoneCountry = 'GH' | 'FR';

const COUNTRY_CODES: Record<PhoneCountry, string> = {
  GH: '233',
  FR: '33',
};

export function formatWhatsAppNumber(phone: string | null | undefined, country: PhoneCountry): string | null {
  if (!phone) return null;

  let digits = phone.replace(/\D/g, '');
  if (!digits) return null;

  const code = COUNTRY_CODES[country];

  // Already includes the country code (e.g. stored as "233244xxxxxx")
  if (digits.startsWith(code)) return digits;

  // Strip a local trunk prefix (e.g. "0244xxxxxx" → "244xxxxxx")
  if (digits.startsWith('0')) digits = digits.slice(1);

  return `${code}${digits}`;
}

export function whatsappUrl(phone: string | null | undefined, country: PhoneCountry): string | null {
  const formatted = formatWhatsAppNumber(phone, country);
  return formatted ? `https://wa.me/${formatted}` : null;
}