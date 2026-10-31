import type { GenerateResponse, Health } from './types.ts'

type ValidationItem = { loc?: unknown[]; msg: string }

const trimUrl = (url: string) => url.trim().replace(/\/+$/, '')

const networkMessage = (url: string) =>
  `Can't reach ${url}. Check that the server cell is still running in Colab and the link is current.`

// FastAPI 422 body: { detail: [{ loc, msg }] }
const validationMessage = (detail: unknown) => {
  if (!Array.isArray(detail)) return 'The API rejected the request.'
  const parts = (detail as ValidationItem[]).map((d) => {
    const field = Array.isArray(d.loc) ? d.loc[d.loc.length - 1] : ''
    return field && field !== 'body' ? `${field}: ${d.msg}` : d.msg
  })
  return `${parts.join('; ')}.`
}

const errorFromResponse = async (res: Response) => {
  const body = await res.json().catch(() => null)
  if (res.status === 422) return validationMessage(body?.detail)
  if (typeof body?.detail === 'string') return body.detail
  return `The API answered with status ${res.status}.`
}

const request = async <T>(apiUrl: string, path: string, options?: RequestInit): Promise<T> => {
  const url = trimUrl(apiUrl)
  if (!url) throw new Error('Add the API link from Colab first.')
  let res: Response
  try {
    res = await fetch(`${url}${path}`, options)
  } catch {
    throw new Error(networkMessage(url))
  }
  if (!res.ok) throw new Error(await errorFromResponse(res))
  return res.json()
}

export const testConnection = (apiUrl: string) => request<Health>(apiUrl, '/health')

export const generate = (apiUrl: string, notes: string, numQuestions: number) =>
  request<GenerateResponse>(apiUrl, '/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ notes, num_questions: numQuestions }),
  })
