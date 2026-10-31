import type { Summary as SummaryData } from '../types.ts'

export default function Summary({ summary }: { summary: SummaryData }) {
  const stats: [string | number, string][] = [
    [summary.count, summary.count === 1 ? 'question' : 'questions'],
    [summary.avg_relevance.toFixed(2), 'average relevance'],
    [`${Math.round((summary.pct_correct / 100) * summary.count)} of ${summary.count}`, 'answerable from notes'],
    [`${summary.seconds.toFixed(1)} s`, 'generation time'],
  ]
  return (
    <dl className="grid grid-cols-2 gap-4 rounded-lg border border-rule bg-sheet p-4 shadow-sm sm:grid-cols-4">
      {stats.map(([value, label]) => (
        <div key={label}>
          <dd className="text-2xl font-semibold">{value}</dd>
          <dt className="text-sm text-ink-soft">{label}</dt>
        </div>
      ))}
    </dl>
  )
}
