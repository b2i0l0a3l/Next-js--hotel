import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import { ReactNode } from "react";

export default function FormAlert({title , description } : {title : string, description : ReactNode}) {
    return (
      <Alert className="bg-indigo-600 text-white">
                        <Terminal className="h-4 w-4 stroke-white" />
                        <AlertTitle>{title}</AlertTitle> 
                        <AlertDescription className="space-y-4 text-white "> 
                          <div >{description}</div> 
                        </AlertDescription>
                      </Alert>
    );
}