import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('home');
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
  });
  
  const [orders, setOrders] = useState({
    ongoing: [
      { id: 'ORD-001', customer: 'John Doe' },
      { id: 'ORD-002', customer: 'Jane Smith' },
      { id: 'ORD-003', customer: 'Bob Johnson' }
    ],
    fulfilled: [
      { id: 'ORD-004', customer: 'Alice Brown' },
      { id: 'ORD-005', customer: 'Charlie Davis' }
    ],
    pending: [
      { id: 'ORD-006', customer: 'Eva Wilson' },
      { id: 'ORD-007', customer: 'Frank Miller' }
    ],
    cancelled: [
      { id: 'ORD-008', customer: 'Grace Taylor' }
    ]
  });

  // Load saved design configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('designConfig');
    if (savedConfig) {
      setDesignConfig(JSON.parse(savedConfig));
    }
  }, []);

  // Save design configuration
  const handleSaveDesign = () => {
    localStorage.setItem('designConfig', JSON.stringify(designConfig));
    
    // Create downloadable file
    const dataStr = JSON.stringify(designConfig, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'design-config.json';
    link.click();
    URL.revokeObjectURL(url);
    
    alert('Design configuration saved successfully!');
  };

  // Handle planner form submission
  const handlePlannerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      orderId: 'PLN-' + Date.now(),
      timestamp: new Date().toISOString(),
      customerName: formData.get('customerName'),
      quotes: formData.get('quotes'),
      designTemplate: formData.get('designTemplate'),
      numMonths: formData.get('numMonths'),
      coverDesign: formData.get('coverDesign')
    };
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('plannerOrders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('plannerOrders', JSON.stringify(existingOrders));
    
    // Create downloadable file
    const dataStr = JSON.stringify(orderData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `planner-order-${orderData.orderId}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    // Update orders state
    setOrders(prev => ({
      ...prev,
      pending: [...prev.pending, { id: orderData.orderId, customer: orderData.customerName }]
    }));
    
    alert(`Planner order ${orderData.orderId} submitted successfully!`);
    e.target.reset();
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-logo">Planner Dashboard</h1>
          <ul className="nav-menu">
            <li>
              <button 
                className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
                onClick={() => setActivePage('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activePage === 'design' ? 'active' : ''}`}
                onClick={() => setActivePage('design')}
              >
                Product Design Management
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activePage === 'planner' ? 'active' : ''}`}
                onClick={() => setActivePage('planner')}
              >
                Planner Generator
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activePage === 'settings' ? 'active' : ''}`}
                onClick={() => setActivePage('settings')}
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="content">
        {/* Home Page */}
        {activePage === 'home' && (
          <section className="page">
            <h2>Dashboard Overview</h2>
            <div className="order-summary">
              <div className="order-card ongoing">
                <h3>Ongoing Orders</h3>
                <div className="order-count">{orders.ongoing.length}</div>
                <ul className="order-list">
                  {orders.ongoing.map(order => (
                    <li key={order.id}>{order.id} - {order.customer}</li>
                  ))}
                </ul>
              </div>
              <div className="order-card fulfilled">
                <h3>Fulfilled Orders</h3>
                <div className="order-count">{orders.fulfilled.length}</div>
                <ul className="order-list">
                  {orders.fulfilled.map(order => (
                    <li key={order.id}>{order.id} - {order.customer}</li>
                  ))}
                </ul>
              </div>
              <div className="order-card pending">
                <h3>Pending Orders</h3>
                <div className="order-count">{orders.pending.length}</div>
                <ul className="order-list">
                  {orders.pending.map(order => (
                    <li key={order.id}>{order.id} - {order.customer}</li>
                  ))}
                </ul>
              </div>
              <div className="order-card cancelled">
                <h3>Cancelled Orders</h3>
                <div className="order-count">{orders.cancelled.length}</div>
                <ul className="order-list">
                  {orders.cancelled.map(order => (
                    <li key={order.id}>{order.id} - {order.customer}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Product Design Management Page */}
        {activePage === 'design' && (
          <section className="page">
            <h2>Product Design Management</h2>
            <div className="design-controls">
              <div className="control-group">
                <h3>Color Settings</h3>
                <div className="control-item">
                  <label htmlFor="primary-color">Primary Color:</label>
                  <input 
                    type="color" 
                    id="primary-color" 
                    value={designConfig.colors.primary}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      colors: { ...prev.colors, primary: e.target.value }
                    }))}
                  />
                </div>
                <div className="control-item">
                  <label htmlFor="secondary-color">Secondary Color:</label>
                  <input 
                    type="color" 
                    id="secondary-color" 
                    value={designConfig.colors.secondary}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      colors: { ...prev.colors, secondary: e.target.value }
                    }))}
                  />
                </div>
                <div className="control-item">
                  <label htmlFor="accent-color">Accent Color:</label>
                  <input 
                    type="color" 
                    id="accent-color" 
                    value={designConfig.colors.accent}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      colors: { ...prev.colors, accent: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <div className="control-group">
                <h3>Text Size Settings</h3>
                <div className="control-item">
                  <label htmlFor="heading-size">Heading Size (px):</label>
                  <input 
                    type="range" 
                    id="heading-size" 
                    min="20" 
                    max="48" 
                    value={designConfig.textSizes.heading}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      textSizes: { ...prev.textSizes, heading: e.target.value }
                    }))}
                  />
                  <span className="range-value">{designConfig.textSizes.heading}px</span>
                </div>
                <div className="control-item">
                  <label htmlFor="body-size">Body Text Size (px):</label>
                  <input 
                    type="range" 
                    id="body-size" 
                    min="12" 
                    max="24" 
                    value={designConfig.textSizes.body}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      textSizes: { ...prev.textSizes, body: e.target.value }
                    }))}
                  />
                  <span className="range-value">{designConfig.textSizes.body}px</span>
                </div>
                <div className="control-item">
                  <label htmlFor="small-size">Small Text Size (px):</label>
                  <input 
                    type="range" 
                    id="small-size" 
                    min="10" 
                    max="18" 
                    value={designConfig.textSizes.small}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      textSizes: { ...prev.textSizes, small: e.target.value }
                    }))}
                  />
                  <span className="range-value">{designConfig.textSizes.small}px</span>
                </div>
              </div>

              <div className="control-group">
                <h3>Spacing Controls</h3>
                <div className="control-item">
                  <label htmlFor="padding">Padding (px):</label>
                  <input 
                    type="range" 
                    id="padding" 
                    min="5" 
                    max="50" 
                    value={designConfig.spacing.padding}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      spacing: { ...prev.spacing, padding: e.target.value }
                    }))}
                  />
                  <span className="range-value">{designConfig.spacing.padding}px</span>
                </div>
                <div className="control-item">
                  <label htmlFor="margin">Margin (px):</label>
                  <input 
                    type="range" 
                    id="margin" 
                    min="5" 
                    max="50" 
                    value={designConfig.spacing.margin}
                    onChange={(e) => setDesignConfig(prev => ({
                      ...prev,
                      spacing: { ...prev.spacing, margin: e.target.value }
                    }))}
                  />
                  <span className="range-value">{designConfig.spacing.margin}px</span>
                </div>
              </div>

              <button className="btn-primary" onClick={handleSaveDesign}>
                Save Design Configuration
              </button>
            </div>
          </section>
        )}

        {/* Planner Generator Page */}
        {activePage === 'planner' && (
          <section className="page">
            <h2>Planner Generator</h2>
            <form className="planner-form" onSubmit={handlePlannerSubmit}>
              <div className="form-group">
                <label htmlFor="customer-name">Customer Name:</label>
                <input 
                  type="text" 
                  id="customer-name" 
                  name="customerName" 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="quotes">Inspirational Quotes:</label>
                <textarea 
                  id="quotes" 
                  name="quotes" 
                  rows="4" 
                  placeholder="Enter your inspirational quotes here..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="design-template">Design Chosen:</label>
                <select id="design-template" name="designTemplate" required>
                  <option value="">Select a design</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="floral">Floral</option>
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="num-months">Number of Months:</label>
                <select id="num-months" name="numMonths" required>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                </select>
              </div>

              <div className="form-group">
                <label>Cover Design:</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="coverDesign" 
                      value="hardcover" 
                      required 
                    />
                    Hardcover
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="coverDesign" 
                      value="softcover" 
                      required 
                    />
                    Softcover
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Generate Planner
              </button>
            </form>
          </section>
        )}

        {/* Settings Page */}
        {activePage === 'settings' && (
          <section className="page">
            <h2>Settings</h2>
            <div className="settings-container">
              <p>General application settings will be configured here.</p>
              <div className="settings-placeholder">
                <h3>Application Settings</h3>
                <p>This is a placeholder for future settings options.</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Dashboard;