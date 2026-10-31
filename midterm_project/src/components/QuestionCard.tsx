import type { CSSProperties } from 'react'
import type { Question, Verdict } from '../types.ts'
import Highlighted from './Highlighted.tsx'

const verdicts: Record<Verdict, { label: string; cls: string }> = {
  good: { label: 'Relevant and answerable', cls: 'bg-good/10 text-good' },
  check: { label: 'Worth a second look', cls: 'bg-check/10 text-check' },
  weak: { label: 'Weak question', cls: 'bg-weak/10 text-weak' },
}

function Meter({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-semibold">{value.toFixed(2)}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-rule">
        <div className="h-full rounded-full bg-ink" style={{ width: `${Math.min(1, Math.max(0, value)) * 100}%` }} />
      </div>
      <p className="mt-1 text-sm text-ink-soft">{hint}</p>
    </div>
  )
}

type Props = {
  q: Question
  index: number
  quizMode: boolean
  revealed: boolean
  onToggle: () => void
}

export default function QuestionCard({ q, index, quizMode, revealed, onToggle }: Props) {
  const hidden = quizMode && !revealed
  const verdict = verdicts[q.verdict] ?? verdicts.weak
  return (
    <article className="fade-up flex gap-4 rounded-lg border border-rule bg-sheet p-5 shadow-sm" style={{ '--i': index } as CSSProperties}>
      <span className="w-7 shrink-0 text-sm font-semibold text-ink-soft">Q{index + 1}</span>
      <div className="min-w-0 flex-1">
        <h3 className="font-serif text-[22px] font-semibold leading-snug">{q.question}</h3>
        <p className="mt-3 font-serif leading-8 text-ink-soft">
          <Highlighted context={q.context} answer={q.answer} hidden={hidden} />
        </p>
        {!hidden && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Meter label="Relevance" value={q.relevance} hint="How close the question is to this part of your notes" />
            <Meter label="Correctness" value={q.correctness} hint={`A QA model answered "${q.qa_answer}"`} />
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!hidden && (
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${verdict.cls}`}>{verdict.label}</span>
          )}
          {quizMode && (
            <button type="button" onClick={onToggle} className="rounded-md border border-ink px-3 py-1 text-sm font-medium hover:bg-rule">
              {revealed ? 'Hide answer' : 'Show answer'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
