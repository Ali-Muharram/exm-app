import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGlobalMutations } from "@/hooks/global-mutation.hooks";
import { Loader2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function DeleteAccount() {
  /* -------------------------------- save data ------------------------------- */
  const DeleteMyAccount = useGlobalMutations({
    url: "/api/profile",
    toastError: true,
    methods: "DELETE",
    nativeUrl: true,
  });

  const Delete = async () => {
    await DeleteMyAccount.mutateAsync({});
    signOut();
  };
  return (
    <Dialog>
      <DialogTrigger
        className={`mt-3 flex w-full items-center justify-center gap-2.5 bg-red-50 px-4 py-2.5 text-destructive hover:bg-red-100`}
      >
        Delete My Account
      </DialogTrigger>
      <DialogContent className="max-w-[34.9rem] p-0">
        <DialogHeader className="flex flex-col items-center justify-center gap-8 p-9">
          <Image className="h-[7.5rem] w-[7.5rem]" src={"/icons/alert.svg"} width={120} height={120} alt="alert icon" />
          <div>
            <DialogTitle className="text-center text-lg font-medium text-destructive">
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription className="text-center font-normal text-muted-forground">
              This action is permanent and cannot be undone.
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="gap-2.5 border p-6">
          <DialogClose asChild>
            <Button className="w-full" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={Delete}
            disabled={DeleteMyAccount.isPending}
            className="w-full"
            type="submit"
            variant={"destructive"}
          >
            Yes, delete
            <Loader2Icon className={`${DeleteMyAccount.isPending ? "animate-spin" : "hidden"}`} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
