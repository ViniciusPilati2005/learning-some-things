import { useCurrentUserQuery } from "@/queries/use-current-user";
import { useAccountQuery } from "@/queries/use-doc-user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

export function Dashboard() {
  const { data } = useCurrentUserQuery();
  const { result } = useAccountQuery(data.user?.uid);

  console.log("result.data: ", result.data);

  return (
    <div>
      <h1>Esperando respostas da mutation</h1>
    </div>
  );
}
