import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../../modules/login/LoginForm';
import { LoginLayout } from '../../modules/login/LoginLayout';

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  );
}
