import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  GripVertical,
  PartyPopper,
  RotateCcw,
  Shuffle,
  TriangleAlert,
  Trophy,
  XCircle,
} from 'lucide-react'
import { MULTIPLICATIONS, TARGETS, shuffle } from '../lib/gameData.js'

export default function Game() {
  const [itemsOrder, setItemsOrder] = useState(() => shuffle(MULTIPLICATIONS))
  const [targetsOrder, setTargetsOrder] = useState(() => shuffle(TARGETS))
  const [matched, setMatched] = useState({}) // value -> multiplicationId
  const [selectedId, setSelectedId] = useState(null)
  const [dragOverValue, setDragOverValue] = useState(null)
  const [errorValue, setErrorValue] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [errors, setErrors] = useState(0)
  const [feedback, setFeedback] = useState(null) // { type: 'success'|'error', text }

  const total = MULTIPLICATIONS.length
  const hits = Object.keys(matched).length
  const finished = hits === total
  const progress = useMemo(() => Math.round((hits / total) * 100), [hits, total])

  function reset(full = true) {
    setMatched({})
    setSelectedId(null)
    setAttempts(0)
    setErrors(0)
    setFeedback(null)
    setErrorValue(null)
    if (full) {
      setItemsOrder(shuffle(MULTIPLICATIONS))
      setTargetsOrder(shuffle(TARGETS))
    }
  }

  function tryMatch(item, target) {
    if (!item || !target) return
    if (matched[target.value]) return
    setAttempts((a) => a + 1)

    if (item.value === target.value) {
      setMatched((m) => ({ ...m, [target.value]: item.id }))
      setSelectedId(null)
      setFeedback({ type: 'success', text: `Correto! ${item.label} = ${target.value}` })
    } else {
      setErrors((e) => e + 1)
      setErrorValue(target.value)
      setFeedback({
        type: 'error',
        text: `Ops! ${item.label} não é ${target.value}. Tente novamente!`,
      })
      setTimeout(() => setErrorValue((v) => (v === target.value ? null : v)), 600)
    }
  }

  function handleDrop(e, target) {
    e.preventDefault()
    setDragOverValue(null)
    const id = e.dataTransfer.getData('text/multiplication-id') || selectedId
    const item = MULTIPLICATIONS.find((m) => m.id === id)
    if (item) tryMatch(item, target)
  }

  const remainingItems = itemsOrder.filter((m) => !Object.values(matched).includes(m.id))

  return (
    <div className="space-y-6">
      {/* Header / score */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold md:text-3xl">
            Associe a Multiplicação à Quantidade
          </h1>
          <p className="text-sm text-slate-600">
            Arraste ou toque: ligue cada conta ao grupo com o número certo de figuras.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setItemsOrder(shuffle(MULTIPLICATIONS))
              setTargetsOrder(shuffle(TARGETS))
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
          >
            <Shuffle className="size-4" /> Embaralhar
          </button>
          <button
            onClick={() => reset(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <RotateCcw className="size-4" /> Reiniciar
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="inline-flex items-center gap-2">
            <Trophy className="size-4 text-amber-500" />
            {hits} de {total} corretos
          </span>
          <span className="text-slate-500">
            {attempts} tentativas • {errors} erros
          </span>
        </div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        {feedback && (
          <p
            role="status"
            className={`mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="size-4" />
            ) : (
              <XCircle className="size-4" />
            )}
            {feedback.text}
          </p>
        )}
      </div>

      {finished ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-500 text-white">
            <PartyPopper className="size-7" />
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-emerald-900">
            Parabéns! Você acertou tudo!
          </h2>
          <p className="mt-1 text-emerald-800">
            {total} associações em {attempts} tentativas com {errors} erro(s).
          </p>
          <button
            onClick={() => reset(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700"
          >
            <RotateCcw className="size-4" /> Jogar novamente
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Multiplicações */}
          <section aria-label="Multiplicações">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Multiplicações ({remainingItems.length})
            </h2>
            <div className="space-y-3">
              {remainingItems.length === 0 && (
                <p className="text-sm text-slate-500">Todas associadas!</p>
              )}
              {remainingItems.map((item) => {
                const isSelected = selectedId === item.id
                return (
                  <button
                    key={item.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/multiplication-id', item.id)
                      e.dataTransfer.effectAllowed = 'move'
                      setSelectedId(item.id)
                    }}
                    onDragEnd={() => setDragOverValue(null)}
                    onClick={() => setSelectedId(isSelected ? null : item.id)}
                    aria-pressed={isSelected}
                    className={`group flex w-full cursor-grab items-center justify-between rounded-2xl border-2 border-dashed px-4 py-4 text-left text-lg font-bold shadow-sm transition active:cursor-grabbing ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                        : 'border-slate-300 bg-white hover:border-indigo-300 hover:bg-indigo-50/50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <GripVertical className="size-5 text-slate-400 group-hover:text-indigo-400" />
                      {item.label}
                      <span className="text-xs font-medium text-slate-400">
                        = ?
                      </span>
                    </span>
                    {isSelected && (
                      <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs text-white">
                        Toque no grupo
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Dica: no computador arraste; no celular toque na conta e depois no grupo.
            </p>
          </section>

          {/* Figuras */}
          <section aria-label="Grupos de figuras">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Quantidade de figuras
            </h2>
            <div className="space-y-3">
              {targetsOrder.map((target) => {
                const isDone = Boolean(matched[target.value])
                const matchedItem = MULTIPLICATIONS.find(
                  (m) => m.id === matched[target.value],
                )
                const isOver = dragOverValue === target.value
                const isError = errorValue === target.value
                const Icon = target.Icon
                return (
                  <div
                    key={target.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Grupo com ${target.value} ${target.name}`}
                    onDragOver={(e) => {
                      e.preventDefault()
                      if (!isDone) setDragOverValue(target.value)
                    }}
                    onDragLeave={() => setDragOverValue(null)}
                    onDrop={(e) => handleDrop(e, target)}
                    onClick={() => {
                      if (isDone) return
                      const item = MULTIPLICATIONS.find((m) => m.id === selectedId)
                      if (item) tryMatch(item, target)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        const item = MULTIPLICATIONS.find((m) => m.id === selectedId)
                        if (item) tryMatch(item, target)
                      }
                    }}
                    className={`rounded-2xl border-2 p-4 transition ${
                      isDone
                        ? 'border-emerald-400 bg-emerald-50'
                        : isError
                          ? 'animate-pulse border-rose-400 bg-rose-50'
                          : isOver
                            ? 'border-indigo-500 bg-indigo-50 scale-[1.01]'
                            : 'border-slate-200 bg-white hover:border-indigo-300'
                    } ${target.bgClass} shadow-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700">
                            <CheckCircle2 className="size-4" /> Correto!{' '}
                            {matchedItem?.label} = {target.value}
                          </span>
                        ) : (
                          `${target.value} ${target.name}`
                        )}
                      </span>
                      <span className="rounded-full bg-white/70 px-2 py-0.5 text-xs font-bold text-slate-600 shadow-sm">
                        {target.value}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
                      {Array.from({ length: target.value }).map((_, i) => (
                        <Icon
                          key={i}
                          className={`size-6 ${target.colorClass}`}
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    {!isDone && (
                      <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                        <TriangleAlert className="size-3.5" />
                        Solte aqui a conta que dá {target.value}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
