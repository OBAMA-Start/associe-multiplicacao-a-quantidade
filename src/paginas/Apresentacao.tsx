import { useNavigate } from "react-router";
import bg from "../assets/bg.jpeg";

export function Apresentacao() {
  const navigate = useNavigate();

  return (
    <main className="texto-pedagogico relative bg-violet-100 min-h-screen w-screen pt-40 px-6 pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <article className="relative p-8 md:mx-auto w-2xl max-w-full bg-violet-900 text-white rounded-2xl border-violet-600 shadow-lg hover:shadow-2xl transition-all">
        <h1 className="font-bold text-4xl">ASSOCIE A MULTIPLICAÇÃO À QUANTIDADE</h1>
        <p className="mt-4 max-w-md">
          ARRASTE CADA MULTIPLICAÇÃO ATÉ O GRUPO COM A QUANTIDADE CERTA DE FIGURAS E DESCUBRA QUE MULTIPLICAR É CONTAR GRUPOS IGUAIS.
        </p>
        <p className="mt-4 max-w-md font-bold">HABILIDADES BNCC: EF02MA07, EF02MA08, EF03MA07</p>
        <ul className="mt-8 flex flex-col text-violet-900 space-y-6">
          <li>
            <button
              type="button"
              onClick={() => navigate("/conteudo")}
              aria-label="INICIAR A ATIVIDADE"
              className="w-full bg-violet-200 hover:bg-violet-300 text-center rounded-xl font-bold px-4 py-2 text-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-400 min-h-14"
            >
              INICIAR
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => navigate("/sobre")}
              aria-label="VER CRÉDITOS"
              className="w-full bg-violet-200 hover:bg-violet-300 text-center rounded-xl font-bold px-4 py-2 text-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-400 min-h-14"
            >
              CRÉDITOS
            </button>
          </li>
        </ul>
      </article>
    </main>
  );
}
