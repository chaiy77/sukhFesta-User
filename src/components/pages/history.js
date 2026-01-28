import { useUserContext } from "@/context/userContext";
import { REGISTER_USER } from "@/store/graphql/user";
import { Button } from "@/components/ui/button";
import { callApiLog } from "@/tools/apiLog";
import { useMutation } from "@apollo/client/react";

export default function HistoryPageComponent({ gotoPage }) {
  return <div>History</div>;
}
