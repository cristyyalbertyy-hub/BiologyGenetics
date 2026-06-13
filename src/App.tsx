import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ChapterPage } from './pages/ChapterPage'
import { GroupPage } from './pages/GroupPage'
import { MediaPage } from './pages/MediaPage'

export default function App() {
  return (
    <Routes>
      <Route path="/app" element={<HomePage />} />
      <Route path="/app/:chapterId" element={<ChapterPage />} />
      <Route path="/app/:chapterId/:groupId" element={<GroupPage />} />
      <Route
        path="/app/:chapterId/:groupId/:leafId"
        element={<MediaPage />}
      />
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="/login" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<Navigate to="/app" replace />} />
    </Routes>
  )
}
