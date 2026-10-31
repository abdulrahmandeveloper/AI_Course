import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Question } from '../src/types.ts'

const port = 8000
const delayMs = 1000

const bank: Question[] = [
  { question: 'What organelle produces most of the cell\'s ATP?', answer: 'mitochondria', context: 'The mitochondria produce most of the cell\'s ATP through aerobic respiration.', relevance: 0.812, correctness: 1, qa_answer: 'mitochondria', qa_confidence: 0.94, verdict: 'good' },
  { question: 'Who proposed the theory of natural selection?', answer: 'Charles Darwin', context: 'Charles Darwin proposed the theory of natural selection in 1859.', relevance: 0.774, correctness: 1, qa_answer: 'Charles Darwin', qa_confidence: 0.97, verdict: 'good' },
  { question: 'When was the theory of natural selection published?', answer: '1859', context: 'Charles Darwin proposed the theory of natural selection in 1859.', relevance: 0.69, correctness: 1, qa_answer: '1859', qa_confidence: 0.91, verdict: 'good' },
  { question: 'What pigment captures light energy in plants?', answer: 'chlorophyll', context: 'Chlorophyll captures light energy during photosynthesis in the chloroplasts.', relevance: 0.731, correctness: 0.67, qa_answer: 'chlorophyll in the chloroplasts', qa_confidence: 0.72, verdict: 'good' },
  { question: 'What does DNA stand for?', answer: 'deoxyribonucleic acid', context: 'DNA, or deoxyribonucleic acid, stores genetic information in nearly all living organisms.', relevance: 0.58, correctness: 1, qa_answer: 'deoxyribonucleic acid', qa_confidence: 0.88, verdict: 'good' },
  { question: 'Where does photosynthesis take place?', answer: 'chloroplasts', context: 'Chlorophyll captures light energy during photosynthesis in the chloroplasts.', relevance: 0.33, correctness: 0.8, qa_answer: 'in the chloroplasts', qa_confidence: 0.6, verdict: 'check' },
  { question: 'What is the powerhouse of the cell?', answer: 'aerobic respiration', context: 'The mitochondria produce most of the cell\'s ATP through aerobic respiration.', relevance: 0.46, correctness: 0.12, qa_answer: 'mitochondria', qa_confidence: 0.81, verdict: 'check' },
  { question: 'What is stored in nearly all?', answer: 'genetic information', context: 'DNA, or deoxyribonucleic acid, stores genetic information in nearly all living organisms.', relevance: 0.21, correctness: 0, qa_answer: 'DNA', qa_confidence: 0.18, verdict: 'weak' },
]

const send = (res: ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  })
  res.end(JSON.stringify(body))
}

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve) => {
    let data = ''
    req.on('data', (chunk: Buffer) => (data += chunk))
    req.on('end', () => resolve(data))
  })

const invalid = (loc: string, msg: string) => ({ detail: [{ loc: ['body', loc], msg, type: 'value_error' }] })

// Weak and check questions are placed so they show up even for small counts.
const pickQuestions = (n: number) => {
  const order = [0, 5, 1, 7, 2, 3, 6, 4]
  return order.slice(0, n).map((i) => bank[i])
}

const handleGenerate = async (req: IncomingMessage, res: ServerResponse) => {
  let body
  try {
    body = JSON.parse(await readBody(req))
  } catch {
    return send(res, 422, invalid('body', 'Input should be a valid JSON object'))
  }
  const notes = body.notes
  const n = body.num_questions ?? 5
  if (typeof notes !== 'string' || notes.length < 20 || notes.length > 12000) {
    return send(res, 422, invalid('notes', 'String should have at least 20 characters'))
  }
  if (!Number.isInteger(n) || n < 1 || n > 15) {
    return send(res, 422, invalid('num_questions', 'Input should be between 1 and 15'))
  }
  setTimeout(() => {
    const questions = pickQuestions(n)
    const avg = questions.reduce((s, q) => s + q.relevance, 0) / questions.length
    const correct = questions.filter((q) => q.correctness >= 0.5).length
    send(res, 200, {
      questions,
      summary: {
        count: questions.length,
        avg_relevance: Math.round(avg * 1000) / 1000,
        pct_correct: Math.round((correct / questions.length) * 1000) / 10,
        seconds: 1.04,
      },
    })
  }, delayMs)
}

createServer((req, res: ServerResponse) => {
  if (req.method === 'OPTIONS') return send(res, 204, {})
  if (req.method === 'GET' && req.url === '/health') {
    return send(res, 200, { status: 'ok', model: 'mock flan-t5-base (fixed sample questions)', device: 'cpu' })
  }
  if (req.method === 'POST' && req.url === '/generate') return handleGenerate(req, res)
  send(res, 404, { detail: 'Not Found' })
}).listen(port, () => console.log(`Mock API on http://localhost:${port}`))
