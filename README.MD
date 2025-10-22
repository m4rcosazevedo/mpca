# 

## ✅ Primeira vez que for publicar o pacote, rode o comando na raiz
```bash
npm run build
```

## ✅ Primeira publicação de cada pacote
Na primeira vez que publicar cada pacote, vá em cada pasta e rode:

```bash
npm publish --access public
```
Depois disso, o changeset publish fará o trabalho sozinho nas próximas versões.


## ✅ Publicação passo a passo
1) Crie um changeset quando alterar pacotes:

```bash
npm run changeset
```
2) Isso cria um arquivo YAML dentro de *.changeset/* — você pode commitar normalmente.

3) Quando quiser liberar tudo no NPM:

```bash
npm run release
```
Isso:
- Atualiza a versão de cada pacote.
- Gera changelogs.
- Compila com tsc.
- Publica no NPM.
