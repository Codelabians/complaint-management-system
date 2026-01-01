// src/routes/Routes.jsx
import React from "react";
import MainLayout from "@/ui/layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import MeetingMinutues from "@/pages/meetingMinutes/MeetingMinutues";
import PortalLayout from "@/ui/layout/PortalLayout";
import Homepage from "@/pages/homepage/Homepage";
import UserDetails from "@/pages/user/UserDetails";
import EmailPreference from "@/pages/emailPreferences/EmailPreference";
import Committees from "@/pages/committees/Committees";
import AccessInformation from "@/pages/accessinfo/AccessInformation";
import NewsLetter from "@/pages/newsletter/NewsLetter";
import CommonDocuments from "@/pages/commondocuments/CommonDocuments";
import FinancialDocuments from "@/pages/financialdocs/FinancialDocuments";
import BoardDocuments from "@/pages/boarddocs/BoardDocuments";
import HoaBoardMembers from "@/pages/BoardMembers/HoaBoardMembers";
import MembersDirectory from "@/pages/BoardMembers/MembersDirectory";
import Login from "@/pages/auth/Login";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import RegisterForAdmin from "@/pages/auth/admin/RegisterForAdmin";
import ChooseRole from "@/pages/role/ChooseRole";
import RegisterForMember from "@/pages/auth/member/RegisterForMember";
import ProtectedRoute from "./ProtectedRoutes";
import WebLinks from "@/pages/weblinks/WebLinks";
import ManageDocs from "@/pages/boarddocs/ManageDocs";
import CalendarAndReservations from "@/pages/calendarAndReservation/CalendarAndReservations";
import Pools from "@/pages/pools/Pools";
import SwimTeamInfo from "@/pages/swinTeamInfo/SwimTeamInfo";
import Tennis from "@/pages/tennis/Tennis";
import MassEmailCommunications from "@/pages/massEmailCommunications/MassEmailCommunications";
import Faqs from "@/pages/faqs/Faqs";
import Help from "@/pages/help/Help";
import Pages from "@/pages/page/Pages";
import Maps from "@/pages/homepage/components/Maps";
import Events from "@/pages/homepage/components/Events";
import LegalDocs from "@/pages/homepage/components/LegalDocs";
import Settings from "@/pages/settings/Settings";
import Users from "@/super admin/Users";
import Community from "@/super admin/Community";
import Tickets from "@/super admin/Tickets";
import AssignTickets from "@/super admin/AssignSupport";
import RequestDemo from "@/super admin/RequestDemo";

const AppRouter = () => {
  return (
    <Routes>
      {/* <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/web-links" element={<WebLinks />} />
        <Route path="/map" element={<Maps />} />
        <Route path="/events" element={<Events />} />
        <Route path="/legal-docs" element={<LegalDocs />} />
      </Route> */}

      {/* Portal Layout — only when /portal/... is accessed */}
      <Route
        path="/portal"
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        <Route path="user-details" element={<UserDetails />} />
        <Route path="email-preference" element={<EmailPreference />} />
        <Route path="committees" element={<Committees />} />
        <Route path="access-information" element={<AccessInformation />} />
        <Route path="hoa-board" element={<HoaBoardMembers />} />
        <Route path="member-directory" element={<MembersDirectory />} />
        <Route path="newsletter" element={<NewsLetter />} />
        <Route path="common-documents" element={<CommonDocuments />} />
        <Route path="monthly-meeting-minutes" element={<MeetingMinutues />} />
        <Route path="financial-documents" element={<FinancialDocuments />} />
        <Route path="board-documents" element={<BoardDocuments />} />
        <Route path="manage-docs" element={<ManageDocs />} />
        <Route
          path="calender-reservations"
          element={<CalendarAndReservations />}
        />
        <Route path="pools" element={<Pools />} />
        <Route path="stingrays-swim-team" element={<SwimTeamInfo />} />
        <Route path="tennis" element={<Tennis />} />
        <Route path="pages" element={<Pages />} />
        <Route path="help" element={<Help />} />
        <Route path="mass-email" element={<MassEmailCommunications />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />
        <Route path="community" element={<Community />} />
        <Route path="tickets" element={<Tickets />} />
        <Route path="assign-support" element={<AssignTickets />} />
        <Route path="demo-request" element={<RequestDemo/>} />
      
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/register-for-admin" element={<RegisterForAdmin />} />
      <Route path="/register-for-member" element={<RegisterForMember />} />
      <Route path="/choose-role" element={<ChooseRole />} />
    </Routes>
  );
};

export default AppRouter;
