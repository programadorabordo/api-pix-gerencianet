# API Pix - Gerencianet
Aplicação que gera cobrança e QRCode e aceita pagamentos via Pix. Projeto desenvolvido no [vídeo do YouTube do canal Programador a Bordo](https://youtu.be/bo1THXaohU0)!

## Dependências
- Node v15.5.0

## Como rodar
- npm install
- npm run start:dev

## Configurações
### Diretório de certificados
Criar diretório `certs` na raíz do projeto e adicionar certificados p12 e chave pública gerados pela Gerencianet

### Variáveis de ambiente
Criar as devidas variáveis de ambiente. Se estiver rodando localmente, remoear o arquivo `.env-sample` para `.env` e adicionar seus respectivos valores

| Chave | Valor |
|--|--|
| GN_CLIENT_ID | Client ID gerado no dashboard da sua app na Gerencianet |
| GN_CLIENT_SECRET | Client Secret gerado no dashboard da sua app na Gerencianet |
| GN_ENDPOINT | protocolo + url base. Ex: https://api-pix-h.gerencianet.com.br |
| NODE_ENV | Colocar development ou production dependendo do ambiente |
| GN_CERT | Nome do certificado p12 que está na pasta `certs` criado por você |

