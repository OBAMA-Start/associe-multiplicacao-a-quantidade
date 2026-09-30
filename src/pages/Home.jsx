import { Link } from 'react-router-dom'
import {
  ArrowRight,
  GripVertical,
  MousePointerClick,
  Play,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { MULTIPLICATIONS } from '../lib/gameData.js'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 p-8 text-white shadow-lg md:p-12">
        <div className="max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            <Sparkles className="size-4" />
            Anos iniciais • Matemática
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Associe a Multiplicação à Quantidade de Figuras
          </h1>
          <p className="text-indigo-100 md:text-lg">
            Arraste cada multiplicação até o grupo com a quantidade correta de
            figuras. Aprenda que {MULTIPLICATIONS[0].label} é o mesmo que contar{' '}
            {MULTIPLICATIONS[0].value} figuras.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/jogar"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-indigo-700 shadow hover:bg-indigo-50"
            >
              <Play className="size-5" />
              Começar agora
            </Link>
            <Link
              to="/sobre"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Como funciona
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-100 text-indigo-700">
            <GripVertical className="size-5" />
          </span>
          <h2 className="mt-3 font-bold">1. Arraste</h2>
          <p className="mt-1 text-sm text-slate-600">
            Segure um cartão como <strong>2 × 3</strong> e solte sobre o grupo
            de figuras correspondente.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
            <MousePointerClick className="size-5" />
          </span>
          <h2 className="mt-3 font-bold">2. Ou toque</h2>
          <p className="mt-1 text-sm text-slate-600">
            No celular, toque na multiplicação e depois no grupo de figuras para
            associar.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
            <Trophy className="size-5" />
          </span>
          <h2 className="mt-3 font-bold">3. Complete</h2>
          <p className="mt-1 text-sm text-slate-600">
            Acerte as 5 associações: 4, 6, 8, 9 e 10 figuras. Erros não
            bloqueiam — tente de novo!
          </p>
        </div>
      </section>

      <section className="flex items-center gap-3 rounded-2xl border border-dashed border-indigo-300 bg-indigo-50 p-5 text-sm text-indigo-900">
        <Target className="size-8 shrink-0 text-indigo-600" />
        <p>
          <strong>Objetivo pedagógico:</strong> compreender a multiplicação como
          adição de parcelas iguais e associar a sentença matemática (ex.: 4 ×
          2) à sua representação em quantidades.
        </p>
      </section>
    </div>
  )
}
