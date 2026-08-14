/**
 * Utility to generate formatted WhatsApp conversion links with pre-filled messages
 */

export const DEFAULT_WHATSAPP = '5551993835822'; // Cátia Backhaus - CRECI 81350 (RS)

export interface WhatsAppOptions {
  phone?: string;
  propertyTitle?: string;
  propertyCity?: string;
  propertyNeighborhood?: string;
  type?: 'general' | 'property' | 'visit' | 'financing' | 'plants';
  downPayment?: string;
  customMessage?: string;
}

export function buildWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const phone = (options.phone || DEFAULT_WHATSAPP).replace(/\D/g, '');
  let message = '';

  if (options.customMessage) {
    message = options.customMessage;
  } else if (options.type === 'visit' && options.propertyTitle) {
    message = `Olá Cátia Backhaus! Gostaria de agendar uma visita para conhecer o empreendimento *${options.propertyTitle}*${options.propertyCity ? ` em ${options.propertyCity}` : ''}. Como estão os horários disponíveis?`;
  } else if (options.type === 'financing' && options.propertyTitle) {
    message = `Olá Cátia! Gostaria de simular as condições do Minha Casa Minha Vida e fluxo de pagamento para o *${options.propertyTitle}*${options.downPayment ? ` (Entrada aproximada de ${options.downPayment})` : ''}. Poderia me orientar?`;
  } else if (options.type === 'plants' && options.propertyTitle) {
    message = `Olá Cátia! Poderia me enviar o book completo com as plantas e tabela de valores do *${options.propertyTitle}*?`;
  } else if (options.propertyTitle) {
    message = `Olá Cátia Backhaus! Vi o empreendimento *${options.propertyTitle}* no seu portal${options.propertyNeighborhood ? ` (${options.propertyNeighborhood}, ${options.propertyCity || 'RS'})` : ''} e gostaria de mais informações sobre valores, tabela e unidades disponíveis.`;
  } else {
    message = `Olá Cátia Backhaus! Acessei seu portal de imóveis e gostaria de uma consultoria personalizada para encontrar o imóvel ideal.`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return `+55 (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
  }
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}
