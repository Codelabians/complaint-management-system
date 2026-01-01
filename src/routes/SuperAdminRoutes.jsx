// routes/SidebarRoutes.js
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import {
    Headphones,
    Mail,
    SquareStack,
  Ticket,
  User,
} from "lucide-react";

export const SuperAdminRoutes = [
  { label: "User Details", path: "portal/users", icon: User },
  {label : "Community" , path : 'portal/community' , icon : SquareStack},
  {label : "Support Tickets" , path : 'portal/tickets' , icon : Headphones},
  {label : "Assign Support" , path : 'portal/assign-support' , icon : Ticket},
  {label : "Demo Request" , path : 'portal/demo-request' , icon : Mail},
    {label : "Chat" , path : 'portal/chat' , icon : ChatBubbleBottomCenterIcon},

];
