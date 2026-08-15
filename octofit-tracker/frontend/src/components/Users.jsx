import { useEffect, useState } from 'react'

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? 'https://' + codespaceName + '-8000.app.github.dev/api/users/'
    : 'http://localhost:8000/api/users/'
}

const normalizeResults = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(getApiUrl())
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setUsers(normalizeResults(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p>Loading users...</p>
  if (error) return <p className="text-danger">Error loading users: {error}</p>

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {users.length === 0 ? (
          <p className="text-muted mb-0">No users found.</p>
        ) : (
          <div className="row g-3">
            {users.map((user) => (
              <div className="col-md-6" key={user._id || user.email}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h5 mb-1">{user.name}</h3>
                  <p className="mb-1">@{user.username}</p>
                  <p className="text-muted small mb-2">{user.email}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-primary">{user.fitnessLevel}</span>
                    <span className="badge bg-secondary">{user.teamName || 'Unassigned'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Users
