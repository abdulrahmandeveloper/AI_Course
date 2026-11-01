import { useState } from 'react'
import type { SavedNote } from '../types.ts'
import type { SampleNote } from '../sampleNotes.ts'

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0)

type NotesLibraryProps = {
  saved: SavedNote[]
  samples: SampleNote[]
  currentId: string | null
  onOpen: (note: SavedNote) => void
  onDelete: (id: string) => void
  onUseSample: (sample: SampleNote) => void
}

const linkButton = 'rounded text-sm font-medium underline underline-offset-2 hover:text-ink-soft disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50'
const pillButton = 'rounded-md border border-ink px-3 py-1 text-sm font-medium hover:bg-rule'

export default function NotesLibrary({ saved, samples, currentId, onOpen, onDelete, onUseSample }: NotesLibraryProps) {
  const [tab, setTab] = useState<'saved' | 'samples'>('saved')
  const tabClass = (name: string) =>
    `-mb-px border-b-2 px-1 pb-2 text-sm font-semibold ${tab === name ? 'border-ink' : 'border-transparent text-ink-soft hover:text-ink'}`

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-rule bg-sheet shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-x-4 border-b border-rule px-4 pt-3">
        <div role="tablist" aria-label="Notes library" className="flex gap-4">
          <button type="button" role="tab" id="tab-saved" aria-selected={tab === 'saved'} aria-controls="panel-library" onClick={() => setTab('saved')} className={tabClass('saved')}>
            Saved notes ({saved.length})
          </button>
          <button type="button" role="tab" id="tab-samples" aria-selected={tab === 'samples'} aria-controls="panel-library" onClick={() => setTab('samples')} className={tabClass('samples')}>
            Sample notes
          </button>
        </div>
      </div>

      <div id="panel-library" role="tabpanel" aria-labelledby={`tab-${tab}`} className="max-h-72 overflow-y-auto xl:max-h-[calc(100vh-12rem)]">
        {tab === 'saved' && (
          saved.length === 0 ? (
            <p className="p-4 text-sm text-ink-soft">No saved notes yet. Write some notes and press Save note.</p>
          ) : (
            <ul className="divide-y divide-rule">
              {saved.map((n) => (
                <li key={n.id} className={`flex items-center justify-between gap-3 px-4 py-2 ${n.id === currentId ? 'bg-marker/20' : 'hover:bg-paper'}`}>
                  <button type="button" onClick={() => onOpen(n)} className="min-w-0 flex-1 rounded text-left" aria-current={n.id === currentId}>
                    <span className="block truncate font-medium">{n.title}</span>
                    <span className="block text-sm text-ink-soft">
                      {countWords(n.text).toLocaleString()} words · {new Date(n.updatedAt).toLocaleDateString()}
                    </span>
                  </button>
                  <button type="button" onClick={() => onDelete(n.id)} aria-label={`Delete ${n.title}`} className={`${linkButton} text-weak`}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )
        )}

        {tab === 'samples' && (
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Sample notes you can load into the editor</caption>
            <thead className="border-b border-rule text-ink-soft">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">Title</th>
                <th scope="col" className="px-2 py-2 text-right font-medium">Words</th>
                <th scope="col" className="px-4 py-2"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {samples.map((s) => (
                <tr key={s.id} className="hover:bg-paper">
                  <th scope="row" className="px-4 py-2 font-medium">{s.title}<span className="block text-xs font-normal text-ink-soft">{s.subject}</span></th>
                  <td className="px-2 py-2 text-right">{countWords(s.text)}</td>
                  <td className="px-4 py-2 text-right">
                    <button type="button" onClick={() => onUseSample(s)} aria-label={`Use ${s.title}`} className={pillButton}>Use</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
