import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select } from './ui/select'
import { Slider } from './ui/slider'
import { cn } from '../lib/utils'

const DashboardNew = () => {
  const [activePage, setActivePage] = useState('home')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [designConfig, setDesignConfig] = useState({
    colors: {
      primary: '#3498db',
      secondary: '#2ecc71',
      accent: '#e74c3c'
    },
    textSizes: {
      heading: '32',
      body: '16',
      small: '14'
    },
    spacing: {
      padding: '20',
      margin: '15'
    }
  })
  
  const [orders, setOrders] = useState({
    ongoing: [
      { id: 'ORD-001', customer: 'John Doe', type: 'Monthly Planner' },
      { id: 'ORD-002', customer: 'Jane Smith', type: 'Weekly Planner' },
      { id: 'ORD-003', customer: 'Bob Johnson', type: 'Custom Planner' }
    ],
    fulfilled: [
      { id: 'ORD-004', customer: 'Alice Brown', type: 'Yearly Planner' },
      { id: 'ORD-005', customer: 'Charlie Davis', type: 'Monthly Planner' }
    ],
    pending: [
      { id: 'ORD-006', customer: 'Eva Wilson', type: 'Weekly Planner' },
      { id: 'ORD-007', customer: 'Frank Miller', type: 'Custom Planner' }
    ],
    cancelled: [
      { id: 'ORD-008', customer: 'Grace Taylor', type: 'Monthly Planner' }
    ]
  })

  // Load saved design configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('designConfig')
    if (savedConfig) {
      setDesignConfig(JSON.parse(savedConfig))
    }
  }, [])

  // Save design configuration
  const handleSaveDesign = () => {
    localStorage.setItem('designConfig', JSON.stringify(designConfig))
    
    // Create downloadable file
    const dataStr = JSON.stringify(designConfig, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'design-config.json'
    link.click()
    URL.revokeObjectURL(url)
    
    alert('Design configuration saved successfully!')
  }

  // Handle planner form submission
  const handlePlannerSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const orderData = {
      orderId: 'PLN-' + Date.now(),
      timestamp: new Date().toISOString(),
      customerName: formData.get('customerName'),
      quotes: formData.get('quotes'),
      designTemplate: formData.get('designTemplate'),
      numMonths: formData.get('numMonths'),
      coverDesign: formData.get('coverDesign')
    }
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('plannerOrders') || '[]')
    existingOrders.push(orderData)
    localStorage.setItem('plannerOrders', JSON.stringify(existingOrders))
    
    // Create downloadable file
    const dataStr = JSON.stringify(orderData, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `planner-order-${orderData.orderId}.json`
    link.click()
    URL.revokeObjectURL(url)
    
    // Update orders state
    setOrders(prev => ({
      ...prev,
      pending: [...prev.pending, { 
        id: orderData.orderId, 
        customer: orderData.customerName,
        type: `${orderData.designTemplate} Planner`
      }]
    }))
    
    alert(`Planner order ${orderData.orderId} submitted successfully!`)
    e.target.reset()
  }

  const renderHomePage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your planner orders and business metrics</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Ongoing Orders */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-700">Ongoing Orders</CardTitle>
            <CardDescription>Currently in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-4">{orders.ongoing.length}</div>
            <div className="space-y-2">
              {orders.ongoing.slice(0, 3).map(order => (
                <div key={order.id} className="text-sm text-blue-700">
                  {order.id} - {order.customer}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fulfilled Orders */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-700">Fulfilled Orders</CardTitle>
            <CardDescription>Successfully completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-4">{orders.fulfilled.length}</div>
            <div className="space-y-2">
              {orders.fulfilled.slice(0, 3).map(order => (
                <div key={order.id} className="text-sm text-green-700">
                  {order.id} - {order.customer}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-orange-700">Pending Orders</CardTitle>
            <CardDescription>Awaiting action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 mb-4">{orders.pending.length}</div>
            <div className="space-y-2">
              {orders.pending.slice(0, 3).map(order => (
                <div key={order.id} className="text-sm text-orange-700">
                  {order.id} - {order.customer}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cancelled Orders */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-red-700">Cancelled Orders</CardTitle>
            <CardDescription>Orders cancelled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-4">{orders.cancelled.length}</div>
            <div className="space-y-2">
              {orders.cancelled.slice(0, 3).map(order => (
                <div key={order.id} className="text-sm text-red-700">
                  {order.id} - {order.customer}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderDesignPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Design Management</h1>
        <p className="text-muted-foreground">Customize colors, typography, and spacing for your planners</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Color Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Color Settings</CardTitle>
            <CardDescription>Customize your brand colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input 
                  type="color" 
                  id="primary-color" 
                  value={designConfig.colors.primary}
                  onChange={(e) => setDesignConfig(prev => ({
                    ...prev,
                    colors: { ...prev.colors, primary: e.target.value }
                  }))}
                  className="w-12 h-10 rounded border border-input"
                />
                <Input 
                  value={designConfig.colors.primary} 
                  readOnly 
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input 
                  type="color" 
                  id="secondary-color" 
                  value={designConfig.colors.secondary}
                  onChange={(e) => setDesignConfig(prev => ({
                    ...prev,
                    colors: { ...prev.colors, secondary: e.target.value }
                  }))}
                  className="w-12 h-10 rounded border border-input"
                />
                <Input 
                  value={designConfig.colors.secondary} 
                  readOnly 
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input 
                  type="color" 
                  id="accent-color" 
                  value={designConfig.colors.accent}
                  onChange={(e) => setDesignConfig(prev => ({
                    ...prev,
                    colors: { ...prev.colors, accent: e.target.value }
                  }))}
                  className="w-12 h-10 rounded border border-input"
                />
                <Input 
                  value={designConfig.colors.accent} 
                  readOnly 
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Size Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Typography Settings</CardTitle>
            <CardDescription>Adjust text sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Heading Size: {designConfig.textSizes.heading}px</Label>
              <Slider
                value={[parseInt(designConfig.textSizes.heading)]}
                onValueChange={([value]) => setDesignConfig(prev => ({
                  ...prev,
                  textSizes: { ...prev.textSizes, heading: value.toString() }
                }))}
                min={20}
                max={48}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Body Text Size: {designConfig.textSizes.body}px</Label>
              <Slider
                value={[parseInt(designConfig.textSizes.body)]}
                onValueChange={([value]) => setDesignConfig(prev => ({
                  ...prev,
                  textSizes: { ...prev.textSizes, body: value.toString() }
                }))}
                min={12}
                max={24}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Small Text Size: {designConfig.textSizes.small}px</Label>
              <Slider
                value={[parseInt(designConfig.textSizes.small)]}
                onValueChange={([value]) => setDesignConfig(prev => ({
                  ...prev,
                  textSizes: { ...prev.textSizes, small: value.toString() }
                }))}
                min={10}
                max={18}
                step={1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Spacing Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing Settings</CardTitle>
            <CardDescription>Control padding and margins</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Padding: {designConfig.spacing.padding}px</Label>
              <Slider
                value={[parseInt(designConfig.spacing.padding)]}
                onValueChange={([value]) => setDesignConfig(prev => ({
                  ...prev,
                  spacing: { ...prev.spacing, padding: value.toString() }
                }))}
                min={5}
                max={50}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Margin: {designConfig.spacing.margin}px</Label>
              <Slider
                value={[parseInt(designConfig.spacing.margin)]}
                onValueChange={([value]) => setDesignConfig(prev => ({
                  ...prev,
                  spacing: { ...prev.spacing, margin: value.toString() }
                }))}
                min={5}
                max={50}
                step={1}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleSaveDesign} className="w-full">
            Save Design Configuration
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPlannerPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Planner Generator</h1>
        <p className="text-muted-foreground">Create customized planners for your customers</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>New Planner Order</CardTitle>
          <CardDescription>Fill out the form to generate a custom planner</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePlannerSubmit} className="space-y-4">
            <div>
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input 
                id="customer-name" 
                name="customerName" 
                placeholder="Enter customer name"
                required 
              />
            </div>

            <div>
              <Label htmlFor="quotes">Inspirational Quotes</Label>
              <Textarea 
                id="quotes" 
                name="quotes" 
                placeholder="Enter inspirational quotes for the planner..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="design-template">Design Template</Label>
              <Select id="design-template" name="designTemplate" required>
                <option value="">Select a design</option>
                <option value="minimalist">Minimalist</option>
                <option value="floral">Floral</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="num-months">Duration</Label>
              <Select id="num-months" name="numMonths" required>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </Select>
            </div>

            <div>
              <Label>Cover Design</Label>
              <div className="flex space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="coverDesign" 
                    value="hardcover" 
                    required 
                    className="w-4 h-4"
                  />
                  <span>Hardcover</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="coverDesign" 
                    value="softcover" 
                    required 
                    className="w-4 h-4"
                  />
                  <span>Softcover</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Generate Planner
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )

  const renderSettingsPage = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>General settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Settings panel coming soon...</p>
            <p className="text-sm mt-2">This is a placeholder for future configuration options.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return renderHomePage()
      case 'design':
        return renderDesignPage()
      case 'planner':
        return renderPlannerPage()
      case 'settings':
        return renderSettingsPage()
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activePage={activePage}
        setActivePage={setActivePage}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        "p-6"
      )}>
        {renderContent()}
      </main>
    </div>
  )
}

export default DashboardNew