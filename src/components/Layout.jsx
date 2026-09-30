import { NavLink, Outlet } from 'react-router-dom'
import { Calculator, GraduationCap } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <NavLink to="/" className="flex items-center gap-2 font-bold">
            <span className="grid size-9 place-items-center rounded-xl bg-indigo-600 text-white">
              <Calculator className="size-5" />
            </span>
            <span className="leading-tight">
              Multiplica
              <span className="block text-xs font-medium text-slate-500">
                Associe à Quantidade
              </span>
            </span>
          </NavLink>

          <nav className="flex items-center gap-1 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Início
            </NavLink>
            <NavLink
              to="/jogar"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Jogar
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              Sobre
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <GraduationCap className="size-4" />
            Recurso didático — multiplicação como soma de parcelas iguais
          </p>
          <p>Baseado em original.html</p>
        </div>
      </footer>
    </div>
  )
}
