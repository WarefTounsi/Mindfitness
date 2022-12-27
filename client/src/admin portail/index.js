import {
  fetchUtils,
  Admin,
  ListGuesser,
  Resource,
  EditGuesser,
  ShowGuesser,
  Link,
} from "react-admin";
import { CreateButton } from "react-admin";
import restProvider from "ra-data-simple-rest";
import { Title } from "react-admin";
import { AdminLayout } from "./AdminLayout";
import { coachCreate, coachIcon, coachList, coachEdit } from "./coachs";
import {
  trainingCreate,
  TrainingList,
  trainingEdit,
  trainingIcon,
} from "./trainings";
import MyDataProvider from "./AdminDataProvider";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { partnerIcon, partnerCreate, partnerList } from "./partners";
import { userIcon, userList } from "./users";
import { NavLink } from "react-router-dom";
import { Dashboard } from "./dashboard";

export default function AdminPortail() {
  const dataProvider = MyDataProvider;

  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      dashboard={Dashboard}
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
        list={TrainingList}
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
