
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";


export default function BookingBtn({ setOpenForm, clsId, pathname }) {
  const {data: session} = useSession();

  return (
    <>
      {pathname === "/teacher" && session?.user?.role === "Teacher" && (
        <Button size="sm" onClick={() => setOpenForm(clsId)}>
          + Book
        </Button>
      )}
    </>
  );
}
