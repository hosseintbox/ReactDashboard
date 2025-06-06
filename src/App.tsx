
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NewRequest from "./pages/Request/NewRequest/NewRequest";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { queryClient } from "./setting/reactQuery/QueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RequestList from "./pages/Request/RequestList/RequestList";
import DestinationRequestForm from "./components/request/DestinationRequestForm";
import OriginRequest from "./pages/Request/OriginRequest/OriginRequest";
import RequestDetail from "./pages/Request/RequestDetail/RequestDetail";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
          <QueryClientProvider client={queryClient}>
  <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
         <Route path="/" element={<Navigate to="/signin" replace />} />

            {/* Others Page */}
            <Route path="/NewRequest" element={<NewRequest/>}/>
            <Route path="/OriginRequest" element={<OriginRequest/>}/>
            <Route path="/DestinationRequest" element={<DestinationRequestForm/>}/>
            <Route path= {`/RequestDetail/:id`} element={<RequestDetail/>}/>
            <Route path="/Home" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/RequestList" element={<RequestList/>}/>

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
          </QueryClientProvider>
    
    </>
  );
}
