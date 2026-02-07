import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";

export default function AlertError({ title, message, onClick }) {
  return (
    <Alert className="border-red-200  mx-4 p-6 shadow-sm ring-1">
      <AlertTitle className="w-full text-lg font-semibold text-red-900 leading-none mb-1">
        <div className="flex flex-row">
          <CheckCircle2Icon className="h-6 w-6 text-red-600" />{" "}
          <div>{title}</div>
        </div>
      </AlertTitle>
      <AlertDescription className="block w-full text-red-700 text-sm leading-relaxed">
        <div> {message} </div>
        <div className="pt-2">
          <Button
            size="sm"
            onClick={onClick}
            className="bg-red-600 hover:bg-blue-700 text-white px-6 shadow-md shadow-red-200"
          >
            OK
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
