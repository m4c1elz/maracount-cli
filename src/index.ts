#!/usr/bin/env node

import { Command } from 'commander'
import { listAction } from './actions/list'

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

program.parse()
