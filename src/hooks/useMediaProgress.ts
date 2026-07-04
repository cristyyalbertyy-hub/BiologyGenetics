import { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { getFirestoreDb, PACKAGE_ID } from '../lib/firebase'
import { recordWatchComplete, type AutoResource } from '../lib/progress-client'

export function useMediaProgress(itemKey: string | undefined) {
  const { user, hasAccess } = useAuth()

  const trackWatchComplete = useCallback(
    async (resource: AutoResource) => {
      if (!user || !hasAccess || !itemKey) return
      try {
        await recordWatchComplete(
          getFirestoreDb(),
          user.uid,
          PACKAGE_ID,
          itemKey,
          resource,
        )
      } catch (err) {
        console.warn('Could not save watch progress:', err)
      }
    },
    [user, hasAccess, itemKey],
  )

  return { trackWatchComplete }
}
