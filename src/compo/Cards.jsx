const Cards = ({ student }) => {
  if (!student) return null
  const { name, roll_number: rollNumber, img, interest, portfolio } = student

  return (
    <article className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10" />
      <div className="relative flex items-center gap-4">
        <img src={img ?? '/rishav.jpg'} alt={name} className="h-16 w-16 rounded-2xl object-cover border border-white/20" />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Roll # {rollNumber}</p>
        </div>
      </div>
      <p className="relative mt-4 text-sm text-slate-200">
        {interest ?? 'Focused on building thoughtful interfaces, system design fundamentals, and practical AI workflows.'}
      </p>
      <div className="relative mt-5 flex items-center justify-between text-xs text-slate-400">
        <span>Open to collaborate</span>
        <a href={portfolio ?? 'https://github.com/rixhavraj'} target="_blank" rel="noreferrer" className="text-emerald-300 font-semibold">
          View work ->
        </a>
      </div>
    </article>
  )
}

export default Cards
