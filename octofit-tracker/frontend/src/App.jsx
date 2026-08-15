import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const routes = [
  { path: '/', label: 'Users', element: <Users /> },
  { path: '/activities', label: 'Activities', element: <Activities /> },
  { path: '/leaderboard', label: 'Leaderboard', element: <Leaderboard /> },
  { path: '/teams', label: 'Teams', element: <Teams /> },
  { path: '/workouts', label: 'Workouts', element: <Workouts /> },
]

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME

  return (
    <div className="container py-4">
      <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <div>
            <p className="text-uppercase text-muted mb-1">Octofit Tracker</p>
            <h1 className="h3 mb-0">Multi-tier fitness dashboard</h1>
          </div>
          <div className="text-end small text-muted">
            <div>API host: {codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000'}</div>
            <div className="text-secondary">
              VITE_CODESPACE_NAME must be defined in .env.local when running in Codespaces.
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
          <div className="container-fluid">
            <div className="navbar-nav d-flex flex-wrap gap-2">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === '/'}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded ${isActive ? 'bg-light text-dark' : 'text-white-50'}`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}

export default App
