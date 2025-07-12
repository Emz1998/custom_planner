import React from 'react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { 
  Home, 
  Palette, 
  FileText, 
  Settings, 
  PanelLeftClose, 
  PanelLeftOpen 
} from 'lucide-react'

const Sidebar = ({ activePage, setActivePage, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      description: 'Dashboard Overview'
    },
    {
      id: 'design',
      label: 'Product Design',
      icon: Palette,
      description: 'Design Management'
    },
    {
      id: 'planner',
      label: 'Planner Generator',
      icon: FileText,
      description: 'Create Planners'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'App Settings'
    }
  ]

  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-800">Planner Dashboard</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          const isActive = activePage === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start h-12 transition-all duration-200",
                isCollapsed ? "px-3" : "px-4",
                isActive && "bg-blue-600 text-white hover:bg-blue-700"
              )}
              onClick={() => setActivePage(item.id)}
            >
              <IconComponent className={cn("h-5 w-5", isCollapsed ? "" : "mr-3")} />
              {!isCollapsed && (
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs opacity-70">{item.description}</span>
                </div>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Custom Planner v1.0
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar