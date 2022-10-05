import {
  fetchUtils,
  Admin,
  ListGuesser,
  Resource,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { CreateButton } from "react-admin";
import restProvider from "ra-data-simple-rest";
import { Title } from "react-admin";
import { AdminLayout } from "./AdminLayout";
import { coachCreate, coachIcon, coachList, coachEdit } from "./coachs";
import {
  trainingCreate,
  trainingList,
  trainingEdit,
  trainingIcon,
} from "./trainings";
import myDataProvider from "./AdminDataProvider";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { partnerIcon, partnerCreate, partnerList } from "./partners";
import { userIcon, userList } from "./users";

export default function AdminPortail() {
  const dataProvider = myDataProvider;

  return (
    <Admin
      title="mindFitness Dashboard"
      basename="/admin"
      dataProvider={dataProvider}
    >
      <Resource name="user" list={userList} icon={userIcon} />
      <Resource
        name="coach"
        list={coachList}
        edit={coachEdit}
        show={ShowGuesser}
        create={coachCreate}
        icon={coachIcon}
      />
      <Resource
        name="training"
        list={trainingList}
        edit={trainingEdit}
        create={trainingCreate}
        icon={trainingIcon}
      />
      <Resource name="contact" list={ListGuesser} icon={ForwardToInboxIcon} />
      <Resource
        name="partner"
        list={partnerList}
        create={partnerCreate}
        icon={partnerIcon}
      />
    </Admin>
  );
}
