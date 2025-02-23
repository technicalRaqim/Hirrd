import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useLocation ,Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const { isLoaded, isSignedIn, user}=useUser()
    const{pathname}=useLocation()

    if(isLoaded && !isSignedIn && isSignedIn !== undefined){
        return <Navigate to="/?sign-in=true"/>
    }
      
    //check onboarding status
    if(user !== undefined &&
      !user?.unsafeMetadata?.role &&
      pathname !== "/onboarding"
    ) return <Navigate to="/onboarding"/>
  return children
}

export default ProtectedRoute 

// import React from "react";
// import { useUser } from "@clerk/clerk-react";
// import { useLocation, Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isLoaded, isSignedIn, user } = useUser();
//   const { pathname } = useLocation();

//   // Wait until user data is fully loaded
//   if (!isLoaded) return <p>Loading...</p>;

//   // Redirect to sign-in page if the user is not signed in
//   if (!isSignedIn) {
//     return <Navigate to="/?sign-in=true" />;
//   }

//   // Redirect to onboarding if role is missing and user is signed in
//   if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
//     return <Navigate to="/onboarding" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
