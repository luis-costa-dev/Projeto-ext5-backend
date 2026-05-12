/**
 * Valida CNPJ com cálculo dos dígitos verificadores (algoritmo módulo 11)
 * @param cnpj - CNPJ com ou sem formatação
 * @returns boolean - true se CNPJ é válido
 */
export function isValidCNPJ(cnpj: string): boolean {
  if (!cnpj || typeof cnpj !== 'string') return false;

  // Remove caracteres não numéricos
  const digits = cnpj.replace(/\D/g, '');

  // Deve ter exatamente 14 dígitos
  if (digits.length !== 14) return false;

  // Rejeita CNPJs com todos os dígitos iguais (padrão inválido)
  if (/^(\d)\1{13}$/.test(digits)) return false;

  // Calcula primeiro dígito verificador
  const firstVerifier = calculateCNPJVerifier(digits.slice(0, 12), [
    5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ]);

  // Valida primeiro dígito verificador
  if (parseInt(digits[12]) !== firstVerifier) return false;

  // Calcula segundo dígito verificador
  const secondVerifier = calculateCNPJVerifier(digits.slice(0, 13), [
    6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2,
  ]);

  // Valida segundo dígito verificador
  if (parseInt(digits[13]) !== secondVerifier) return false;

  return true;
}

/**
 * Calcula o dígito verificador do CNPJ
 */
function calculateCNPJVerifier(
  digits: string,
  multipliers: number[],
): number {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i]) * multipliers[i];
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}
