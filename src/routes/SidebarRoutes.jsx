import { CreditCard, Users } from "lucide-react";
import Subscription from "@/pages/subscription/Subscription";
import UserDetails from "@/pages/user/UserDetails";
import Committees from "@/pages/committees/Committees";
import AccessInformation from "@/pages/accessinfo/AccessInformation";
import HoaBoardMembers from "@/pages/BoardMembers/HoaBoardMembers";
import MembersDirectory from "@/pages/BoardMembers/MembersDirectory";
import NewsLetter from "@/pages/newsletter/NewsLetter";
import CommonDocuments from "@/pages/commondocuments/CommonDocuments";
import MeetingMinutues from "@/pages/meetingMinutes/MeetingMinutues";
import FinancialDocuments from "@/pages/financialdocs/FinancialDocuments";
import BoardDocuments from "@/pages/boarddocs/BoardDocuments";
import ManageDocs from "@/pages/boarddocs/ManageDocs";

export const sidebarRoutes = [
  {
    path: "subscription-plan",
    label: "Subscription Plan",
    icon: CreditCard,
    element: <Subscription />,
  },
  {
    path: "communities",
    label: "Communities",
    icon: Users,
    element: <ManageDocs/>,
  },
   
];
