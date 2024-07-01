// DTO para os decorators que eu passar ele vai seguir o padrão do class-validator
// Se utiliza class-validator para garantir que os dados estejam no formato correto

import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
  @IsString() // Aqui ele segue um padrão de só aceitar string
  name: string;

  @IsEmail() // Aqui ele segue um padrão de só aceitar no padrão de email
  email: string;

  @IsStrongPassword({
    // Aqui ele segue o padrão de só aceitar senhas fortes
    minLength: 6, // Tem que ter no minimo 6 caracteres
  })
  password: string;
}
