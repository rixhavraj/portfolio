import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultProfile } from '../data/profileDefaults'

const deepMerge = (base, override) => {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base
  }
  if (typeof base === 'object' && base !== null) {
    if (typeof override !== 'object' || override === null) return base
    const result = { ...base }
    Object.keys(override).forEach((key) => {
      result[key] = key in base ? deepMerge(base[key], override[key]) : override[key]
    })
    return result
  }
  return override === undefined ? base : override
}

const STORAGE_KEY = 'portfolio_profile_v2'

const ProfileContext = createContext({
  profile: defaultProfile,
  setProfile: () => {},
  updateSection: () => {},
  resetProfile: () => {},
})

const readProfileFromStorage = () => {
  if (typeof window === 'undefined') return defaultProfile
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? deepMerge(defaultProfile, JSON.parse(stored)) : defaultProfile
  } catch {
    return defaultProfile
  }
}

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile)

  useEffect(() => {
    setProfile(readProfileFromStorage())
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } catch {
      // ignore write errors
    }
  }, [profile])

  const contextValue = useMemo(
    () => ({
      profile,
      setProfile,
      updateSection: (section, value) => setProfile((prev) => ({ ...prev, [section]: value })),
      resetProfile: () => setProfile(defaultProfile),
    }),
    [profile],
  )

  return <ProfileContext.Provider value={contextValue}>{children}</ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext)
