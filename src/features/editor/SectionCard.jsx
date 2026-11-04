import { useDisclosure } from '../../hooks/useDisclosure.js'
import { EntryFields } from './EntryFields.jsx'

/**
 * A static, expandable editor card. Drag behaviour is intentionally deferred.
 * @param {{ section: import('../resume-data/resumeDocument.js').ResumeSection, onEntriesChange: (sectionId: string, entries: unknown[]) => void }} props
 */
export function SectionCard({ section, onEntriesChange }) {
  const { isOpen: isExpanded, toggle } = useDisclosure(section.id === 'experience')

  function updateEntry(entryId, field, value) {
    const updatedEntries = section.entries.map((entry) =>
      entry.id === entryId ? { ...entry, [field]: value } : entry,
    )

    onEntriesChange(section.id, updatedEntries)
  }

  return (
    <article className="overflow-hidden rounded-xl border border-[#CBD5E1] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <button
          aria-expanded={isExpanded}
          className="flex min-h-9 min-w-0 flex-1 items-center justify-between rounded text-left text-[#0F172A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4338CA]"
          onClick={toggle}
          type="button"
        >
          <span className="section-title">{section.title}<span className="entry-count">{section.entries.length} {section.entries.length === 1 ? 'entry' : 'entries'}</span></span>
          <span aria-hidden="true" className="text-[#475569]">
            {isExpanded ? '−' : '+'}
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="section-body border-t border-[#CBD5E1] p-4">
          {section.entries.map((entry) => (
            <EntryFields
              entry={entry}
              key={entry.id}
              onFieldChange={(field, value) => updateEntry(entry.id, field, value)}
            />
          ))}
          <button className="add-button" type="button" onClick={() => {
            const fields = section.type === 'skills' ? { name: '' } : section.type === 'projects' ? { name: '', details: '' } : { role: '', organization: '', period: '', description: '' }
            onEntriesChange(section.id, [...section.entries, { id: `${section.id}-${crypto.randomUUID()}`, ...fields }])
          }}>+ Add {section.title === 'Experience' ? 'experience' : section.title === 'Education' ? 'education' : section.title === 'Skills' ? 'skill' : 'project'}</button>
        </div>
      )}
    </article>
  )
}
