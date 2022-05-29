import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Activity from '../components/activity/activity'
import Projects from '../components/projects/projects'
import Skills from '../components/skills/skills'
import About from '../components/about/about'

export default function Content() {
  return (
    <div className="content-display">
      <div className="border-img">
        <div className="inner-container">
          <Routes>
            <Route path='*' element={<Navigate to='/' />} />
            <Route path='/' element={<About />} />
            <Route path='about' element={<About />} />
            <Route path='skills' element={<Skills />} />
            <Route path='projects' element={<Projects />} />
            <Route path='activity' element={<Activity />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
