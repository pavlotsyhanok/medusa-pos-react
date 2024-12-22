import { Avatar, Button, Container, Input, Label, Text } from "@medusajs/ui";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuthQuery } from "@/lib/hooks/auth/AuthProvider";
import { ExclamationCircleSolid } from "@medusajs/icons";
import { useNavigate } from "@tanstack/react-router";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthQuery();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await login(
        { email, password },
        {
          onSuccess: () => {
            console.log("success!");
            navigate({ to: "/store" });
          },
          onError: () => {
            setError("Invalid email or password");
          }
        }
      );
    } catch (error) {
      // Error is already handled in onError callback
    }
  };

  return (
    <Container className="max-w-fit flex flex-col gap-4 sm:min-w-[350px] min-w-[80vw] py-8">
      <div className="flex w-full items-center flex-col justify-center gap-4">
        <Avatar
          size="xlarge"
          variant="squared"
          src={import.meta.env.VITE_PUBLIC_COMPANY_LOGO}
          fallback={import.meta.env.VITE_PUBLIC_COMPANY_NAME.slice(0, 2) || "C"}
        />
        <div className="flex flex-col gap-1 items-center">
          <Text size="large" className="text-ui-fg-base">
            Welcome to {import.meta.env.VITE_PUBLIC_COMPANY_NAME}
          </Text>
          <Text size="small" className="text-ui-fg-muted">
            Login to access Medusa POS
          </Text>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <Input
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="flex items-center justify-center w-full">
            <Text size="small" className="text-ui-fg-error text-center flex items-center gap-2">
              <ExclamationCircleSolid /> {error}
            </Text>
          </div>
        )}
        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
        <div className="flex gap-2 items-center justify-center w-full mt-4">
          <Text size="small" className="text-ui-fg-muted">
            Forgot password?
          </Text>
          <Link
            to={`${import.meta.env.VITE_PUBLIC_MEDUSA_BASE_URL}/app/reset-password`}>
            <Text
              size="small"
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors duration-200">
              Reset password
            </Text>
          </Link>
        </div>
      </form>
    </Container>
  );
}

export default LoginForm;
