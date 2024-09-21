import { useCurrentUserQuery } from "@/queries/use-current-user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

export function Dashboard() {
  const { data } = useCurrentUserQuery();

  return (
    <div>
      <h1>Esperando respostas da mutation</h1>
      <div>{data.user?.email}</div>
    </div>
  );
}
