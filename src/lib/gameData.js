import { Circle, Diamond, Square, Star, Triangle } from 'lucide-react'

export const MULTIPLICATIONS = [
  { id: 'm-2x3', a: 2, b: 3, value: 6, label: '2 × 3' },
  { id: 'm-1x4', a: 1, b: 4, value: 4, label: '1 × 4' },
  { id: 'm-3x3', a: 3, b: 3, value: 9, label: '3 × 3' },
  { id: 'm-2x5', a: 2, b: 5, value: 10, label: '2 × 5' },
  { id: 'm-4x2', a: 4, b: 2, value: 8, label: '4 × 2' },
]

export const TARGETS = [
  {
    id: 't-4',
    value: 4,
    Icon: Square,
    colorClass: 'text-zinc-800',
    bgClass: 'bg-zinc-100',
    name: 'quadrados',
  },
  {
    id: 't-6',
    value: 6,
    Icon: Star,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-50',
    name: 'estrelas',
  },
  {
    id: 't-8',
    value: 8,
    Icon: Diamond,
    colorClass: 'text-sky-600',
    bgClass: 'bg-sky-50',
    name: 'losangos',
  },
  {
    id: 't-9',
    value: 9,
    Icon: Triangle,
    colorClass: 'text-rose-500',
    bgClass: 'bg-rose-50',
    name: 'triângulos',
  },
  {
    id: 't-10',
    value: 10,
    Icon: Circle,
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    name: 'círculos',
  },
]

export function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
