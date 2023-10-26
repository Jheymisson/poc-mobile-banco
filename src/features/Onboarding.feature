# language: pt

@regressao
@onboarding
Funcionalidade: Validações no Onboarding

  Contexto: Tela Inicial do Aplicativo
    Dado que acesso a tela inicial do APP

  @pessoaFisica
  Cenario: Validar onboarding Pessoa Fisica
    E acesso a tela de onboarding
    Quando preencho com Cpf, Nome pessoal, Nickname, Telefone, Email, '<senhaAcesso>', '<nomeMae>', Data de nascimento, '<cep>' e '<numero>' da Pessoa Fisica
    E tiro a foto da selfie e documento RG
    Então preencho a '<pin>'
    E finalizo o onboarding
    E deve ser exibida a Home Page

    Exemplos: Teste do onboarding Pessoa Física
      | senhaAcesso    | cep        | numero  | nomeMae        | pin     |
      |                |            |         | Laura da Silva | 1234    |

  @pessoaJuridica
  Cenario: Validar onboarding Pessoa Fisica
    E acesso a tela de onboarding
    Quando preencho com Cnpj, Nome da Empresa, Razao Social, Telefone, Email, '<senhaAcesso>', '<tModalidade>', '<tEmpresa>', '<cepComercial>', '<numero>', '<cepRepresentante>' e '<numero>' da Pessoa Jurídica
    E tiro a foto da selfie e documento RG
    Então preencho a '<pin>'
    E finalizo o onboarding
    E deve ser exibida a Home Page

    Exemplos: Teste do onboarding Pessoa Física
      | senhaAcesso    |tModalidade      | tModalidade | cepComercial | cepRepresentante | numero | pin   |
      |                |                 |     mei     | 72415233     | 95530970         | 845    | 1234  |

