# Changelog

## [Introduction]
- Este documento destina-se a listar modificações recentes no projeto LWDK escrito em JavaScript.
- LWDK e um acrônimo para [L]ight [W]eight [D]evelopment [K]it, que visa descomplicar o desenvolvimento web através de uma
ferramenta leve e com funcionalidades atualizadas voltadas a facilitar o dia a dia.
- Esta ferramenta é desenvolvida atualmente por Tulio Nascimento (https://site13.com.br/)

### [1.3.6] - 17-04-2022
#### Added
    - Library __LWDK.date__ criada.
	 	- __LWDK.date.getFullDate([?] @String:yyyy-mm-dd, [?] @String::Locale)__: Retorna a data atual por extenso. 

### [1.3.5] - 21-03-2022
#### Modified
    - Function __LWDK.data.jsonParse(@String)__ atualizada: adicionado um callback de tentativa nativa caso haja bug ao fazer a conversão.

### [1.3.4] - 13-03-2022
#### Added
  - Function __LWDK.data.sanstr(@String)__ criada. Esta função tem o objetivo de tornar uma string qualquer em um id/nome_de_url válido.
    - Ex.: "Bolo de Fubá" => "bolo-de-fuba"
    #### Modified
      - Library __LWDK.data__ atualizada: Adição de uma nova função.

### [1.3.3] - 10-03-2022
#### Modified
  - Functions __LWDK.request__ e __LWDK.cep__ atualizadas.

### [1.3.2] - 03-03-2022
#### Added
  - Inclusa a função __LWDK.data.jsonParse(@String)__, que serve para ler um json string de maneira válida (mesmo com acentuação ou caracteres invalidos).
#### Modified
  - Library __LWDK.data__ atualizada: Adição de uma nova função.

### [1.3.1] - 27-02-2022
#### Added
  - Inclusa a função __LWDK.modUrl(@String)__, que serve para mudar a url sem trocar de pagina.

### [1.3.0] - 27-02-2022
#### Added
  - Include redefindo apenas para inclusão de arquivos externos
  - Criado sistema de compiler, onde todo o codigo e compilado e minificado em um arquivo único entitulado [*lwdk.js*], para distribuição.
  - Agora existe a pasta [*project*] e a pasta [*runtime*], onde [*project*] contém os arquivos de projeto e [*runtime*] os arquivos que serão compilados.

### [1.2.0] - 29-01-2022
#### Added
  - Desenvolvida a função __LWDK.request__ para requisições *FetchAPI* (mais moderna tecnologia para requisições assíncronas). Formatos de chamada:
    - __LWDK.request(@String::url, [?] @Object::body, [?] @Function::success, [?] @Function::fail)__: Formato clássico.
    - __LWDK.request(@Object::body, [?] @Function::success, [?] @Function::fail)__: Chamada usando a url atual.
    - __LWDK.request(@Function::success, [?] @Function::fail)__: Chamada usando a url atual e sem parâmetros, apenas com retorno em *callback*.
    - __LWDK.request(@String::url, [?] @Function::success, [?] @Function::fail)__: Chamada usando uma url específica e sem parâmetros de corpo na requisição.
  - Melhorias no _Boot_ do _LWDK_ [boot.js].

### [1.1.0] - 05-01-2022
#### Added
  - Desenvolvida a função __LWDK.cookie(@String::cookieName, [?] @String::value, [?] @Float::lifeTime)__ para manipular cookies.
  - Desenvolvida a library __LWDK.data__, importada do arquivo [dataTools.js], que comporta as seguintes sub-funções:
    - __LWDK.data.crypt(@String)__: Encripta uma @String com um algoritimo simples (não recomendado para senhas e afins, apenas para encriptações simples)
    - __LWDK.data.uncrypt(@String)__: Desencripta a @String encriptada anteriormente.
    - __LWDK.data.randomId(@Void)__: Cria uma ID randômica com letras e números.
  - Melhorias no _Boot_ do _LWDK_ [boot.js].

### [1.0.0] - 14-11-2021
#### Notations
  - Início do desenvolvimento

#### Developed
  - Criado o arquivo [boot.js], contendo a estruturação baseada em uma variável global chamada _LWDK_
  - Criado diretório [core], onde ficarão localizadas funcionalidades essênciais da ferramenta
    - Desenvolvida a função __LWDK.css(@String::CSSCode, [?] @Boolean::autorun)__, para inserção de funcionalidades CSS a página web no padrão "On The Fly"
    - Desenvolvida a função __LWDK.step(@Function, [?] @Int::sleepTime)__, para funcionalidades que precisem de repetições,
      similarmente ao setInterval, mas contendo um sistema de segurança para evitar travamentos na página
  - Criado diretório [plugins], onde ficarão localizadas funcionalidades opcionais da ferramenta
    - Desenvolvida a library __LWDK.anim__, importada através do arquivo [animations.js], que comporta as seguintes sub-funções:
      - __LWDK.anim.fadeIn(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.fadeOut(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.blink(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.mblink(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.slideUp(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.slideDown(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateLeftIn(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateLeftOut(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateRightIn(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateRightOut(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateIn(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateOut(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateRight(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.rotateLeft(@HTMLElement)__: Efeito de animação personalizado do CSS.
      - __LWDK.anim.shake(@HTMLElement)__: Efeito de animação personalizado do CSS.
    - Desenvolvida a função __LWDK.badWordFilter(@String::texto, [?] @String::censura)__, para censura de palavrões.
    - Desenvolvida a função __LWDK.cep(@String::CEP, [?] @Function::callback)__, para buscar o Endereço baseado no CEP usando o viacep como ferramenta de busca.

###################
