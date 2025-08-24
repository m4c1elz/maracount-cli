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

O exemplo a seguir mostra o gráfico ao longo do tempo de views/likes do filme de ID 81, iniciando da data 10/03/2023 em UTC:

```bash
maracount view 81 --graph --from 2023-03-10T15:00:00.000Z
```

## Roadmap do projeto

- [x] Listar filmes
- [x] Listar um filme em específico
- [x] Listar placar
- [x] Gerar gráfico em ASCII com base em registros diários
- [ ] Logar como Admin
- [ ] Adicionar filmes
- [ ] Editar filmes existentes
- [ ] Deletar filmes
