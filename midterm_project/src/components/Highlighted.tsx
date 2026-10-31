type Props = { context: string; answer: string; hidden: boolean }

export default function Highlighted({ context, answer, hidden }: Props) {
  const start = answer ? context.toLowerCase().indexOf(answer.toLowerCase()) : -1
  if (start < 0) return <>{context}</>
  const end = start + answer.length
  return (
    <>
      {context.slice(0, start)}
      <mark className={hidden ? 'hatch' : 'marker'}>{context.slice(start, end)}</mark>
      {context.slice(end)}
    </>
  )
}
