export const maxChars = 12000

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0)

type Props = {
  notes: string
  onChange: (notes: string) => void
  isSaved: boolean
  onSave: () => void
  onNew: () => void
}

const iconProps = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

const actionButton = 'inline-flex items-center gap-2 rounded-md border border-ink bg-sheet px-3 py-1.5 text-sm font-medium transition-colors hover:bg-rule disabled:cursor-not-allowed disabled:border-rule disabled:text-ink-soft disabled:opacity-60 disabled:hover:bg-sheet'

export default function NotesInput({ notes, onChange, isSaved, onSave, onNew }: Props) {
  const over = notes.length > maxChars
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="notes" className="font-semibold">Your notes</label>
        <div className="flex gap-2">
          <button type="button" onClick={onNew} className={actionButton}>
            <svg {...iconProps}><path d="M12 5v14M5 12h14" /></svg>
            New note
          </button>
          <button type="button" onClick={onSave} disabled={!notes.trim()} className={actionButton}>
            <svg {...iconProps}>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M17 21v-8H7v8M7 3v5h8" />
            </svg>
            {isSaved ? 'Update note' : 'Save note'}
          </button>
        </div>
      </div>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your study notes here"
        className="ruled mt-2 block h-80 w-full resize-y rounded-lg border border-rule shadow-sm lg:h-[26rem]"
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
