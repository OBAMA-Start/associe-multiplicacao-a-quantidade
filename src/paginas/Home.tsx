import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../componentes/Header.tsx";
import { CartaoMultiplicacao } from "../componentes/CartaoMultiplicacao.tsx";
import { GrupoFiguras } from "../componentes/GrupoFiguras.tsx";
import { FeedbackAssociacao } from "../componentes/FeedbackAssociacao.tsx";
import {
  associacaoEstaCorreta,
  criarGrupos,
  criarMultiplicacoes,
  embaralhar,
} from "../dominio/associacao.ts";
import type { GrupoFiguras as TipoGrupo, Multiplicacao } from "../modelos/associacao.ts";

export function Home() {
  const navigate = useNavigate();
  const [ordemMultiplicacoes, setOrdemMultiplicacoes] = useState<Multiplicacao[]>(() =>
    embaralhar(criarMultiplicacoes()),
  );
  const [ordemGrupos, setOrdemGrupos] = useState<TipoGrupo[]>(() => embaralhar(criarGrupos()));
  const [associados, setAssociados] = useState<Record<number, string>>({});
  const [selecionadoId, setSelecionadoId] = useState<string | null>(null);
  const [sobreValor, setSobreValor] = useState<number | null>(null);
  const [erroValor, setErroValor] = useState<number | null>(null);
  const [tentativas, setTentativas] = useState(0);
  const [erros, setErros] = useState(0);
  const [feedback, setFeedback] = useState<{ tipo: "acerto" | "erro"; texto: string } | null>(null);

  const total = ordemMultiplicacoes.length;
  const acertos = Object.keys(associados).length;
  const concluiu = acertos === total;
  const progresso = useMemo(() => Math.round((acertos / total) * 100), [acertos, total]);

  function reiniciar(embaralharTudo: boolean) {
    setAssociados({});
    setSelecionadoId(null);
    setTentativas(0);
    setErros(0);
    setFeedback(null);
    setErroValor(null);
    setSobreValor(null);
    if (embaralharTudo) {
      setOrdemMultiplicacoes(embaralhar(criarMultiplicacoes()));
      setOrdemGrupos(embaralhar(criarGrupos()));
    }
  }

  function tentarAssociar(item: Multiplicacao | undefined, grupo: TipoGrupo) {
    if (!item || associados[grupo.valor]) return;
    setTentativas((t) => t + 1);

    if (associacaoEstaCorreta(item, grupo)) {
      setAssociados((m) => ({ ...m, [grupo.valor]: item.id }));
      setSelecionadoId(null);
      setFeedback({ tipo: "acerto", texto: `CORRETO! ${item.rotulo} = ${grupo.valor}` });
    } else {
      setErros((e) => e + 1);
      setErroValor(grupo.valor);
      setFeedback({ tipo: "erro", texto: `TENTE NOVAMENTE! ${item.rotulo} NÃO É ${grupo.valor}.` });
      window.setTimeout(() => {
        setErroValor((v) => (v === grupo.valor ? null : v));
      }, 700);
    }
  }

  function buscarSelecionada(): Multiplicacao | undefined {
    return criarMultiplicacoes().find((m) => m.id === selecionadoId);
  }

  function aoIniciarArrasto(id: string, e: React.DragEvent) {
    e.dataTransfer.setData("text/multiplicacao-id", id);
    e.dataTransfer.effectAllowed = "move";
    setSelecionadoId(id);
  }

  function aoSoltar(grupo: TipoGrupo, e: React.DragEvent) {
    e.preventDefault();
    setSobreValor(null);
    const id = e.dataTransfer.getData("text/multiplicacao-id") || selecionadoId;
    const item = criarMultiplicacoes().find((m) => m.id === id);
    tentarAssociar(item, grupo);
  }

  const restantes = ordemMultiplicacoes.filter((m) => !Object.values(associados).includes(m.id));
  const botaoSecundario =
    "px-4 py-3 border-2 border-violet-700 text-violet-700 text-lg font-bold rounded-lg cursor-pointer " +
    "hover:bg-violet-700 hover:text-white transition-all min-h-14";

  return (
    <div className="texto-pedagogico">
      <Header />
      <div className="px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="VOLTAR PARA O INÍCIO"
          className="underline font-bold text-violet-700 italic cursor-pointer min-h-11"
        >
          VOLTAR PARA O INÍCIO
        </button>
      </div>

      <main className="m-6 space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-bold text-lg">
              {acertos} DE {total} CORRETOS
            </p>
            <p className="text-slate-500 font-bold">
              {tentativas} TENTATIVAS • {erros} ERROS
            </p>
          </div>
          <div
            className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={progresso}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`PROGRESSO: ${progresso} POR CENTO`}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-green-500 transition-all"
              style={{ width: `${progresso}%` }}
            />
          </div>
          {feedback && <FeedbackAssociacao tipo={feedback.tipo} texto={feedback.texto} />}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setOrdemMultiplicacoes(embaralhar(criarMultiplicacoes()));
                setOrdemGrupos(embaralhar(criarGrupos()));
              }}
              aria-label="EMBARALHAR CARTÕES"
              className={botaoSecundario}
            >
              EMBARALHAR
            </button>
            <button
              type="button"
              onClick={() => reiniciar(true)}
              aria-label="REINICIAR ATIVIDADE"
              className={botaoSecundario}
            >
              REINICIAR
            </button>
          </div>
        </section>

        {concluiu ? (
          <section className="rounded-2xl border border-green-300 bg-green-50 p-8 text-center shadow-sm" aria-label="ATIVIDADE CONCLUÍDA">
            <p className="text-5xl" aria-hidden="true">🎉</p>
            <h2 className="mt-4 text-2xl font-bold text-green-900">PARABÉNS! VOCÊ ACERTOU TUDO!</h2>
            <p className="mt-2 font-bold text-green-800">
              {total} ASSOCIAÇÕES EM {tentativas} TENTATIVAS COM {erros} ERRO(S).
            </p>
            <button
              type="button"
              onClick={() => reiniciar(true)}
              aria-label="JOGAR NOVAMENTE"
              className="mt-4 rounded-xl bg-green-600 px-5 py-3 min-h-14 font-bold text-white hover:bg-green-700"
            >
              JOGAR NOVAMENTE
            </button>
          </section>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <section aria-label="MULTIPLICAÇÕES">
              <h2 className="mb-3 text-sm font-bold tracking-wide text-slate-500">
                MULTIPLICAÇÕES ({restantes.length})
              </h2>
              <div className="space-y-3">
                {restantes.length === 0 && <p className="font-bold text-slate-500">TODAS ASSOCIADAS!</p>}
                {restantes.map((item) => (
                  <CartaoMultiplicacao
                    key={item.id}
                    multiplicacao={item}
                    selecionada={selecionadoId === item.id}
                    aoSelecionar={(id) => setSelecionadoId((atual) => (atual === id ? null : id))}
                    aoIniciarArrasto={aoIniciarArrasto}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs font-bold text-slate-500">
                DICA: NO COMPUTADOR ARRASTE. NO CELULAR TOQUE NA CONTA E DEPOIS NO GRUPO.
              </p>
            </section>

            <section aria-label="GRUPOS DE FIGURAS">
              <h2 className="mb-3 text-sm font-bold tracking-wide text-slate-500">QUANTIDADE DE FIGURAS</h2>
              <div className="space-y-3">
                {ordemGrupos.map((grupo) => {
                  const associadaId = associados[grupo.valor];
                  const associada = associadaId
                    ? criarMultiplicacoes().find((m) => m.id === associadaId) ?? null
                    : null;
                  return (
                    <GrupoFiguras
                      key={grupo.id}
                      grupo={grupo}
                      associada={associada}
                      emDestaque={sobreValor === grupo.valor}
                      comErro={erroValor === grupo.valor}
                      aoSoltar={aoSoltar}
                      aoPassarPorCima={(g, e) => {
                        e.preventDefault();
                        if (!associados[g.valor]) setSobreValor(g.valor);
                      }}
                      aoSairDeCima={() => setSobreValor(null)}
                      aoAtivar={(g) => tentarAssociar(buscarSelecionada(), g)}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
