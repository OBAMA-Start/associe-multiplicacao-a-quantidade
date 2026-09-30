import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpenCheck, Lightbulb } from 'lucide-react'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-700"
      >
        <ArrowLeft className="size-4" /> Voltar
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="flex items-center gap-2 text-2xl font-extrabold">
          <BookOpenCheck className="size-6 text-indigo-600" />
          Sobre a atividade
        </h1>
        <p className="mt-3 text-slate-600">
          Esta atividade é a recriação moderna do{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
            original.html
          </code>
          , que usava arrastar-e-soltar nativo com 5 multiplicações e 5 grupos
          de figuras (4, 6, 8, 9 e 10 itens).
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong>Coluna esquerda:</strong> sentenças 2 × 3, 1 × 4, 3 × 3, 2 ×
            5, 4 × 2.
          </li>
          <li>
            <strong>Coluna direita:</strong> grupos com 4, 6, 8, 9 e 10 figuras
            (agora em ícones Lucide acessíveis).
          </li>
          <li>
            <strong>Regra:</strong> só o par com o mesmo valor é aceito; erro
            mostra feedback sem apagar o progresso.
          </li>
        </ul>

        <div className="mt-6 flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <Lightbulb className="size-6 shrink-0" />
          <p>
            Dica para o professor: peça para o aluno ler em voz alta “2 vezes 3
            é igual a 6” antes de arrastar. Depois, conte as figuras junto com a
            turma para validar.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-bold">Tecnologias</h2>
        <p className="mt-2 text-sm text-slate-600">
          React + React Router (rotas / /jogar /sobre) + TailwindCSS v4 +
          Lucide React (ícones) + Vite. Suporte a arrastar-e-soltar e toque,
          placar, embaralhar e reiniciar.
        </p>
      </div>
    </div>
  )
}
