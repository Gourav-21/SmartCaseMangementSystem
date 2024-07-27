"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import { toast } from "sonner"



export default function Dashboard() {
  const router = useRouter()
  const [class_id, setClassId] = useState<number | null>(null)
  const [step, setStep] = useState(1)


  const handleSave = async () => {
    
  };

  async function addclass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if(step == 1){
      
  
      setStep(2)
      toast.success("Class added successfully")
    }else if(step==2){
      
      setStep(3)
    }else if(step==3){

      await handleSave()
      toast.success("Fee structure added successfully")
      router.push("/admin/class")
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <form onSubmit={addclass} className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" type="button" onClick={() => router.back()}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Add New Class
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" type="button" onClick={() => router.push("/admin/class")}>
                  Discard
                </Button> 
                <Button size="sm" >{step != 3  ? "Next" : "Save Class"}</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">


              {step == 1 && (
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8 ">
                </div>
              )}
              {step == 2 && (
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8 ">
                </div>
              )}

              {step == 3 && (
                <>
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  </div>

                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  </div>
                </>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
