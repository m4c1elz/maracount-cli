#!/usr/bin/env node

import { Command } from 'commander'
import { listAction } from './actions/list'
import { viewAction } from './actions/view'
import { leaderboardAction } from './actions/leaderboard'

const program = new Command()

program
    .name('maracount')
    .description('Use o Maracount na sua interface CLI.')
    .version('0.1.0')

program
    .command('list')
    .description('Listar os filmes disponíveis do Maracannes')
    .option('-p, --page [number]', 'Página a listar os filmes')
    .option('-s, --search [query]', 'Pesquisar por um filme em específico')
    .option(
        '-c, --class [class]',
        'Pesquisar por filmes de uma turma em específico',
    )
    .action(listAction)

program
    .command('view')
    .description('Ver um filme em específico')
    .argument('<id>', 'ID do filme. Obrigatório.')
    .action(viewAction)

program
    .command('leaderboard')
    .description('Mostrar o placar de filmes do Maracount.')
    .option('-s, --search [query]', 'Pesquisar por um filme')
    .option('-c, --class [class]', 'Pesquisar por uma turma')
    .option(
        "--sort-by ['views' | 'likes]'",
        `Ordenar por visualizações ou curtidas. 
        Deve ser 'views' ou 'likes' se especificado. 
        Valores diferentes serão ignorados.`,
        'likes',
    )
    .action(leaderboardAction)

program.parse()
