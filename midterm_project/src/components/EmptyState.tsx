export default function EmptyState() {
  return (
    <div className="rounded-lg border-2 border-dashed border-rule bg-sheet/50 p-8">
      <p className="font-serif text-xl leading-relaxed">
        Each question shows its source sentence with the <mark className="marker">answer highlighted</mark>, so you can see what the model was asked about.
      </p>
      <ol className="mt-5 grid gap-3 text-sm text-ink-soft sm:grid-cols-3">
        {['Paste your notes or pick a sample.', 'Press Generate questions.', 'Check each score and verdict.'].map((step, i) => (
          <li key={step} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
