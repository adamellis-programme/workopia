import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
} from './pages'
/**
 * each route is an object
 * path what we see when we navigate to a specific url / = domain: localhost or wwww.
 *
 * http://localhost:5173/dashboard/admin nested routes
 *
 * ask why not / ... relative?
 */

// runs when the component mounts
// App.js runs once so when the user logs out we get inconsistoncies so we need to export the function
// was originally passed down to the <Dashboard/> component as john made the dashboard component the ENTRY POINT to the whole app
export const checkDefaultTheme = () => {
  // 'true as a string in local storage' retrurns a boolean of the representatin in local storage.
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  console.log(isDarkTheme)
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout  />,
        children: [
          {
            index: true, // right away displayed to the user
            element: <AddJob />,
          },
          { path: 'stats', element: <Stats /> },
          {
            path: 'all-jobs',
            element: <AllJobs />,
          },

          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
          },
        ],
      },
    ],
  },
])
const App = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
