import type { Multiplicacao } from "../modelos/associacao.ts";

interface Props {
  multiplicacao: Multiplicacao;
  selecionada: boolean;
  aoSelecionar: (id: string) => void;
  aoIniciarArrasto: (id: string, e: React.DragEvent) => void;
}

export function CartaoMultiplicacao({ multiplicacao, selecionada, aoSelecionar, aoIniciarArrasto }: Props) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(e) => aoIniciarArrasto(multiplicacao.id, e)}
      onClick={() => aoSelecionar(multiplicacao.id)}
      aria-pressed={selecionada}
      aria-label={`MULTIPLICAÇÃO ${multiplicacao.rotulo}. TOQUE PARA SELECIONAR E DEPOIS TOQUE NO GRUPO DE FIGURAS.`}
      className={
        "flex w-full min-h-16 cursor-grab items-center justify-between rounded-2xl border-2 border-dashed px-4 py-4 " +
        "text-left text-2xl font-bold shadow-sm transition active:cursor-grabbing " +
        (selecionada
          ? "border-violet-700 bg-violet-100 ring-2 ring-violet-300"
          : "border-slate-300 bg-white hover:border-violet-400 hover:bg-violet-50")
      }
    >
      <span>{multiplicacao.rotulo}</span>
      <span className="text-sm font-medium text-slate-500">= ?</span>
      {selecionada && (
        <span className="rounded-full bg-violet-700 px-2.5 py-1 text-xs text-white">
          TOQUE NO GRUPO
        </span>
      )}
    </button>
  );
}
