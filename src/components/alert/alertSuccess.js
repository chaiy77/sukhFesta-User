import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2Icon } from "lucide-react";
export default function AlertSuccess({ title, message, onClick }) {
  return (
    <Alert className="border-green-200  mx-4 p-6 shadow-sm ring-1">
      <AlertTitle className="w-full text-lg font-semibold text-blue-900 leading-none mb-1">
        <div className="flex flex-row">
          <CheckCircle2Icon className="h-6 w-6 text-blue-600" />{" "}
          <div>{title}</div>
        </div>
      </AlertTitle>
      <AlertDescription className="block w-full text-blue-700 text-sm leading-relaxed">
        <div> {message} </div>
        <div className="pt-2">
          <Button
            size="sm"
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-md shadow-blue-200"
          >
            OK
          </Button>
        </div>
      </AlertDescription>

      {/* <div className=" w-full mt-6 flex justify-end gap-3">
          <Button
            size="sm"
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-md shadow-blue-200"
          >
            OK
          </Button>
        </div> */}

      {/* <div className="flex flex-col w-full items-start gap-4">
        <div className="flex flex-row w-full  items-start gap-4">
          <div className="rounded-full bg-blue-100 p-2">
            <CheckCircle2Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <div className="flex-1  pt-1">
              <AlertTitle className="w-full text-lg font-semibold text-blue-900 leading-none mb-1">
                {title}
              </AlertTitle>
              <AlertDescription className="block w-full text-blue-700 text-sm leading-relaxed">
                {message}
              </AlertDescription>
            </div>
          </div>
        </div>

        <div>
        
          <div className=" w-full mt-6 flex justify-end gap-3">
            <Button
              size="sm"
              onClick={onClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 shadow-md shadow-blue-200"
            >
              OK
            </Button>
          </div>
        </div>
      </div> */}
    </Alert>
  );
}
