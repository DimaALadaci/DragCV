/**
 * @param {{ resume: import('../resume-data/resumeDocument.js').ResumeDocument }} props
 */
export function ResumePreview({ resume }) {
  const { personalInfo, sections } = resume

  return (
    <section aria-label="Live resume preview" className="lg:sticky lg:top-6 lg:self-start">
      <div className="preview-toolbar no-print"><span>LIVE PREVIEW</span><span><i /> Updates as you type</span></div>
      <div className="resume-preview mx-auto min-h-[842px] max-w-[680px] bg-white p-8 shadow-lg sm:p-12">
        <header className="border-b-2 border-[#0F172A] pb-5">
          <h2 className="text-3xl font-bold tracking-tight">{personalInfo.name}</h2>
          <p className="mt-2 text-sm text-[#475569]">
            {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.website]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <p className="mt-4 text-sm leading-6 text-[#475569]">{personalInfo.summary}</p>
        </header>

        <div className="mt-7 space-y-6">
          {sections.map((section) => (
            <PreviewSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PreviewSection({ section }) {
  return (
    <section>
      <h3 className="border-b border-[#CBD5E1] pb-1 text-sm font-bold uppercase tracking-widest text-[#0F172A]">
        {section.title}
      </h3>
      <div className="mt-3 space-y-4">
        {section.entries.map((entry) => (
          <article key={entry.id} className="resume-entry text-sm">
            {entry.role && (
              <div className="flex flex-wrap justify-between gap-x-4 font-semibold">
                <span>{entry.role}</span>
                <span className="font-normal text-[#475569]">{entry.period}</span>
              </div>
            )}
            {entry.organization && <p className="italic text-[#475569]">{entry.organization}</p>}
            {entry.name && <p className="font-semibold">{entry.name}</p>}
            {(entry.description || entry.details) && (
              <p className="mt-1 leading-5 text-[#475569]">{entry.description || entry.details}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
