export const maxChars = 12000

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0)

type Props = { notes: string; onChange: (notes: string) => void; onUseSample: () => void }

export default function NotesInput({ notes, onChange, onUseSample }: Props) {
  const over = notes.length > maxChars
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor="notes" className="font-semibold">Your notes</label>
        <button type="button" onClick={onUseSample} className="rounded text-sm font-medium underline underline-offset-2 hover:text-ink-soft">
          Use sample notes
        </button>
      </div>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your study notes here"
        className="ruled mt-2 block h-80 w-full resize-y rounded-lg border border-rule"
      />
      <p className="mt-2 flex justify-between text-sm text-ink-soft">
        <span>{countWords(notes).toLocaleString()} words</span>
        <span className={over ? 'font-semibold text-weak' : ''}>
          {notes.length.toLocaleString()} / {maxChars.toLocaleString()}
        </span>
      </p>
    </div>
  )
}
