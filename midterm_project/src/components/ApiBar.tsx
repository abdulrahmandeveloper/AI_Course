import type { Connection, ConnectionState } from '../types.ts'

const dotColor: Record<ConnectionState, string> = {
  idle: 'bg-ink-soft',
  checking: 'bg-check',
  ok: 'bg-good',
  error: 'bg-weak',
}

type Props = {
  apiUrl: string
  onApiUrlChange: (url: string) => void
  connection: Connection
  onTest: () => void
}

export default function ApiBar({ apiUrl, onApiUrlChange, connection, onTest }: Props) {
  const { state, text } = connection
  return (
    <div className="w-full lg:max-w-md">
      <label htmlFor="api-url" className="block text-sm font-medium text-ink-soft">
        API link from Colab
      </label>
      <div className="mt-1 flex gap-2">
        <input
          id="api-url"
          type="url"
          value={apiUrl}
          onChange={(e) => onApiUrlChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onTest()}
          placeholder="https://…trycloudflare.com"
          className="min-w-0 flex-1 rounded-md border border-rule bg-sheet px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={onTest}
          className="rounded-md border border-ink bg-sheet px-3 py-2 text-sm font-medium hover:bg-rule"
        >
          Test connection
        </button>
      </div>
      <p className="mt-2 flex items-start gap-2 text-sm text-ink-soft" aria-live="polite">
        <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotColor[state]}`} />
        <span className="break-words min-w-0">{text}</span>
      </p>
    </div>
  )
}
