import { useCurrentUserQuery } from "@/queries/use-current-user";
import { db } from "@/utils/firebase";
import { createFileRoute } from "@tanstack/react-router";
import { doc, getDoc } from "firebase/firestore";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

export function Dashboard() {
  const { data } = useCurrentUserQuery();
  const uid = data.user?.uid;

  const userDocPromise = async () => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();

      if (userData) {
        return Promise.resolve(userData);
      } else {
        return Promise.reject(new Error("User not found"));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  userDocPromise()
    .then((userData) => {
      console.log(userData);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div>
      <h1>Esperando respostas da mutation</h1>
    </div>
  );
}
