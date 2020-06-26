# Recuperação de senha

**RF**

- o usuário deve poder recurar sua senha  informando seu email;
- o usuário deve receber um email com instruções de recuperação de senha;
- o usuário deve poder resetar sua senha;

**RNF**
- utilizar mailtrap em ambiente de dev;
- utilizar amazon SES para envios em produção;
- o envio de email deve acontecer em segundo (background job);

**RN**
- o link enviado por email para resetar a senha, deve expirar em 2 horas;
- O usuário deve cofirmar sua nova senha ao resetsr sua senha antiga;

# Atualizaçao do perfil 

**RF**
- o usuário deve poder atualizar seu nome, e-mail e senha;

**RN**
- o usuário na pode alterar seu e-mail para um email ja utilizado;
- para autualizar sua senha o usuário deve informar sua senha amtiga;
- para atualizar sua senha o usuário deve cofimar sua nova senha;

# painel do prestador

# Agendamento de serviços 

**RN**
- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário deve poder listar os horários disponíveis de um prestador;
- O usuário deve poder listar os horários especificos de um prestador;
- O usuário deve poder agendar um horário com um prestador;


**RN**

- cada agendamento deve duarar uma 1h exatamente;
- 