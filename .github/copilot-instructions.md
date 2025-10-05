# Instruções rápidas para agentes de código (projeto: Página de Captura)

Este projeto é uma landing estática construída com HTML, SASS (compilado para CSS) e JS simples. Abaixo estão os pontos essenciais para ser produtivo rapidamente sem pedir contexto extra.

- Big picture

  - Arquitetura: site estático. SASS fonte em `sass/` -> compilado para `css/` (veja `package.json` scripts). HTML está no root (`inscricao.html`, `popup-aula.html`). JS está em `js/scripts.js`.
  - Por que: organização facilita edição de estilos via SASS (módulos: `abstracts/`, `base/`, `components/`, `layout/`, `pages/`) e mantém CSS compilado pronto para produção em `css/`.

- Comandos de desenvolvedor (essenciais)

  - Compilar CSS (três passos encadeados): `npm run build:css` (executa `compile:sass`, `prefix:css`, `compress:css`).
  - Modo watch (recompila automaticamente): `npm run watch:sass`.
  - Observação: comandos usam `sass`, `postcss` e `autoprefixer`. Em PowerShell basta rodar os comandos acima a partir da raiz do projeto.

- Convenções do projeto

  - SASS modular: altere estilos em `sass/` (ex.: `sass/pages/_inscricao.scss` para a hero e backgrounds). Nunca modifique manualmente `css/style.css` como fonte primária — ele é gerado.
  - Nomenclatura de classes: estilo BEM-like (`bloco__elemento--modificador`), por exemplo `.caixa__h1`, `.popup__botao--amarelo`.
  - JS com hooks de comportamento: botões que abrem/fecham popup usam a classe `js-botao` e o script simplesmente faz `document.body.classList.toggle('popup--aberto')` (veja `js/scripts.js`). Mantenha esses hooks quando refatorar markup.

- Padrões e arquivos-chave (referências rápidas)

  - `sass/main.scss` — ponto de entrada SASS; importa `abstracts`, `base`, `layout`, `components` e `pages`.
  - `sass/abstracts/_helpers.scss` — mixins e variáveis (ex.: `respond`, `flex`) — mude aqui se precisar de breakpoints ou utilitários.
  - `js/scripts.js` — comportamento do popup. Alterações JS mínimas; preferir adicionar classes e hooks em vez de ligar lógica ao seletor por estilos.
  - `inscricao.html` — arquivo HTML principal; demonstra lazy-loading de imagens, preload de `css/style.css` e pré-carregamento das fontes Google com `onload`.

- Integrações externas e pontos sensíveis

  - Fontes: Google Fonts carregadas por `link` com `rel=preload` + `onload` para performance. Preserve essa estratégia ao alterar fonts.
  - Recursos externos: várias imagens e thumbs usam URLs externas (Webflow assets e YouTube links). Checar CORS/paths antes de substituir.
  - Mapas e arquivos intermediários: `css/style.comp.css` e `css/style.prefix.css` são artefatos intermediários usados pelo fluxo de build.

- Regras práticas para agentes

  - Quando alterar estilos: editar SASS e executar `npm run build:css` (ou `npm run watch:sass` para dev). Commitar SASS e, quando aprovada, atualizar CSS compilado se for política do repositório.
  - Nota sobre alinhamento flex: evite usar o valor CSS lógico `start` ao passar argumentos para o mixin `flex` — prefira `flex-start` (ex.: `@include flex($align: flex-start)`), pois `start` tem suporte misto em alguns navegadores e gera avisos do Autoprefixer.

  - Exemplo prático (SASS):

```scss
// mixin (em `sass/abstracts/_helpers.scss`)
@mixin flex($direction: row, $wrap: nowrap, $align: stretch, $justify: flex-start, $gap: 0) { ... }

// uso recomendado
@include flex($direction: column, $align: flex-start, $gap: 1.6rem);
```

- Ao tocar no JS: preserve a classe `js-botao` e a dependência de `popup--aberto`. Se for substituir o mecanismo, atualize ambos `inscricao.html` e `js/scripts.js` na mesma PR.
- Evitar mudanças nos arquivos compilados a menos que a tarefa seja explicitamente sobre o CSS final; preferir mudanças na fonte (`sass/`).

- Pequeno contrato de mudança (use isto em PR descrições)
  - Input: arquivos em `sass/`, `inscricao.html`, `js/scripts.js`.
  - Output esperado: estilos atualizados compilando sem erros; comportamento do popup preservado; página principal (`inscricao.html`) renderizando corretamente localmente.
  - Critérios de aceitação: `npm run build:css` conclui sem erro e `inscricao.html` abre no navegador com popup funcionando.

## Checklist de PR (verificação rápida)

Antes de abrir a PR, confirme o seguinte:

- [ ] Rode `npm run build:css` e confirme que termina sem erros.
- [ ] Não commite mudanças manuais em `css/style.css` — edite apenas `sass/` e gere o CSS.
- [ ] Verificação funcional: abra `inscricao.html` localmente e valide:
  - botão principal `Quero participar!` abre o `popup` e o botão de fechar (classe `js-botao`) funciona;
  - imagens críticas e backgrounds carregam (verificar hero e seção `secao--quem`) e thumbnails usam `loading="lazy"` quando apropriado;
- [ ] Verificação de compatibilidade: evite valores CSS lógicos ambíguos (use `flex-start` em vez de `start`) e rode o build para checar avisos do Autoprefixer;
- [ ] Alterações JS: preserve hooks (`js-botao`, `popup--aberto`) ou atualize o HTML e `js/scripts.js` na mesma PR;
- [ ] Atualize qualquer URL externo com cuidado — confirme CORS e paths antes de substituir imagens hospedadas externamente;
- [ ] Faça um review rápido em mobile (reduza a janela do navegador) para confirmar breakpoints (`respond` mixin) não foram quebrados.

Se algo acima estiver ambíguo ou se quiser que eu ajuste o tom/detalhamento (ex.: incluir exemplos de PRs, git hooks, ou checklists de revisão), diga o que prefere e eu atualizo o arquivo.
