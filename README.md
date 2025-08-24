# Maracount CLI

Esta é uma adaptação do Maracount para interfaces CLI.
Utilize de comandos para visualizar, editar, ou deletar os filmes do Maracount.

## Exemplos

O seguinte exemplo lista filmes que coincidem com a pesquisa "Manikômio" e que são da turma 426:

```bash
maracount list --search Manikômio --class 426
```

O próximo exemplo lista o placar do Maracount, ordenado por views:

```bash
maracount leaderboard --sort-by views
```

## Roadmap do projeto

- [x] Listar filmes
- [x] Listar um filme em específico
- [x] Listar placar
- [ ] Gerar gráfico em ASCII com base em registros diários
- [ ] Logar como Admin
- [ ] Adicionar filmes
- [ ] Editar filmes existentes
- [ ] Deletar filmes
