type Props = {
  numQuestions: number
  onNumQuestions: (n: number) => void
  quizMode: boolean
  onQuizMode: (on: boolean) => void
  onGenerate: () => void
  loading: boolean
  disabled: boolean
  hint: string
}

export default function Controls({ numQuestions, onNumQuestions, quizMode, onQuizMode, onGenerate, loading, disabled, hint }: Props) {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-3">
          <label htmlFor="num-questions" className="text-sm font-medium">Questions</label>
          <input
            id="num-questions"
            type="range"
            min="1"
            max="10"
            value={numQuestions}
            onChange={(e) => onNumQuestions(Number(e.target.value))}
            className="w-32 accent-ink"
          />
          <output htmlFor="num-questions" className="w-5 text-sm font-semibold">{numQuestions}</output>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={quizMode}
            onChange={(e) => onQuizMode(e.target.checked)}
            className="h-4 w-4 accent-ink"
          />
          Quiz mode
        </label>
      </div>
      <button
        type="button"
        onClick={onGenerate}
        disabled={disabled}
        className="mt-4 w-full rounded-md bg-ink px-4 py-3 font-semibold text-white hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Generating questions…' : 'Generate questions'}
      </button>
      {hint && <p className="mt-2 text-sm text-ink-soft">{hint}</p>}
    </div>
  )
}
