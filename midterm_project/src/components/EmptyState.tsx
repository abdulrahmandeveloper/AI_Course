export default function EmptyState() {
  return (
    <div className="rounded-lg border-2 border-dashed border-rule p-8">
      <p className="font-serif text-xl leading-relaxed">
        Each question shows its source sentence with the <mark className="marker">answer highlighted</mark>, so you can see what the model was asked about.
      </p>
      <p className="mt-3 text-ink-soft">Paste your notes on the left and press Generate questions.</p>
    </div>
  )
}
