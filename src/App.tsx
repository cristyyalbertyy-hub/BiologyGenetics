import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { GroupPage } from './pages/GroupPage'
import { MediaPage } from './pages/MediaPage'
import { isAuthenticated } from './auth'

function LoginRedirect() {
  if (isAuthenticated()) return <Navigate to="/app" replace />
  return <LoginPage />
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginRedirect />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/:chapterId"
          element={
            <ProtectedRoute>
              <ChapterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/:chapterId/:groupId"
          element={
            <ProtectedRoute>
              <GroupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/:chapterId/:groupId/:leafId"
          element={
            <ProtectedRoute>
              <MediaPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}
