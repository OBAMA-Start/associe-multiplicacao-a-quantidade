interface Props {
  tipo: "acerto" | "erro";
  texto: string;
}

export function FeedbackAssociacao({ tipo, texto }: Props) {
  const correta = tipo === "acerto";
  return (
    <p
      role="status"
      aria-live="polite"
      className={
        "mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold " +
        (correta ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")
      }
    >
      {correta ? "✔ " : "✘ "}
      {texto}
    </p>
  );
}
