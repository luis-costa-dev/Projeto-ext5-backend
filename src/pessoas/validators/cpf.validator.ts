/**
 * Valida CPF com cálculo dos dígitos verificadores (algoritmo módulo 11)
 * @param cpf - CPF com ou sem formatação
 * @returns boolean - true se CPF é válido
 */
export function isValidCPF(cpf: string): boolean {
  if (!cpf || typeof cpf !== 'string') return false;

  // Remove caracteres não numéricos
  const digits = cpf.replace(/\D/g, '');

  // Deve ter exatamente 11 dígitos
  if (digits.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais (padrão inválido)
  if (/^(\d)\1{10}$/.test(digits)) return false;

  // Calcula primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  let firstVerifier = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (parseInt(digits[9]) !== firstVerifier) return false;

  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i);
  }
  let secondVerifier = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (parseInt(digits[10]) !== secondVerifier) return false;

  return true;
}
