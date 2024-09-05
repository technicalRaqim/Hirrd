import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignIn } from '@clerk/clerk-react'
import { SignInButton } from '@clerk/clerk-react'
import { SignedOut } from '@clerk/clerk-react'
import { UserButton } from '@clerk/clerk-react'
import { SignedIn } from '@clerk/clerk-react'
import { BriefcaseBusiness, PenBox, Heart } from 'lucide-react'
import { useSearchParams} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
const Header = () => {
  const[showSignIn, setShowSignIn]=useState(false)

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleClick=(e)=>{
    if(e.target===e.currentTarget){
      setShowSignIn(false)
      setSearch({})
    } 
  }
  return (
    <>
        <nav className='py-4 flex justify-between items-center'>
            <Link>
                <img  className="h-20" src="/logo.png"/>
            </Link>
            
            <div className='flex gap-8'>
            <SignedOut>
            <Button variant="outline" onClick={()=>setShowSignIn(true)}>Login</Button>
      </SignedOut>
      <SignedIn>
      {user?.unsafeMetadata?.role==="recruiter" && (
        <Link to="/post-job">
        <Button variant="destructive" className="rounded-full">
        <PenBox size={20} className='mr-2'/>
        Post a job</Button>
      </Link>
      )}
        <UserButton 
          appearance={{
            elements:{
              avatarBox:"h-10 w-10"
            }
          }}
          >
          <UserButton.MenuItems>
            <UserButton.Link
            label="My Jobs"
            labelIcon={<BriefcaseBusiness size={15}/>}
            href="/my-jobs"/>
             
             <UserButton.Link
            label="Save Jobs"
            labelIcon={<Heart size={15}/>}
            href="/save-jobs"/>
            
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
            </div>
        </nav>
        {showSignIn && (
          <div className='fixed inset-0  flex items-center justify-center bg-black bg-opacity-50'
          onClick={handleClick}>
            <SignIn 
              signUpForceRedirectUrl='/onboarding'
              fallbackRedirectUrl='/onboarding'
            />
          </div>
        )}
    </>
  )
}

export default Header

