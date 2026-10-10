import type { GrupoFiguras, Multiplicacao } from "../modelos/associacao.ts";
import { repetirFigura } from "../dominio/associacao.ts";

interface Props {
  grupo: GrupoFiguras;
  associada: Multiplicacao | null;
  emDestaque: boolean;
  comErro: boolean;
  aoSoltar: (grupo: GrupoFiguras, e: React.DragEvent) => void;
  aoPassarPorCima: (grupo: GrupoFiguras, e: React.DragEvent) => void;
  aoSairDeCima: () => void;
  aoAtivar: (grupo: GrupoFiguras) => void;
}

export function GrupoFiguras({ grupo, associada, emDestaque, comErro, aoSoltar, aoPassarPorCima, aoSairDeCima, aoAtivar }: Props) {
  const concluido = associada !== null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={
        concluido
          ? `GRUPO COM ${grupo.valor} ${grupo.nomeFiguras}. ASSOCIADO A ${associada.rotulo}.`
          : `GRUPO COM ${grupo.valor} ${grupo.nomeFiguras}. SOLTE AQUI A CONTA QUE RESULTA EM ${grupo.valor}.`
      }
      onDragOver={(e) => aoPassarPorCima(grupo, e)}
      onDragLeave={aoSairDeCima}
      onDrop={(e) => aoSoltar(grupo, e)}
      onClick={() => aoAtivar(grupo)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          aoAtivar(grupo);
        }
      }}
      className={
        "rounded-2xl border-2 p-4 shadow-sm transition " +
        (concluido
          ? "border-green-500 bg-green-50"
          : comErro
            ? "animate-pulse border-red-500 bg-red-50"
            : emDestaque
              ? "scale-[1.01] border-violet-600 bg-violet-50"
              : "border-slate-200 bg-white hover:border-violet-300")
      }
    >
      <div className="flex items-center justify-between">
        <span className={`text-sm font-bold ${concluido ? "text-green-700" : "text-slate-500"}`}>
          {concluido ? `✔ CORRETO! ${associada.rotulo} = ${grupo.valor}` : `${grupo.valor} ${grupo.nomeFiguras}`}
        </span>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-600 shadow-sm">
          {grupo.valor}
        </span>
      </div>
      <div className="mt-2 text-2xl leading-relaxed break-words" aria-hidden="true">
        {repetirFigura(grupo.figura, grupo.valor)}
      </div>
      {!concluido && (
        <p className="mt-2 text-xs text-slate-400">SOLTE AQUI A CONTA QUE DÁ {grupo.valor}</p>
      )}
    </div>
  );
}
