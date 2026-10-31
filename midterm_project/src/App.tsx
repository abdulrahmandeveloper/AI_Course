import { useEffect, useState } from 'react'
import type { Connection, GenerateResponse } from './types.ts'
import { generate, testConnection } from './api.ts'
import { downloadCsv } from './csv.ts'
import sampleNotes from './sampleNotes.ts'
import ApiBar from './components/ApiBar.tsx'
import Controls from './components/Controls.tsx'
import EmptyState from './components/EmptyState.tsx'
import NotesInput, { maxChars } from './components/NotesInput.tsx'
import QuestionCard from './components/QuestionCard.tsx'
import Summary from './components/Summary.tsx'

const minChars = 20

const readStored = (key: string) => {
  try {
    return localStorage.getItem(key) ?? ''
  } catch {
    return ''
  }
}

const writeStored = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    // storage blocked: the page still works, it just forgets
  }
}

const errorText = (err: unknown) => (err instanceof Error ? err.message : String(err))

const notChecked: Connection = { state: 'idle', text: 'Not checked' }

export default function App() {
  const [apiUrl, setApiUrl] = useState(() => readStored('apiUrl'))
  const [notes, setNotes] = useState(() => readStored('notes'))
  const [numQuestions, setNumQuestions] = useState(5)
  const [quizMode, setQuizMode] = useState(false)
  const [connection, setConnection] = useState<Connection>(notChecked)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<GenerateResponse | null>(null)
  const [error, setError] = useState('')
  const [revealed, setRevealed] = useState<Set<number>>(new Set())

  useEffect(() => writeStored('apiUrl', apiUrl), [apiUrl])
  useEffect(() => writeStored('notes', notes), [notes])

  const changeApiUrl = (url: string) => {
    setApiUrl(url)
    setConnection(notChecked)
  }

  const runTest = async () => {
    setConnection({ state: 'checking', text: 'Checking…' })
    try {
      const health = await testConnection(apiUrl)
      setConnection({ state: 'ok', text: `Connected · ${health.model} on ${health.device}` })
    } catch (err) {
      setConnection({ state: 'error', text: `Not reachable · ${errorText(err)}` })
    }
  }

  const runGenerate = async () => {
    setStatus('loading')
    setError('')
    try {
      const data = await generate(apiUrl, notes, numQuestions)
      setResult(data)
      setRevealed(new Set())
      setStatus('done')
    } catch (err) {
      setError(errorText(err))
      setStatus('error')
    }
  }

  const toggleReveal = (i: number) =>
    setRevealed((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const loading = status === 'loading'
  const tooShort = notes.length < minChars
  const hint = tooShort ? `Add at least ${minChars} characters of notes to generate questions.` : ''
  const questions = status === 'done' && result ? result.questions : []
  const hasQuestions = result !== null && questions.length > 0

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-serif text-4xl font-semibold">Notes to Questions</h1>
          <p className="mt-2 max-w-md text-ink-soft">
            Paste your study notes and get quiz questions, each checked for relevance and correctness.
          </p>
        </div>
        <ApiBar apiUrl={apiUrl} onApiUrlChange={changeApiUrl} connection={connection} onTest={runTest} />
      </header>

      <main className="mt-8 grid gap-8 lg:grid-cols-12">
        <section className="lg:sticky lg:top-6 lg:col-span-5 lg:self-start">
          <NotesInput notes={notes} onChange={setNotes} onUseSample={() => setNotes(sampleNotes)} />
          <Controls
            numQuestions={numQuestions}
            onNumQuestions={setNumQuestions}
            quizMode={quizMode}
            onQuizMode={setQuizMode}
            onGenerate={runGenerate}
            loading={loading}
            disabled={loading || tooShort || notes.length > maxChars}
            hint={hint}
          />
        </section>

        <section className="lg:col-span-7" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Questions</h2>
            {hasQuestions && (
              <button type="button" onClick={() => downloadCsv(questions)} className="rounded text-sm font-medium underline underline-offset-2 hover:text-ink-soft">
                Download CSV
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-col gap-4">
            {status === 'idle' && <EmptyState />}
            {loading &&
              Array.from({ length: Math.min(3, numQuestions) }, (_, i) => (
                <div key={i} className="pulse-soft h-40 rounded-lg border border-rule bg-sheet p-5" aria-hidden="true">
                  <div className="h-6 w-3/4 rounded bg-rule" />
                  <div className="mt-4 h-4 w-full rounded bg-rule" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-rule" />
                </div>
              ))}
            {status === 'error' && (
              <div role="alert" className="rounded-lg border border-weak/30 bg-weak/10 p-4 text-weak">
                {error}
              </div>
            )}
            {status === 'done' && questions.length === 0 && (
              <div className="rounded-lg border border-rule bg-sheet p-5">
                No questions came out of these notes. Try longer notes with full sentences and named facts.
              </div>
            )}
            {!loading && hasQuestions && result && (
              <>
                <Summary summary={result.summary} />
                {questions.map((q, i) => (
                  <QuestionCard
                    key={`${i}-${q.question}`}
                    q={q}
                    index={i}
                    quizMode={quizMode}
                    revealed={revealed.has(i)}
                    onToggle={() => toggleReveal(i)}
                  />
                ))}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
