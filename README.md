# EcoIA

Aplicativo web que identifica objetos recicláveis pela câmera do celular e indica em qual lixeira da coleta seletiva descartar. O resultado também pode ser falado em voz alta.

**Site:** https://marinolh03.github.io/ecoia/

## Classes reconhecidas

| Objeto | Lixeira |
|---|---|
| Garrafa de Plástico | Vermelha (plástico) |
| Garrafa de Vidro | Verde (vidro) |
| Caixa de Papelão | Azul (papel e papelão) |
| Sem Objeto | Nenhuma |

## Como funciona

1. A pessoa tira uma foto pelo botão **Tirar foto**.
2. Um modelo de classificação de imagens, treinado no [Teachable Machine](https://teachablemachine.withgoogle.com/), analisa a foto no próprio navegador.
3. A página mostra o objeto identificado, a porcentagem de cada classe e a cor da lixeira.

A foto não é enviada para nenhum servidor.

## Tecnologias

- HTML, CSS e JavaScript puro
- [TensorFlow.js](https://www.tensorflow.org/js) e [@teachablemachine/image](https://github.com/googlecreativelab/teachablemachine-community), carregados por CDN
- Web Speech API, para a leitura em voz alta

## Estrutura

```
index.html      estrutura da página
style.css       visual
script.js       lógica do app
model/          modelo exportado do Teachable Machine
```

## Executar localmente

Por causa do carregamento do modelo, a página precisa de um servidor local (não abra o `index.html` com duplo clique):

```
python -m http.server
```

Depois abra `http://localhost:8000`. É necessária conexão com a internet para baixar as bibliotecas.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
