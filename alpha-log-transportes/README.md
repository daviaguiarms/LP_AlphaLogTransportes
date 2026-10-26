# Alpha Log Transportes

Landing page desenvolvida com foco em conversão de solicitações de cotação para uma transportadora B2B fictícia.

## Tecnologias

- HTML5 semântico
- CSS3 com Custom Properties, Grid e Flexbox
- JavaScript vanilla

## Recursos

Layout responsivo, formulário de cotação com validação, integração com WhatsApp, navegação mobile, FAQ acessível por teclado, SEO básico, foco visível e suporte a movimento reduzido. Fotografias WebP locais e Manrope variável com WOFF2 prioritário e TTF como fallback; nenhuma dependência de execução ou build. Fonte e imagens funcionam offline.

## Como executar

Abra `index.html` diretamente ou utilize Live Server. Opcionalmente, execute `python -m http.server 8765` nesta pasta e acesse `http://localhost:8765`.

## WhatsApp

O modo demonstrativo abre o compartilhamento do WhatsApp com os dados preenchidos, sem telefone de terceiro e sem envio automático. O visitante escolhe o destinatário e confirma o envio no WhatsApp. Um link permanece disponível caso a nova janela seja bloqueada.

Para uso real, configure `WHATSAPP_NUMBER` em `assets/js/main.js` com DDI, DDD e número, somente dígitos, e atualize os dois links de fallback `data-whatsapp` no HTML. Não há backend, armazenamento local ou analytics. Sem JavaScript, os links de WhatsApp continuam disponíveis e o envio do formulário permanece desabilitado. O FAQ funciona nativamente, com apenas a primeira resposta aberta inicialmente.

## Estrutura

- `index.html`: seções independentes, preparadas para futura conversão em template-parts ou blocos WordPress.
- `assets/css/style.css`: tokens, componentes, seções e ajustes responsivos.
- `assets/js/main.js`: menu, FAQ, validação e mensagem de cotação.
- `assets/images/`: fotografias WebP locais.
- `assets/icons/`: símbolo original em SVG, também utilizado como favicon.
- `assets/fonts/`: Manrope variável em WOFF2/TTF e licença OFL.

## Imagens e fonte

Fotografias ilustrativas, sem representar instalações ou veículos próprios da empresa:

- Hero: [Nishat Samadzai — Two white trucks driving on a highway](https://unsplash.com/photos/two-white-trucks-driving-on-a-highway-neCb34TcLEg), [arquivo de origem](https://images.unsplash.com/photo-1778629794381-d3ae4a54311c).
- Operação: [fotografia de centro logístico no Unsplash](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d).
- Fotografias sob a [licença Unsplash](https://unsplash.com/license), baixadas e convertidas para WebP.
- [Manrope / Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), SIL Open Font License; licença incluída em `assets/fonts/OFL.txt`.

## Antes de publicar

Configure o contato comercial autorizado e o domínio definitivo. Canonical, `og:url` e `og:image` absoluto foram omitidos até existir um domínio. Os dados comerciais e métricas seguem exclusivamente o briefing fictício; valide-os para qualquer uso real.
