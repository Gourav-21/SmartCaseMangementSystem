"use client"
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ClassPage() {
//   const adminUserData = useRecoilValue(adminUserDataState)
//   const [classes, setClasses] = useRecoilState(classesData)

//   async function getData() {
//     const supabase = createClient();
//     const { data: classes, error: error } = await supabase
//       .from('class')
//       .select(`
//         *,
//         class_teacher(
//           teacher(name)
//         ),
//         student(count)
//         `)
//       .eq('school_id', adminUserData[0]?.school_id)
//       .eq("class_teacher.role","primary teacher")

//     if (error) {
//       console.log(error)
//       console.log("no access")
//     } else {
//       setClasses(classes)
//     }
//   }

//   useEffect(() => {
//     if (adminUserData.length > 0)
//       getData()
//   }, [adminUserData])


  return (
    <div className="hidden h-full flex-1 flex-col space-y-5 pt-0 p-8 md:flex ">

      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cases!</h2>
          <p className="text-muted-foreground">
            Here&apos;s the list of cases!
          </p>
        </div>
      </div>
      <DataTable data={[]} columns={columns} />
    </div>
  )
}
