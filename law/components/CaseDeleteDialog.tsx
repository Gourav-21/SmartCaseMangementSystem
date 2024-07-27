"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import * as React from "react"
import { useTransition } from "react"
import { useSetRecoilState } from "recoil"
import { toast } from "sonner"


interface DeleteTasksDialogProps
    extends React.ComponentPropsWithoutRef<typeof Dialog> {
    tasks: any[]
    showTrigger?: boolean
    onSuccess?: () => void
    name: string
}

export function DeleteDialog({
    tasks,
    showTrigger = true,
    onSuccess,
    name,
    ...props
}: DeleteTasksDialogProps) {
    const [isDeletePending, startDeleteTransition] = useTransition()

    // const setClasses = useSetRecoilState(classesData);
    const deleteClass = async (id: number | number[]) => {
        // const supabase = createClient();
        // if (Array.isArray(id)) {
        //     const { error } = await supabase
        //         .from("class")
        //         .delete()
        //         .in("id", id);
        //     if (error) {
        //         console.log(`Error deleting class with ID ${id}:`, error);
        //     } else {
        //         setClasses((prevClasses) =>
        //             prevClasses.filter((c) => !id.includes(c.id))
        //         );
        //         console.log(`Class with ID ${id} deleted`);
        //     }
        // } else {
        //     const { error } = await supabase
        //         .from("class")
        //         .delete()
        //         .eq("id", id);
        //     if (error) {
        //         console.log(`Error deleting class with ID ${id}:`, error);
        //     } else {
        //         setClasses((prevClasses) => prevClasses.filter((c) => c.id !== id));
        //         console.log(`Class with a ID ${id} deleted`);
        //     }
        // }
        return { error: null };
    };

    function onDelete() {
        startDeleteTransition(async () => {
            const { error } = await deleteClass(tasks.map((task) => task.id));

            if (error) {
                toast.error(error);
                return;
            }

            props.onOpenChange?.(false);
            toast.success(`${name}s deleted`);
            onSuccess?.();
        });
    }

    return (
        <Dialog {...props}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete ({tasks.length})
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your{" "}
                        <span className="font-medium">{tasks.length}</span>
                        {tasks.length === 1 ? ` ${name}` : (name.toLocaleLowerCase() == "class" ? " classes" : ` ${name}s`)} from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        aria-label="Delete selected rows"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isDeletePending}
                    >
                        {isDeletePending && (
                            <ReloadIcon
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
