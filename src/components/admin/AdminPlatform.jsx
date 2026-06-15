import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  Database,
  Download,
  Eye,
  FileJson,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  Upload,
} from 'lucide-react'
import { CONTENT_SECTIONS } from '../../content/defaultContent'
import { normalizeContent, useSiteContent } from '../../context/SiteContentContext'

const clone = (value) => JSON.parse(JSON.stringify(value))

const ICON_OPTIONS = [
  'Users',
  'Target',
  'Lightbulb',
  'Trophy',
  'Wrench',
  'BrainCircuit',
  'Handshake',
  'Star',
  'Bot',
  'Wifi',
  'BookOpen',
  'Rocket',
]

const readableLabel = (value) => String(value)
  .replace(/([A-Z])/g, ' $1')
  .replace(/[_-]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/^./, char => char.toUpperCase())

const getAtPath = (source, path) => (
  path.reduce((current, key) => current?.[key], source)
)

const setAtPath = (source, path, value) => {
  const next = clone(source)
  let cursor = next

  path.slice(0, -1).forEach((key) => {
    cursor = cursor[key]
  })

  cursor[path[path.length - 1]] = value
  return next
}

const removeAtPath = (source, path, index) => {
  const target = getAtPath(source, path)
  const nextValue = target.filter((_, itemIndex) => itemIndex !== index)
  return setAtPath(source, path, nextValue)
}

const insertAtPath = (source, path, value) => {
  const target = getAtPath(source, path)
  return setAtPath(source, path, [...target, value])
}

const createBlankValue = (value, key = '') => {
  if (Array.isArray(value)) return []

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, childValue]) => [
        childKey,
        createBlankValue(childValue, childKey),
      ])
    )
  }

  if (typeof value === 'number') return key.toLowerCase() === 'id' ? Date.now() : 0
  if (typeof value === 'boolean') return false
  return ''
}

const createNewArrayItem = (items) => {
  if (!items.length) return ''

  const blank = createBlankValue(items[0])
  if (blank && typeof blank === 'object' && 'id' in blank) {
    const maxId = Math.max(0, ...items.map(item => Number(item.id) || 0))
    blank.id = maxId + 1
  }

  return blank
}

const duplicateArrayItem = (items, index) => {
  const duplicate = clone(items[index])

  if (duplicate && typeof duplicate === 'object' && 'id' in duplicate) {
    const maxId = Math.max(0, ...items.map(item => Number(item.id) || 0))
    duplicate.id = maxId + 1
  }

  return duplicate
}

const isLongText = (fieldKey, value) => {
  const key = fieldKey.toLowerCase()
  return (
    String(value).length > 80 ||
    key.includes('description') ||
    key.includes('paragraph') ||
    key.includes('body') ||
    key.includes('bio') ||
    key.includes('quote') ||
    key.includes('prompt')
  )
}

const arrayItemTitle = (item, index) => {
  if (item && typeof item === 'object') {
    return item.title || item.name || item.label || item.role || `Item ${index + 1}`
  }

  return `Item ${index + 1}`
}

