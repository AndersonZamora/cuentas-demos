import { getTotalProfiles } from "@/actions";
import { LayoutContentPage } from "@/components";
import { TableSearchProfiles } from "./ui/TableSearchProfiles";

export default async function ProfilesTotalsPage() {

  const { profiles} = await getTotalProfiles()
 
  return (
    <LayoutContentPage title={"Todos los perfiles"}>
      <TableSearchProfiles profiles={profiles}/>
    </LayoutContentPage>
  );
}