import { collection, getDocs, query, where } from 'firebase/firestore'
import { getFirestoreDb, PACKAGE_ID } from './firebase'

export type Entitlement = {
  package_id: string
  expires_at: string
}

export async function fetchActiveEntitlement(
  userId: string,
  packageId = PACKAGE_ID,
): Promise<Entitlement | null> {
  const db = getFirestoreDb()
  const q = query(
    collection(db, 'entitlements'),
    where('user_id', '==', userId),
    where('package_id', '==', packageId),
  )
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null

  const data = snapshot.docs[0].data() as {
    package_id: string
    expires_at: string
  }
  const expiresAt = new Date(data.expires_at)
  if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
    return null
  }

  return {
    package_id: data.package_id,
    expires_at: data.expires_at,
  }
}
