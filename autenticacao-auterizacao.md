# Nextauth
  - Nâo mt indicado pra quando tem uma api com autenticação dentro ja
  - Integração não mt boa

# No app
- Front
  - tela login
  - Req -> post (email, password)
    - Back Recebe os dados e gera jwt (json web token)
        - Jwt não é salvo no banco
          - Gera um refresh token
            - salvo db e tem responsibilidade:
              - quando não for mais valido o token
                - envia o refresh token 
                  - back devolve um novo jwt e um novo refresh token
                - refresh token da pra revogar
        - Front end precisa armazena token (localstore, sessionstorage, cookies)
        - Prox reqs consegue enviar o token
          - Ex: buscar dados do perfil
            - Irá carregar o jwt
            - Enviado normalmente pelo header
            - Back valida se o user é valido ou não
        - Token tem que ter expiração
          - Normalmente baixa pra evitar alguem se passar pelo user
