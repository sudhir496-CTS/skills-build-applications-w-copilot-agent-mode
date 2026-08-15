import { useEffect, useState } from 'react'

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? 'https://' + codespaceName + '-8000.app.github.dev/api/teams/'
    : 'http://localhost:8000/api/teams/'
}

const normalizeResults = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(getApiUrl())
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setTeams(normalizeResults(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <p>Loading teams...</p>
  if (error) return <p className="text-danger">Error loading teams: {error}</p>

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {teams.length === 0 ? (
          <p className="text-muted mb-0">No teams found.</p>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.name}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h5">{team.name}</h3>
                  <p className="text-muted mb-2">{team.sport}</p>
                  <p className="mb-2">{team.description}</p>
                  <small className="text-secondary">Members: {team.members?.length || 0}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Teams
