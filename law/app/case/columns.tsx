"use client"
import { DeleteDialog } from "@/components/CaseDeleteDialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const columns: ColumnDef<classesData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  // {
  //   accessorKey: `${"student"}`,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Students" />
  //   ),
  //   cell: ({ row }) => {
  //     const label = row.original?.student[0]?.count

  //     return (
  //       <div className="flex space-x-2">
  //         {label}
  //       </div>
  //     )
  //   },
  // },
  {
    id:'view',
    cell: ({ row }) => {
      return (
        <Button>View</Button>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter()
      const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false)
      return (
        <>
          <DeleteDialog
            open={showDeleteTaskDialog}
            onOpenChange={setShowDeleteTaskDialog}
            tasks={[row.original]}
            showTrigger={false}
            onSuccess={() => row.toggleSelected(false)}
            name={"class"}
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {
                router.push("/admin/class/edit?class_id=" + row.original.id + "")
              }}>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDeleteTaskDialog(true)}>Delete class</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]
