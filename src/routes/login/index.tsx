import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '../../lib/hooks/auth'
import LoginForm from '../../modules/login/LoginForm';
import { LoginLayout } from '../../modules/login/LoginLayout';

export const Route = createFileRoute('/login/')({
  beforeLoad: () => {
    if (isAuthenticated) {
      throw redirect({
        to: '/store'
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
