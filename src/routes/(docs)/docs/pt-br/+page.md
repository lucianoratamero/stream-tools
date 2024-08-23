<svelte:head>
	<title>stream-tools: docs</title>
</svelte:head>

<script lang="ts">
	import NavLinks from '$lib/components/NavLinks.svelte';
</script>

<div
	class="fixed md:sticky md:top-0 md:block w-full flex left-0 flex-col justify-center items-center bottom-0 py-4 bg-white">
	<h1 class="mb-2">stream-tools</h1>
	<nav class="flex md:justify-start md:gap-4 flex-wrap justify-center items-center gap-2">
		<NavLinks />
	</nav>
</div>

esta é uma série de páginas com efeitos que eu uso nas minhas lives na Twitch. você não precisa baixar e rodar o código, porque todas as funcionalidades estão em https://lucianoratamero.github.io/stream-tools/ . só adicionar elas ao seu OBS (ou qualquer outro que você use) como uma fonte de navegador (browser source).

eles podem funcionar em qualquer setup de live, desde que você siga a documentação ;]

se você tiver alguma dúvida, basta abrir uma issue e eu responderei quando puder :)

## opções

todas as opções para as páginas são passadas como parâmetros de busca (search params). você não precisa realmente saber o que são parâmetros de busca - eles são apenas opções passadas na URL. mas se você quiser saber mais sobre eles, pode ler [isto](https://www.cloudmarket.com.br/marketing-digital/blog/glossario/o-que-e-query-string-parte-de-uma-url-que-contem-dados-especificos-geralmente-apos-um/).

um bom exemplo de um parâmetro de busca é `?channel=luciano_ratamero`. este é um parâmetro de busca que diz à página para carregar o chat do canal `luciano_ratamero`. se você precisar passar mais opções, pode fazer assim: `?channel=luciano_ratamero&theme=pixel`, adicionando um caractere `&` antes de cada um dos parâmetros.

## páginas

### bokeh-experiments

este foi o primeiro efeito, anteriormente implementado em Imba, agora em Svelte 5 + canvas. ele seleciona aleatoriamente uma paleta de cores e renderiza bolhas coloridas que desaparecem com o tempo.

#### caminhos

##### `/bokeh/`

se você clicar no fundo da página, um formulário aparece com configurações que são salvas no localStorage.

esta página aceita um parâmetro de busca `bookmark`, que carrega um marcador de paleta de cores salvo anteriormente.

também aceita um parâmetro `decay`, que altera a velocidade com que os círculos desaparecem (torna a animação mais rápida).

esta página também aceita um parâmetro de busca `numberOfCircles`, que altera o limite de número de círculos renderizados.

também aceita um parâmetro de busca `transparentBg`, que torna o fundo transparente.

exemplo: [https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5](https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5)

##### `/bokeh/create/`

esta página oferece as ferramentas para criar suas próprias paletas de cores.

##### `/bokeh/history/`

esta página permite visualizar as paletas de cores selecionadas anteriormente. útil para quando você encontra uma paleta que realmente gosta, mas esqueceu de savlar como bookmark.

### lastfm now playing

esta página mostra a música que está tocando atualmente no last.fm. é uma página simples que usa a API do last.fm para mostrar a música em tempo real.

se você não conhece o last.fm, ele é compatível com todos os principais aplicativos de música e é uma ótima maneira de acompanhar o que você está ouvindo.

#### caminhos

##### `/lastfm-now-playing/`

esta página aceita um parâmetro de busca `username`, que é o nome de usuário do last.fm que você deseja assistir a música que está tocando atualmente.

você também precisará de um parâmetro de busca `api_key`. para obter uma api key, você precisa criar uma conta no last.fm e depois ir para [esta página](https://www.last.fm/api/account/create).

### twitch chat

esta página mostra o chat da Twitch. é uma página simples que usa a API do chat da Twitch para mostrar o chat em tempo real.

há apenas um tema disponível (`pixel`), mas, se você quiser mais, pode alterar o tema editando o arquivo `src/routes/twitch-chat/TwitchChat.svelte`. estarei adicionando mais temas em breve.

#### caminhos

##### `/twitch-chat/`

esta página aceita um parâmetro de busca `channel`, que é o canal do qual você deseja assistir o chat. se você tiver emotes do betterttv ou frankerfacez, eles também serão renderizados. para emotes do betterttv, você também precisa passar o parâmetro de busca `twitch_id`, que você pode encontrar [aqui](https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/).

também aceita um parâmetro de busca `theme`, que altera o tema do chat. os temas disponíveis são: `pixel`.

também recebe um parâmetro de busca `messageScreenTime`, que altera o tempo que as mensagens são exibidas na tela.

também recebe um parâmetro de busca `align`, que altera o alinhamento do chat. os alinhamentos disponíveis são: `top`, `bottom`. o padrão é `bottom`.

exemplo: [https://lucianoratamero.github.io/stream-tools/twitch-chat/?channel=luciano_ratamero&theme=pixel&messageScreenTime=6000](https://lucianoratamero.github.io/stream-tools/twitch-chat/?channel=luciano_ratamero&theme=pixel&messageScreenTime=6000)

### effects

esta página oferece vários overlays (sobreposições) com efeitos. cada efeito é ativado por seu próprio parâmetro de busca.

#### caminhos

##### `/effects/`

por padrão, a página não tem nenhum efeito ativado. você pode ativá-los passando parâmetros de busca.

###### `CRT`

este efeito é ativado passando o parâmetro `crt`. ele carrega uma textura CRT, emulando monitores/TVs antigos.

este efeito também aceita um parâmetro `openGUI`, que abre um formulário com configurações.

exemplo: [https://lucianoratamero.github.io/stream-tools/effects/?crt](https://lucianoratamero.github.io/stream-tools/effects/?crt)

###### `Confetti`

este efeito é ativado passando o parâmetro `confetti`. ele carrega um efeito de cascata de confetes. recomendamos usar uma fonte de navegador de 1920x1080 para obter os melhores resultados.

exemplo: [https://lucianoratamero.github.io/stream-tools/effects/?confetti](https://lucianoratamero.github.io/stream-tools/effects/?confetti)

###### `bokeh`

este é o mesmo efeito do caminho `/bokeh` (na verdade, ele carrega um iframe). aceita as mesmas opções de parâmetros de busca que `/bokeh`.

exemplo: [https://lucianoratamero.github.io/stream-tools/effects/?bokeh&bookmark=dark-pink&decay=1.5](https://lucianoratamero.github.io/stream-tools/bokeh/?bookmark=dark-pink&decay=1.5)

### timer

esta página oferece um cronômetro regressivo. por padrão, também emite um efeito sonoro quando a contagem regressiva termina (pode assustar você, mas você pode desativá-lo :3).

#### caminhos

##### `/timer/`

o cronômetro aceita dois parâmetros de busca: `timeInSeconds` e `noAudio`.

`timeInSeconds` é literalmente em quantos segundos você quer que a contagem regressiva começe.

`noAudio` desativa o alerta sonoro no final do cronômetro.

exemplo: [https://lucianoratamero.github.io/stream-tools/timer/?timeInSeconds=6](https://lucianoratamero.github.io/stream-tools/timer/?timeInSeconds=6)


## Desenvolvendo/Contribuindo

```bash
# instalar dependências - enquanto o svelte 5 não é lançado, precisamos forçar a instalação
npm install --force
# iniciar o servidor de desenvolvimento
npm run dev
# construir para produção
npm run build
```

<div class="pb-24 md:p-0"></div>
