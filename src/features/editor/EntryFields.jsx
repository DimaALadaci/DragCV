import { toFieldLabel } from '../../utils/toFieldLabel.js'

/**
 * @param {{ entry: Record<string, string>, onFieldChange: (field: string, value: string) => void }} props
 */
export function EntryFields({ entry, onFieldChange }) {
  return (
    <div className="space-y-3 rounded-lg bg-[#F1F5F9] p-3">
      {Object.entries(entry)
        .filter(([field]) => field !== 'id')
        .map(([field, value]) => (
          <label className="block text-xs font-medium text-[#475569]" key={field}>
            {toFieldLabel(field)}
            {['description', 'details', 'summary'].includes(field) ? <textarea
              className="field-input"
              rows={3}
              onChange={(event) => onFieldChange(field, event.target.value)}
              value={value}
            /> : <input
              className="mt-1 w-full rounded-md border border-[#CBD5E1] bg-white px-3 py-2 text-sm text-[#0F172A] outline-none focus:border-[#4338CA] focus:ring-2 focus:ring-[#4338CA]"
              onChange={(event) => onFieldChange(field, event.target.value)}
              type="text"
              value={value}
            />}
          </label>
        ))}
    </div>
  )
}
