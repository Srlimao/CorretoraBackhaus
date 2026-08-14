/**
 * Formatting utilities for real estate data
 */

export function formatCurrency(value?: number): string {
  if (value === undefined || value === null || isNaN(value)) {
    return 'Consulte';
  }
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatArea(min: number, max?: number): string {
  if (!max || min === max) {
    return `${min} m²`;
  }
  return `${min} a ${max} m²`;
}

export function formatBedrooms(bedrooms: number[]): string {
  if (!bedrooms || bedrooms.length === 0) return 'Consulte';
  if (bedrooms.length === 1) {
    const num = bedrooms[0];
    return `${num} ${num === 1 ? 'Dormitório' : 'Dormitórios'}`;
  }
  const sorted = [...bedrooms].sort((a, b) => a - b);
  return `${sorted[0]} a ${sorted[sorted.length - 1]} Dormitórios`;
}

export function formatSuites(suites?: number[]): string {
  if (!suites || suites.length === 0) return '';
  if (suites.length === 1) {
    const num = suites[0];
    if (num === 0) return '';
    return `${num} ${num === 1 ? 'Suíte' : 'Suítes'}`;
  }
  const sorted = [...suites].sort((a, b) => a - b);
  return `${sorted[0]} a ${sorted[sorted.length - 1]} Suítes`;
}

export function formatParkingSpots(spots?: number[]): string {
  if (!spots || spots.length === 0) return '';
  if (spots.length === 1) {
    const num = spots[0];
    if (num === 0) return '';
    return `${num} ${num === 1 ? 'Vaga' : 'Vagas'}`;
  }
  const sorted = [...spots].sort((a, b) => a - b);
  return `${sorted[0]} a ${sorted[sorted.length - 1]} Vagas`;
}

export function getStatusBadgeInfo(status: string): { label: string; bgClass: string; textClass: string; borderClass: string } {
  switch (status) {
    case 'Lancamento':
    case 'Lançamento':
      return {
        label: 'Lançamento',
        bgClass: 'bg-blue-900/80',
        textClass: 'text-blue-200',
        borderClass: 'border-blue-700/50',
      };
    case 'Em Obras':
      return {
        label: 'Em Obras',
        bgClass: 'bg-amber-900/80',
        textClass: 'text-amber-200',
        borderClass: 'border-amber-700/50',
      };
    case 'Pronto para Morar':
      return {
        label: 'Pronto para Morar',
        bgClass: 'bg-emerald-900/80',
        textClass: 'text-emerald-200',
        borderClass: 'border-emerald-700/50',
      };
    case '100% Vendido':
      return {
        label: '100% Vendido',
        bgClass: 'bg-slate-800/90',
        textClass: 'text-slate-300',
        borderClass: 'border-slate-700/50',
      };
    case 'Futuro Lancamento':
    case 'Breve Lançamento':
      return {
        label: 'Breve Lançamento',
        bgClass: 'bg-purple-900/80',
        textClass: 'text-purple-200',
        borderClass: 'border-purple-700/50',
      };
    default:
      return {
        label: status,
        bgClass: 'bg-navy-900/80',
        textClass: 'text-slate-200',
        borderClass: 'border-navy-700/50',
      };
  }
}
