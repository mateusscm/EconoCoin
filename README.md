# KAZU - Seu coach financeiro

## Sobre

Trata-se de um sistema simples, feito em plataforma WEB e Android, para controle financeiro pessoal, o qual o usuário será responsável por adicionar seus gastos, despesas e transferências sem que ao final do dia tenha que colocá-los em uma planilha. Maneira fácil e rápida para não ficar no prejuízo! 

## Tecnologias 

1 - Apesar de ser nativo, o desempenho é melhor no android, pois o desenvolvimento todo foi pensando apenas nessa plataforma;
2 - O Banco de Dados utilizado foi o Firebase (Auth e Firestore);
3 - Na parte de UI (User Interface) foi-se usado o Native Base;
4 - Biblioteca para gerenciamento de Estados: REDUX;
5 - Algumas outras libs.

## Executando

Para configuração, faça as seguintes instalações mostradas no [site](http://davifelipe.com.br/iniciando-com-react-native).

Em seguida, entre na pasta do projeto e execute o comando: 
### `yarn install`

Logo após isso, é só executar o projeto: 
### `react-native run-android`

### OBS: Caso tenha algum problema relacionado a gradlew, siga o passo a seguir: 
Execute: `cd android` (para acessar a pasta do android), e depois o comando `gradlew clean`.
De preferência execute no CMD (caso esteja no windows);
