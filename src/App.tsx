import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { GroupPage } from './pages/GroupPage'
import { MediaPage } from './pages/MediaPage'
import { LoginPage } from './pages/LoginPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  )
}

export default function App() {
  return <AppRoutes />
}
