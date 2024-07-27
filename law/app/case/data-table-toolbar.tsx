"use client"

import { DeleteDialog } from "@/components/CaseDeleteDialog"
import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Input } from "@/components/ui/input"
import { exportTableToCSV } from "@/lib/export"
import { Table } from "@tanstack/react-table"
import { DownloadIcon, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter case..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      <div className="ml-auto flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <DeleteDialog
            tasks={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
            showTrigger={true}
            name={"case"}
          />
        ) : null}

        <Button size="sm" className="ml-auto flex items-center gap-2" type="button" onClick={() => {
          router.push("/case/add")
        }}>
          <PlusCircle className="h-3.5 w-3.5" />
          Add Case
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            exportTableToCSV(table, {
              filename: "case",
              excludeColumns: ["select", "actions"],
            })
          }
        >
          <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
          Export
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
