# language: pt

@regressao
@login
Funcionalidade: Validações no Login

  Contexto: Tela Inicial do Aplicativo
    Dado que acesso a tela inicial do APP

  @associateDevice
  Esquema do Cenario: Validar associação do device
    E acesso a tela de login
    Quando preencho '<cpfCnpj>' e '<senha>'
    E associo o device preenchendo o codigo sms do '<telefone>' e codigo email do '<email>'
    Então deve ser exibida a Home Page

    Exemplos: Teste do login com associação de device
      | cpfCnpj        | senha         | telefone    | email       |
      |                |               |             |             |

  @recoveryPassword
  Esquema do Cenario: Validar a recuperação de senha
    E acesso a tela de login
    Quando preencho '<cpfCnpj>'
    E recupero a senha da conta preenchendo o codigo sms do '<telefone>' e codigo email do '<email>'
    E preecho com a '<senha>'
    E associo o device preenchendo o codigo sms do '<telefone>' e codigo email do '<email>'
    Então deve ser exibida a Home Page

    Exemplos: Teste do login com recuperação de senha
      | cpfCnpj    | telefone | email     | senha    |
      |            |          |           |          |

  @cpfCnpjSenhaInexistente
  Esquema do Cenario: Validar o login com CPF/CNPJ inexistente
    E acesso a tela de login
    Quando preencho '<cpfCnpj>' e '<senha>'
    Entao é exibido a '<mensagem>'

    Exemplos: Testes CPF/CNPJ inexistente
      | cpfCnpj         | senha         | mensagem                   | 
      |                 |               | Usuário ou senha inválida  |

  @senhaInvalida
  Esquema do Cenario: Validar o login com senha incorreta
    E acesso a tela de login
    Quando preencho '<cpfCnpj>' e '<senha>'
    E associo o device preenchendo o codigo sms do '<telefone>' e codigo email do '<email>'
    E aciono o botão de acessar a Home Page
    Entao é exibido a '<mensagem>'

    Exemplos: Teste do login com senha incorreta
      | cpfCnpj        | senha         | telefone    | email     | mensagem                   |
      |                |               |             |           | Usuário ou senha inválida  |

  @campoDeCpfCnpjVazio
  Esquema do Cenario: Validar o login sem inserir o CPF/CNPJ
    E acesso a tela de login
    Quando não preencho '<cpfCnpj>'
    Entao é exibido a '<mensagem>'

    Exemplos: Teste do login sem inserir o CPF/CNPJ
      | cpfCnpj  | mensagem                 | 
      |          | Inserir CPF/CNPJ válido  |

  @campoDeSenhaVazio
  Esquema do Cenario: Validar o login sem inserir a senha
    E acesso a tela de login
    Quando preencho '<cpfCnpj>' e '<senha>'
    Entao é exibido a '<mensagem>'

    Exemplos: Teste do login sem inserir a senha
      | cpfCnpj     | senha   | mensagem         |
      |             |         | Insira uma senha |

  @campoSenhaInvalidas
  Esquema do Cenario: Validar o login com senhs inválidas
    E acesso a tela de login
    Quando preencho '<cpfCnpj>' e '<senha>'
    Entao é exibido a '<mensagem>'

    Exemplos: Teste do login com senhas inválidas
      | cpfCnpj    | senha   | mensagem                                                                                                    |
      |            |         | Deve conter, pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caracter especial |
      |            |         | Deve conter, pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caracter especial |
      |            |         | Deve conter, pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caracter especial |
      |            |         | Deve conter, pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caracter especial |
      |            |         | Deve conter, pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caracter especial |
      |            |         | Deve conter, pelo menos:\n- Uma letra maiúscula\n- Uma letra minúscula\n- Um número\n- Um caracter especial |

