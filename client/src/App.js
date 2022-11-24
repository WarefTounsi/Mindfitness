import { Route, Routes } from "react-router-dom";
import AdminPortail from "./admin portail";

import Login from "./components/Login";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./components/Register";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import Trainer from "./pages/Trainer";
import Training from "./pages/Training";
import TrainingTemplate from "./components/TrainingTemplate";
import TrainerTemplate from "./pages/TrainerTemplate";
import { TrainerCalendar } from "./TrainerPortail/Calendar";
import Reservations from "./TrainerPortail/Reservations";
import Summary from "./TrainerPortail/Summary";
import Courses from "./TrainerPortail/Courses";
import Profile from "./UserPortail/Profile";
import Panier from "./UserPortail/Panier";
import Reservation from "./UserPortail/Reservation";
import Logout from "./components/Logout";
import PaymentResult from "./components/PaymentResult";
import { createTheme } from "@mui/material";

function App() {
  const ROLES = {
    User: 3,
    Trainer: 2,
    Admin: 1,
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* admin routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin/*" element={<AdminPortail />} />
        </Route>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="blog" element={<Blog />} />
        <Route path="trainer" element={<Trainer />} />
        <Route path="training" element={<Training />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="training/:id" element={<TrainingTemplate />} />
        <Route path="trainer/:id" element={<TrainerTemplate />} />
        <Route path="success-payment" element={<PaymentResult type={true} />} />
        <Route path="failed-payment" element={<PaymentResult type={false} />} />

        {/* we want to protect these routes */}
        <Route
          path="trainer-profile"
          element={<RequireAuth allowedRoles={[ROLES.Trainer]} />}
        >
          <Route path="summary" element={<Summary />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="calendar" element={<TrainerCalendar />} />
          <Route path="courses" element={<Courses />} />
        </Route>

        <Route
          path="user-profile"
          element={<RequireAuth allowedRoles={[ROLES.User]} />}
        >
          <Route path="reservation" element={<Reservation />} />
          <Route path="profile" element={<Profile />} />
          <Route path="panier" element={<Panier />} />
        </Route>
        {/* catch all */}
        <Route path="/*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
export default App;
