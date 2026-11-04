import { useReducer, useState } from 'react'
import { ResumeEditor } from './features/editor/ResumeEditor.jsx'
import { ResumePreview } from './features/preview/ResumePreview.jsx'
import {
  initialResumeDocument,
  resumeDocumentReducer,
} from './features/resume-data/resumeDocument.js'

function App() {
  const [resume, dispatch] = useReducer(
    resumeDocumentReducer,
    initialResumeDocument,
  )
  const [activePanel, setActivePanel] = useState('edit')

  /** Replaces one section's entries without mutating the document. */
  function updateSection(sectionId, updatedEntries) {
    dispatch({
      type: 'sectionEntriesUpdated',
      payload: { sectionId, updatedEntries },
    })
  }

  return (
    <main className="app-shell min-h-screen">
      <header className="app-header no-print">
        <div className="app-header-content">
          <div className="brand">
            <img className="brand-logo" src={`${import.meta.env.BASE_URL}branding/dragcv-logo.webp`} alt="" width="42" height="42" />
            <div>
              <h1 className="app-title">DragCV</h1>
              <p className="brand-caption">Resume Builder</p>
            </div>
          </div>
          <button
            className="primary-button"
            onClick={() => window.print()}
            type="button"
          >
            Print / Save PDF
          </button>
        </div>
      </header>

      <div
        aria-label="Resume workspace panels"
        className="mobile-tabs no-print"
        role="tablist"
      >
        <button
          aria-controls="editor-panel"
          aria-selected={activePanel === 'edit'}
          className="mobile-tab"
          id="edit-tab"
          onClick={() => setActivePanel('edit')}
          role="tab"
          type="button"
        >
          Edit
        </button>
        <button
          aria-controls="preview-panel"
          aria-selected={activePanel === 'preview'}
          className="mobile-tab"
          id="preview-tab"
          onClick={() => setActivePanel('preview')}
          role="tab"
          type="button"
        >
          Preview
        </button>
      </div>

      <div className="workspace" data-active-panel={activePanel}>
        <div
          aria-labelledby="edit-tab"
          className="editor-panel"
          id="editor-panel"
          role="tabpanel"
        >
          <ResumeEditor resume={resume} updateSection={updateSection} updatePersonalInfo={(field, value) => dispatch({ type: 'personalInfoUpdated', payload: { field, value } })} />
        </div>
        <div
          aria-labelledby="preview-tab"
          className="preview-panel"
          id="preview-panel"
          role="tabpanel"
        >
          <ResumePreview resume={resume} />
        </div>
      </div>
    </main>
  )
}

export default App
