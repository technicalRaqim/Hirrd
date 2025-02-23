
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
// import { Button } from './components/ui/button'
import AppLayout from './layout/app-layout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import MyListing from './pages/MyListing'
import PostJob from './pages/PostJob'
import MyJobs from './pages/MyJobs'
import SaveJobs from './pages/SaveJobs'
import JobPage from './pages/JobPage'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/protected-route'


const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/onboarding",
        element:(
          <ProtectedRoute>
            <Onboarding/>
          </ProtectedRoute>
        )
      },
      {
        path:"/jobs",
        element:(
          <ProtectedRoute>
            <MyListing/>
          </ProtectedRoute>
        )
      },
      {
        path:"/job/:id",
        element:(
          <ProtectedRoute>
            <JobPage/>
          </ProtectedRoute>
        )
      },
      {
        path:"post-job",
        element:(
          <ProtectedRoute>
            <PostJob/>
          </ProtectedRoute>
        )
      },
      {
        path:"save-jobs",
        element:(
          <ProtectedRoute>
            <SaveJobs/>
          </ProtectedRoute>
        )
      },
      {
        path:"my-jobs",
        element:(
          <ProtectedRoute>
            <MyJobs/>
          </ProtectedRoute>
        )
      }
    ]
  }
])

function App() {
  

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router}/>
    </ThemeProvider>
      
       
    </>
  )
}

export default App
