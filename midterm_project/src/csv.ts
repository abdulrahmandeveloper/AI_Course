import type { Question } from './types.ts'

const quote = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`

const columns: [string, keyof Question][] = [
  ['question', 'question'],
  ['answer', 'answer'],
  ['source sentence', 'context'],
  ['relevance', 'relevance'],
  ['correctness', 'correctness'],
  ['QA answer', 'qa_answer'],
  ['verdict', 'verdict'],
]

export const toCsv = (questions: Question[]) => {
  const header = columns.map(([title]) => quote(title)).join(',')
  const rows = questions.map((q) => columns.map(([, key]) => quote(q[key])).join(','))
  return `﻿${[header, ...rows].join('\r\n')}`
}

export const downloadCsv = (questions: Question[]) => {
  const url = URL.createObjectURL(new Blob([toCsv(questions)], { type: 'text/csv;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'questions.csv'
  link.click()
  URL.revokeObjectURL(url)
}
