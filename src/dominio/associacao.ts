import type { GrupoFiguras, Multiplicacao } from "../modelos/associacao.ts";

export function criarMultiplicacoes(): Multiplicacao[] {
  return [
    { id: "m-2x3", fatorA: 2, fatorB: 3, valor: 6, rotulo: "2 × 3" },
    { id: "m-1x4", fatorA: 1, fatorB: 4, valor: 4, rotulo: "1 × 4" },
    { id: "m-3x3", fatorA: 3, fatorB: 3, valor: 9, rotulo: "3 × 3" },
    { id: "m-2x5", fatorA: 2, fatorB: 5, valor: 10, rotulo: "2 × 5" },
    { id: "m-4x2", fatorA: 4, fatorB: 2, valor: 8, rotulo: "4 × 2" },
  ];
}

export function criarGrupos(): GrupoFiguras[] {
  return [
    { id: "g-4", valor: 4, figura: "⬛", nomeFiguras: "QUADRADOS" },
    { id: "g-6", valor: 6, figura: "⭐", nomeFiguras: "ESTRELAS" },
    { id: "g-8", valor: 8, figura: "🔷", nomeFiguras: "LOSANGOS" },
    { id: "g-9", valor: 9, figura: "🔺", nomeFiguras: "TRIÂNGULOS" },
    { id: "g-10", valor: 10, figura: "🟩", nomeFiguras: "QUADRADOS VERDES" },
  ];
}

export function associacaoEstaCorreta(multiplicacao: Multiplicacao, grupo: GrupoFiguras): boolean {
  return multiplicacao.valor === grupo.valor;
}

export function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function repetirFigura(figura: string, quantidade: number): string {
  return figura.repeat(quantidade);
}
