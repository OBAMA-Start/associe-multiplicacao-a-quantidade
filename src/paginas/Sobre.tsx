import { useNavigate } from "react-router";
import apoio from "../assets/apoio.png";
import bg from "../assets/bg.jpeg";

export function Sobre() {
  const navigate = useNavigate();

  return (
    <main className="relative bg-violet-100 min-h-screen w-screen pt-24 px-6 pb-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <article className="relative p-8 md:mx-auto w-2xl max-w-full bg-violet-900 text-white rounded-2xl border-violet-600 shadow-lg hover:shadow-2xl transition-all">
        <h1 className="font-bold text-4xl">Sobre e Créditos</h1>
        <p className="mt-4 max-w-xl">
          Este é um Objeto de Aprendizagem produzido no Esteamulab/IMD/UFRN. A atividade associa cada
          multiplicação (2 × 3, 1 × 4, 3 × 3, 2 × 5, 4 × 2) ao grupo com a quantidade correta de
          figuras (4, 6, 8, 9 e 10).
        </p>

        <section className="mt-8" aria-label="Autoria">
          <h2 className="font-bold text-2xl">Autoria</h2>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Luana Araújo</li>
          </ul>
        </section>

        <section className="mt-6" aria-label="Desenvolvimento e revisão">
          <h2 className="font-bold text-2xl">Desenvolvimento e revisão</h2>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Isaque Dantas</li>
          </ul>
        </section>

        <section className="mt-6" aria-label="Habilidades BNCC">
          <h2 className="font-bold text-2xl">Habilidades BNCC</h2>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>EF02MA07 — Resolver e elaborar problemas de multiplicação com a ideia de adição de parcelas iguais.</li>
            <li>EF02MA08 — Resolver e elaborar problemas de dobro, metade, triplo e terça parte.</li>
            <li>EF03MA07 — Resolver e elaborar problemas de multiplicação com os significados de adição de parcelas iguais e disposição retangular.</li>
          </ul>
        </section>

        <section className="mt-6" aria-label="Apoio">
          <h2 className="font-bold text-2xl">Apoio</h2>
          <img
            src={apoio}
            alt="Logotipos das instituições apoiadoras: Inovática, Sedis, Capes, UFRN, Obama, PPGITE e Metrópole Digital"
            className="mt-4 w-full rounded-xl bg-white p-4"
          />
        </section>

        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Voltar para o início"
          className="mt-8 w-full bg-violet-200 hover:bg-violet-300 text-violet-900 text-center rounded-xl font-bold px-4 py-2 text-xl shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-400 min-h-14"
        >
          Voltar para o início
        </button>
      </article>
    </main>
  );
}
