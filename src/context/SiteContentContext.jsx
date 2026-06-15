import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

import { db } from '../firebase'

import {
  CONTENT_UPDATED_EVENT,
  DEFAULT_CONTENT
} from '../content/defaultContent'

const SiteContentContext = createContext(null)

const clone = (value) =>
  JSON.parse(JSON.stringify(value))

const isPlainObject = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value)

const deepMerge = (base, override) => {
  if (Array.isArray(base)) {
    return Array.isArray(override)
      ? override
      : base
  }

  if (!isPlainObject(base)) {
    return override === undefined
      ? base
      : override
  }

  return Object.keys(base).reduce(
    (merged, key) => {
      merged[key] = deepMerge(
        base[key],
        override?.[key]
      )
      return merged
    },
    {}
  )
}

export const normalizeContent = (content) =>
  deepMerge(DEFAULT_CONTENT, content || {})

export function SiteContentProvider({
  children
}) {
  const [content, setContentState] =
    useState(clone(DEFAULT_CONTENT))

  const [loaded, setLoaded] =
    useState(false)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const ref = doc(
          db,
          'website',
          'content'
        )

        const snapshot =
          await getDoc(ref)

        if (
          snapshot.exists() &&
          snapshot.data()
        ) {
          setContentState(
            normalizeContent(
              snapshot.data()
            )
          )
        }
      } catch (err) {
        console.error(
          'Firestore load error',
          err
        )
      }

      setLoaded(true)
    }

    loadContent()
  }, [])

  const saveContent = useCallback(
    async (nextContent) => {
      const normalized =
        normalizeContent(nextContent)

      setContentState(normalized)

      try {
        await setDoc(
          doc(
            db,
            'website',
            'content'
          ),
          normalized
        )

        window.dispatchEvent(
          new CustomEvent(
            CONTENT_UPDATED_EVENT,
            {
              detail: normalized
            }
          )
        )
      } catch (err) {
        console.error(
          'Firestore save error',
          err
        )
      }
    },
    []
  )

  const resetContent =
    useCallback(async () => {
      const fresh =
        clone(DEFAULT_CONTENT)

      setContentState(fresh)

      try {
        await setDoc(
          doc(
            db,
            'website',
            'content'
          ),
          fresh
        )

        window.dispatchEvent(
          new CustomEvent(
            CONTENT_UPDATED_EVENT,
            {
              detail: fresh
            }
          )
        )
      } catch (err) {
        console.error(err)
      }
    }, [])

  const value = useMemo(
    () => ({
      content,
      defaultContent:
        DEFAULT_CONTENT,
      saveContent,
      resetContent,
    }),
    [
      content,
      saveContent,
      resetContent
    ]
  )

  if (!loaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  return (
    <SiteContentContext.Provider
      value={value}
    >
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context =
    useContext(
      SiteContentContext
    )

  if (!context) {
    throw new Error(
      'useSiteContent must be used inside SiteContentProvider'
    )
  }

  return context
}