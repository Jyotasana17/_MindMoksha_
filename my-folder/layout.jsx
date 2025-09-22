import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Heart, 
  Brain, 
  Music, 
  PersonStanding, // Changed from Yoga to PersonStanding
  Gamepad2, 
  MessageCircle, 
  BarChart3,
  Shield,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Wellness Hub",
    url: createPageUrl("Dashboard"),
    icon: Heart,
    color: "text-emerald-600"
  },
  {
    title: "Health Check",
    url: createPageUrl("Assessment"),
    icon: BarChart3,
    color: "text-blue-600"
  },
  {
    title: "Self-Care",
    url: createPageUrl("Activities"),
    icon: Brain,
    color: "text-purple-600"
  },
  {
    title: "Music Therapy",
    url: createPageUrl("Music"),
    icon: Music,
    color: "text-pink-600"
  },
  {
    title: "Mindful Movement",
    url: createPageUrl("Yoga"),
    icon: PersonStanding, // Changed from Yoga to PersonStanding
    color: "text-orange-600"
  },
  {
    title: "Wellness Games",
    url: createPageUrl("Games"),
    icon: Gamepad2, 
    color: "text-indigo-600"
  },
  {
    title: "AI Companion",
    url: createPageUrl("Chat"),
    icon: MessageCircle,
    color: "text-teal-600"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --sage-50: #f7f9f7;
            --sage-100: #eef2ee;
            --sage-200: #d9e2d9;
            --sage-300: #b8c8b8;
            --sage-400: #91a791;
            --sage-500: #6f886f;
            --sage-600: #5a7c5a;
            --sage-700: #4a6a4a;
            --sage-800: #3d5a3d;
            --sage-900: #334d33;
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #f0f9ff 0%, #f7f9f7 50%, #fef3f2 100%);
          }
          
          .therapy-gradient {
            background: linear-gradient(135deg, var(--sage-50) 0%, #f0f9ff 100%);
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full gradient-bg">
        <Sidebar className="border-r border-sage-200/50 glass-effect">
          <SidebarHeader className="border-b border-sage-200/50 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-sage-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sage-800 text-lg">MindfulCare</h2>
                <p className="text-xs text-sage-600">Your mental wellness companion</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`
                          rounded-xl transition-all duration-300 hover:shadow-md p-4 mb-1
                          ${location.pathname === item.url 
                            ? 'bg-white shadow-lg border border-sage-200/50 text-sage-800' 
                            : 'hover:bg-white/60 text-sage-700 hover:text-sage-800'
                          }
                        `}
                      >
                        <Link to={item.url} className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            location.pathname === item.url 
                              ? 'bg-sage-100' 
                              : 'bg-sage-50'
                          }`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                          </div>
                          <span className="font-medium text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-sage-200/50 p-6">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sage-800 text-sm">Privacy Protected</p>
                <p className="text-xs text-sage-600">Your data is encrypted & secure</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          {/* Mobile header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-sage-200/50 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-sage-100 p-2 rounded-lg transition-colors duration-200" />
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-emerald-500" />
                <h1 className="text-lg font-bold text-sage-800">MindfulCare</h1>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
