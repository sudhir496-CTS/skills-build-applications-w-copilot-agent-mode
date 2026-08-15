import { useEffect, useState } from 'react'

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? 'https://' + codespaceName + '-8000.app.github.dev/api/leaderboard/'
    : 'http://localhost:8000/api/leaderboard/'
}

const normalizeResults = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(getApiUrl())
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setEntries(normalizeResults(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <p className="text-danger">Error loading leaderboard: {error}</p>

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {entries.length === 0 ? (
          <p className="text-muted mb-0">No leaderboard data available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Score</th>
                  <th>Workouts</th>
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || `${entry.username}-${entry.rank}`}>
                    <td>#{entry.rank}</td>
                    <td>{entry.username}</td>
                    <td>{entry.teamName}</td>
                    <td>{entry.score}</td>
                    <td>{entry.workoutsCompleted}</td>
                    <td>{entry.streakDays} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

export default Leaderboard
