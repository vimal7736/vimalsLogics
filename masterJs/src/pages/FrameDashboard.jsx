// src/components/DashboardHeader.jsx
"use client"
import { animate, hover } from "motion"
import { splitText } from "motion-plus"
import { useMotionValue } from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function DashboardHeader() {
  const containerRef = useRef(null)
  const velocityX = useMotionValue(0)
  const velocityY = useMotionValue(0)
  const prevEvent = useRef(0)
  const [stats, setStats] = useState({
    users: 1482,
    revenue: "$23,489",
    growth: "14.2%",
    tasks: 37
  })

  useEffect(() => {
    if (!containerRef.current) return
    const { chars } = splitText(containerRef.current.querySelector(".dashboard-title"))
    
    const handlePointerMove = (event) => {
      const now = performance.now()
      const timeSinceLastEvent = (now - prevEvent.current) / 1000 // seconds
      prevEvent.current = now
      velocityX.set(event.movementX / timeSinceLastEvent)
      velocityY.set(event.movementY / timeSinceLastEvent)
    }
    
    document.addEventListener("pointermove", handlePointerMove)
    
    hover(chars, (element) => {
      // Calculate the speed of the pointer movement
      // and use that to calculate the distance the character should move
      const speed = Math.sqrt(
        velocityX.get() * velocityX.get() +
        velocityY.get() * velocityY.get()
      )
      const angle = Math.atan2(velocityY.get(), velocityX.get())
      const distance = speed * 0.1
      
      animate(
        element,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        },
        { type: "spring", stiffness: 100, damping: 50 }
      )
    })
    
    return () => {
      document.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return (
    <div className="dashboard-container">
      <div className="header-container" ref={containerRef}>
        <h1 className="dashboard-title">Analytics Dashboard</h1>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats.users}</p>
          <div className="stat-chart"></div>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-value">{stats.revenue}</p>
          <div className="stat-chart"></div>
        </div>
        <div className="stat-card">
          <h3>Growth</h3>
          <p className="stat-value">{stats.growth}</p>
          <div className="stat-chart"></div>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p className="stat-value">{stats.tasks}</p>
          <div className="stat-chart"></div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="chart-container">
          <h2>Performance Overview</h2>
          <div className="chart-placeholder"></div>
        </div>
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul className="activity-list">
            <li>New user registration <span className="time">5m ago</span></li>
            <li>Sales report updated <span className="time">15m ago</span></li>
            <li>System maintenance completed <span className="time">1h ago</span></li>
            <li>New feature deployed <span className="time">3h ago</span></li>
          </ul>
        </div>
      </div>
      
      <Stylesheet />
    </div>
  )
}

function Stylesheet() {
  return (
    <style>{`
      .dashboard-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      .header-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 2rem 0;
        margin-bottom: 2rem;
      }
      
      .dashboard-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #0f1115;
        text-align: center;
      }
      
      .split-char {
        will-change: transform, opacity;
      }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
      }
      
      .stat-card {
        background-color: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      
      .stat-card h3 {
        color: #6b7280;
        font-size: 0.9rem;
        margin-top: 0;
        margin-bottom: 0.5rem;
      }
      
      .stat-value {
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0.5rem 0 1rem;
      }
      
      .stat-chart {
        height: 40px;
        background: linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 100%);
        border-radius: 4px;
      }
      
      .dashboard-content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1.5rem;
      }
      
      .chart-container, .recent-activity {
        background-color: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      }
      
      .chart-placeholder {
        height: 300px;
        background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
        border-radius: 4px;
        margin-top: 1rem;
      }
      
      .activity-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .activity-list li {
        padding: 0.75rem 0;
        border-bottom: 1px solid #f3f4f6;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .activity-list li:last-child {
        border-bottom: none;
      }
      
      .time {
        color: #6b7280;
        font-size: 0.8rem;
      }
    `}</style>
  )
}