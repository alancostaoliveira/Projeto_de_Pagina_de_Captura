<!-- Use este template para PRs que mudam SASS, HTML ou JS da landing -->

# Descrição

Breve descrição das mudanças:

## Tipo de mudança

- [ ] Bugfix
- [ ] Nova funcionalidade (não quebra compatibilidade)
- [ ] Refactor / limpeza
- [ ] Documentação / instruções

## Checklist técnico (obrigatório)

- [ ] Rodei `npm run build:css` e não houve erros
- [ ] Não commitei mudanças manuais em `css/style.css` (apenas SASS alterado)
- [ ] Verifiquei e, se necessário, substituí `start` por `flex-start` ao usar o mixin `flex`

## Testes manuais / QA (obrigatório)

- [ ] Abri `inscricao.html` localmente e testei o botão principal `Quero participar!` (popup abre/fecha)
- [ ] Verifiquei imagens e backgrounds (hero e `secao--quem`) e thumbnails com `loading="lazy"`
- [ ] Testei responsividade (reduzir largura da janela / mobile)

## Observações adicionais

- Atualize URLs externos com cuidado (confirme CORS e paths) quando substituir imagens hospedadas externamente.
- Se alterou JS que controla o popup, atualize `inscricao.html` e `js/scripts.js` na mesma PR.
- Opcional: rodar `npx update-browserslist-db@latest` localmente para atualizar caniuse-lite e reduzir avisos informativos do build.

Obrigado! :rocket:
