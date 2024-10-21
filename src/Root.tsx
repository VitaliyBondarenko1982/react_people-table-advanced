import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage, NotFoundPage, PeoplePage } from './pages';

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
};

export default Root;
