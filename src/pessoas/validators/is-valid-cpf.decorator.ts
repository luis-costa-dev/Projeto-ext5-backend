import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCPF } from './cpf.validator';

@ValidatorConstraint({ name: 'isValidCPF', async: false })
export class IsValidCPFConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (!value) return true; // deixa outras validações (IsOptional, etc) cuidarem disso
    return isValidCPF(value);
  }

  defaultMessage(): string {
    return 'CPF inválido (dígitos verificadores incorretos)';
  }
}

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (target: Object, propertyName: string) {
    registerDecorator({
      target: target.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidCPFConstraint,
    });
  };
}