function AdminField({ fieldKey, path, value, onChange, root }) {
  const label = readableLabel(fieldKey)

  if (Array.isArray(value)) {
    const isPrimitiveList = value.every(item => item === null || typeof item !== 'object')

    return (
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white">{label}</h3>
            <p className="text-xs text-zinc-600">{value.length} item{value.length === 1 ? '' : 's'}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(insertAtPath(root, path, createNewArrayItem(value)))}
            className="inline-flex items-center gap-2 rounded-lg border border-red-600/25 bg-red-600/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:border-red-500/50 hover:bg-red-600/15"
          >
            <Plus size={13} />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {value.map((item, index) => (
            <div key={`${fieldKey}-${index}`} className="rounded-xl border border-white/[0.06] bg-zinc-950/40 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  {arrayItemTitle(item, index)}
                </span>
                <div className="flex items-center gap-2">
                  {!isPrimitiveList && (
                    <button
                      type="button"
                      onClick={() => onChange(insertAtPath(root, path, duplicateArrayItem(value, index)))}
                      className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
                      aria-label={`Duplicate ${arrayItemTitle(item, index)}`}
                    >
                      <Copy size={13} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onChange(removeAtPath(root, path, index))}
                    className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-600/10 hover:text-red-300"
                    aria-label={`Remove ${arrayItemTitle(item, index)}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <AdminField
                fieldKey={isPrimitiveList ? `${label} ${index + 1}` : index}
                path={[...path, index]}
                value={item}
                onChange={onChange}
                root={root}
              />
            </div>
          ))}

          {value.length === 0 && (
            <p className="rounded-lg border border-dashed border-white/[0.08] px-4 py-5 text-center text-xs text-zinc-600">
              No items yet. Add one to start editing this list.
            </p>
          )}
        </div>
      </div>
    )
  }

  if (value && typeof value === 'object') {
    return (
      <div className="space-y-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
        {path.length > 1 && (
          <div>
            <h3 className="text-sm font-bold text-white">{label}</h3>
            <p className="text-xs text-zinc-600">Nested content group</p>
          </div>
        )}

        {Object.entries(value).map(([childKey, childValue]) => (
          <AdminField
            key={childKey}
            fieldKey={childKey}
            path={[...path, childKey]}
            value={childValue}
            onChange={onChange}
            root={root}
          />
        ))}
      </div>
    )
  }

  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
        <span className="text-sm font-semibold text-zinc-300">{label}</span>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(setAtPath(root, path, event.target.checked))}
          className="h-5 w-5 accent-red-600"
        />
      </label>
    )
  }

  const keyName = String(fieldKey).toLowerCase()
  const isIconField = keyName === 'icon'
  const isColorField = keyName.includes('color') || /^#[0-9a-f]{6}$/i.test(String(value))
  const isNumber = typeof value === 'number'
  const isTextArea = !isNumber && isLongText(String(fieldKey), value ?? '')
  const inputType = keyName.includes('email') ? 'email' : 'text'

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </span>

      {isIconField ? (
        <select
          value={value ?? ''}
          onChange={(event) => onChange(setAtPath(root, path, event.target.value))}
          className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/60"
        >
          {ICON_OPTIONS.map(icon => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>
      ) : isTextArea ? (
        <textarea
          value={value ?? ''}
          onChange={(event) => onChange(setAtPath(root, path, event.target.value))}
          rows={4}
          className="w-full resize-y rounded-xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60"
        />
      ) : isColorField ? (
        <div className="flex gap-3">
          <input
            type="color"
            value={String(value || '#DC2626').startsWith('#') ? value : '#DC2626'}
            onChange={(event) => onChange(setAtPath(root, path, event.target.value))}
            className="h-12 w-14 rounded-xl border border-white/[0.08] bg-zinc-950/80 p-1"
          />
          <input
            type="text"
            value={value ?? ''}
            onChange={(event) => onChange(setAtPath(root, path, event.target.value))}
            className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/60"
          />
        </div>
      ) : (
        <input
          type={isNumber ? 'number' : inputType}
          value={value ?? ''}
          onChange={(event) => {
            const nextValue = isNumber ? Number(event.target.value) : event.target.value
            onChange(setAtPath(root, path, nextValue))
          }}
          className="w-full rounded-xl border border-white/[0.08] bg-zinc-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60"
        />
      )}
    </label>
  )
}

export default function AdminPlatform() {
  const { content, saveContent, resetContent } = useSiteContent()
  const [activeKey, setActiveKey] = useState(CONTENT_SECTIONS[0].key)
  const [lastSavedAt, setLastSavedAt] = useState(new Date())
  const [jsonError, setJsonError] = useState('')
  const fileInputRef = useRef(null)

  const activeSection = CONTENT_SECTIONS.find(section => section.key === activeKey) ?? CONTENT_SECTIONS[0]
  const activeValue = content[activeSection.key]

  const summary = useMemo(() => ([
    { label: 'Editable sections', value: CONTENT_SECTIONS.length },
    { label: 'Events', value: (content.events.upcoming?.length || 0) + (content.events.past?.length || 0) },
    { label: 'Team members', value: content.leadership.team?.length || 0 },
    { label: 'Gallery items', value: content.gallery.items?.length || 0 },
  ]), [content])

  const commitContent = (nextContent) => {
    saveContent(nextContent)
    setLastSavedAt(new Date())
    setJsonError('')
  }

  const handleSectionChange = (nextContent) => {
    commitContent(nextContent)
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'advanced-tech-club-content.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        commitContent(normalizeContent(parsed))
      } catch (error) {
        setJsonError('That file is not valid JSON. Please export a fresh copy and try again.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const handleReset = () => {
    const confirmed = window.confirm('Reset every editable website field back to the default content?')
    if (!confirmed) return

    resetContent()
    setLastSavedAt(new Date())
    setJsonError('')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="fixed inset-0 circuit-grid opacity-20" />
      <div
        className="fixed inset-x-0 top-0 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(220,38,38,0.16), transparent 65%)' }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col lg:flex-row">
        <aside className="border-b border-white/[0.07] bg-zinc-950/85 px-5 py-5 backdrop-blur-2xl lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
          <a href="/" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition hover:text-red-300">
            <ArrowLeft size={14} />
            Back to website
          </a>

          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-300">
              <Database size={13} />
              Content Control
            </div>
            <h1 className="text-3xl font-black tracking-tight">ATC Admin Platform</h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Edit the public website content, manage repeatable sections, and export the live content database when you are ready to deploy it.
            </p>
          </div>

          <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {CONTENT_SECTIONS.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveKey(section.key)}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  activeKey === section.key
                    ? 'border-red-600/35 bg-red-600/12 text-white'
                    : 'border-white/[0.05] bg-white/[0.02] text-zinc-500 hover:border-white/[0.1] hover:text-zinc-200'
                }`}
              >
                <span className="block text-sm font-bold">{section.label}</span>
                <span className="mt-1 block text-xs leading-relaxed opacity-70">{section.description}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 px-5 py-6 md:px-8 lg:px-10">
          <header className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur-xl">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <CheckCircle2 size={14} />
                  Autosaved {lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <h2 className="text-2xl font-black">{activeSection.label}</h2>
                <p className="mt-1 max-w-2xl text-sm text-zinc-500">{activeSection.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-red-600/30 hover:text-white"
                >
                  <Eye size={15} />
                  Preview Site
                </a>
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-red-600/30 hover:text-white"
                >
                  <Download size={15} />
                  Export JSON
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-red-600/30 hover:text-white"
                >
                  <Upload size={15} />
                  Import
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-600/20 bg-red-600/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-500/50 hover:bg-red-600/15"
                >
                  <RotateCcw size={15} />
                  Reset
                </button>
                <input ref={fileInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
              </div>
            </div>

            {jsonError && (
              <div className="mt-4 rounded-xl border border-red-600/25 bg-red-600/10 px-4 py-3 text-sm text-red-200">
                {jsonError}
              </div>
            )}
          </header>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summary.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600">{item.label}</p>
                <p className="mt-2 text-3xl font-black text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <motion.section
            key={activeSection.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-white/[0.07] bg-zinc-950/80 p-4 shadow-2xl shadow-black/30 md:p-6"
          >
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-600/15 bg-red-600/5 px-4 py-3">
              <FileJson size={16} className="mt-0.5 text-red-300" />
              <p className="text-sm leading-relaxed text-zinc-400">
                Changes save immediately to this browser. Use export JSON when you want to keep a copy of the edited content or move it into a production workflow.
              </p>
            </div>

            <AdminField
              fieldKey={activeSection.key}
              path={[activeSection.key]}
              value={activeValue}
              onChange={handleSectionChange}
              root={content}
            />
          </motion.section>

          <div className="mt-6 flex items-center gap-2 text-xs text-zinc-700">
            <Save size={13} />
            Local content database: advanced-tech-club-content.json compatible.
          </div>
        </main>
      </div>
    </div>
  )
}
