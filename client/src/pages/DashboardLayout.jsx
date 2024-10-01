// DASHBOARD LAYOUT IS THE MAIN ENTRY POINT TO THIS APP
// and is used to access all children components of the app
// exept for the login, register, logout etc!

import { Outlet } from 'react-router-dom'

import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar } from '../components'

import { useState, createContext, useContext } from 'react'

// this is brought in from App.js as Dashboard layout was made the main entry point
import { checkDefaultTheme } from '../App'
const DashboardContext = createContext()

const DashboardLayout = () => {
  // temp
  const user = { name: 'john' }

  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme())

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    // reverse the is dark theme boolean
    setIsDarkTheme(newDarkTheme)
    // whatever value the newDarkTheme is as a boolean, that gets used as a toggle true/false
    document.body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = async () => {
    console.log('logout user')
  }

  return (
    // this stops prop drilling
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {/* outlet needs the global context  */}
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

// custom hook so we do not need to export the main context
export const useDashboardContext = () => useContext(DashboardContext)

export default DashboardLayout
