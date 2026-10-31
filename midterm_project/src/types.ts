export type Verdict = 'good' | 'check' | 'weak'

export type Question = {
  question: string
  answer: string
  context: string
  relevance: number
  correctness: number
  qa_answer: string
  qa_confidence: number
  verdict: Verdict
}

export type Summary = {
  count: number
  avg_relevance: number
  pct_correct: number
  seconds: number
}

export type GenerateResponse = {
  questions: Question[]
  summary: Summary
}

export type Health = {
  status: string
  model: string
  device: 'cuda' | 'cpu'
}

export type ConnectionState = 'idle' | 'checking' | 'ok' | 'error'

export type Connection = {
  state: ConnectionState
  text: string
}
