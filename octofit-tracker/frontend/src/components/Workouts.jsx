import { useEffect, useState } from 'react'

const getApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? 'https://' + codespaceName + '-8000.app.github.dev/api/workouts/'
    : 'http://localhost:8000/api/workouts/'
}

const normalizeResults = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(getApiUrl())
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        setWorkouts(normalizeResults(payload))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [])

  if (loading) return <p>Loading workouts...</p>
  if (error) return <p className="text-danger">Error loading workouts: {error}</p>

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {workouts.length === 0 ? (
          <p className="text-muted mb-0">No workouts found.</p>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.title}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h5">{workout.title}</h3>
                  <p className="text-muted mb-2">{workout.focusArea} • {workout.difficulty}</p>
                  <p className="mb-2">{workout.durationMinutes} minutes</p>
                  <ul className="mb-0 small">
                    {workout.instructions?.slice(0, 3).map((instruction, index) => (
                      <li key={`${workout.title}-${index}`}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Workouts
