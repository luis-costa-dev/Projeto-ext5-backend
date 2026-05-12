import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCNPJ } from './cnpj.validator';

@ValidatorConstraint({ name: 'isValidCNPJ', async: false })
export class IsValidCNPJConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (!value) return true; // deixa outras validações (IsOptional, etc) cuidarem disso
    return isValidCNPJ(value);
  }

  defaultMessage(): string {
    return 'CNPJ inválido (dígitos verificadores incorretos)';
  }
}

export function IsValidCNPJ(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCNPJConstraint,
    });
  };
}
