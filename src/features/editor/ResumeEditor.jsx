import { SectionCard } from './SectionCard.jsx'
import { EntryFields } from './EntryFields.jsx'

/**
 * @param {{ resume: import('../resume-data/resumeDocument.js').ResumeDocument, updateSection: (sectionId: string, entries: unknown[]) => void }} props
 */
export function ResumeEditor({ resume, updateSection, updatePersonalInfo }) {
  return (
    <section aria-label="Resume editor" className="space-y-4">
      <div>
        <p className="workspace-eyebrow">YOUR DOCUMENT</p>
        <h2 className="editor-title">Make your next move.</h2>
        <p className="mt-1 text-sm text-[#475569]">
          Make a change here to update the document preview instantly.
        </p>
      </div>

      {/* TODO(dnd-kit): Wrap this list in DndContext and SortableContext. Use section.id as each sortable item's stable id. */}
      <div className="space-y-3">
        <details className="personal-card">
          <summary>Personal details <span>Name, contact & summary</span></summary>
          <div className="p-4 border-t border-[#CBD5E1]">
            <EntryFields entry={resume.personalInfo} onFieldChange={updatePersonalInfo} />
          </div>
        </details>
        {resume.sections.map((section) => (
          <SectionCard
            key={section.id}
            section={section}
            onEntriesChange={updateSection}
          />
        ))}
      </div>
    </section>
  )
}
