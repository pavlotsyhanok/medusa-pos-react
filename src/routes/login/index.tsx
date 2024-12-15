// src/routes/login.tsx
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useAuth } from '../../lib/hooks/auth'

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
})

function LoginComponent() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const search = useSearch({ strict: false }) as { redirect?: string }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await login('email', 'password')

    const redirectTo = search.redirect
    if (redirectTo) {
      navigate({ to: redirectTo })
    } else {
      navigate({ to: '/store' })
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* Add your login form fields here */}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
