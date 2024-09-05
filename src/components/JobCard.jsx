// import { useUser } from '@clerk/clerk-react'
// import React from 'react'
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
// import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'
// import { saveJob } from '@/api/apiJobs'
// import { useState, useEffect } from 'react'
// import useFetch from '@/hooks/use-fetch'

// const JobCard = ({
//     job,
//     isMyJob=false,
//     savedInit=false,
//     onJobSaved=()=>{}
// }) => {
//  const[saved, setSaved]=useState(savedInit)
 
    
//  const {
//         loading: loadingSavedJob,
//         data: savedJob,
//         fn: fnSavedJob,
//       } = useFetch(saveJob);

//       const {user}=useUser()
//       const handleSaveJob = async () => {
//         await fnSavedJob({
//           user_id: user.id,
//           job_id: job.id,
//         });
//         onJobSaved();
//       }
    

//     useEffect(()=>{
//         if (savedJob !== undefined) setSaved(savedJob?.length > 0);
//     },[savedJob])
//   return (
//     <Card>
//         <CardHeader>
//             <CardTitle className="flex justify-between font-bold">
//             {job.title}
//             {isMyJob &&(
//                 <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer'/>
//             )}
//             </CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-4 flex-1">
//             <div className='flex justify-between'>
//             {job.company && <img src={job.company.logo_url} className='h-6'/>}
//             <div className='flex gap-2 items-center'>
//             <MapPinIcon size={15}/>{job.location}
//             </div>
//             </div>
//             <hr/>
//             {job.description}
//         </CardContent>
//         <CardFooter className="flex gap-2">
//             <Link to={`/job/${job.id}`}>
//                 <Button variant="secondary" classname="w-full">More Details</Button>
//             </Link>
//             {!isMyJob &&(
//                 <Button variant="outline" classname="w-15" onClick={handleSaveJob} disabled={loadingSavedJob}>
//                   {saved? (
//                     <Heart stroke="red" fill="red" size={20}/>
//                   ): (
//                     <Heart size={20}/>
//                   )}
//                 </Button>
//             )}
            
//         </CardFooter>
//     </Card>
//   )
// }

// export default JobCard

import { useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { saveJob } from '@/api/apiJobs';
import useFetch from '@/hooks/use-fetch';
import { deleteJob } from '@/api/apiJobs';

const JobCard = ({
    job,
    isMyJob = false,
    savedInit = false,
    onJobAction = () => {}
}) => {
    const [saved, setSaved] = useState(savedInit);
    

    const {
        loading: loadingSavedJob,
        data: savedJob,
        error: errorSavingJob, // Capture any error
        fn: fnSavedJob,
    } = useFetch(saveJob, {alreadySaved :saved});

    const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
        job_id: job.id,
      });

    const { user } = useUser(); // Moved this above handleSaveJob to ensure it's defined
    const handleSaveJob = async () => {
        // if (!user || !user.id) {
        //     console.error("User not authenticated or user ID not available.");
        //     return;
        // }
        
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        });
        onJobAction();
    };
    // const handleDeleteJob = async () => {
    //     await fnDeleteJob();
    //     onJobAction();
    //   };
    const handleDeleteJob = async () => {
        console.log('Delete job triggered');
        await fnDeleteJob();
        onJobAction();
    };

    useEffect(() => {
        if (savedJob !== undefined) setSaved(savedJob?.length > 0); // Check what savedJob actually returns
    }, [savedJob]);


    return (
        <Card className="flex flex-col">
         {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
            <CardHeader>
                <CardTitle className="flex justify-between font-bold">
                    {job.title}
                    {isMyJob && (
                        <Trash2Icon fill='red' size={18} className='text-red-300 cursor-pointer' 
                            onClick={handleDeleteJob}
                        />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between'>
                    {job.company && <img src={job.company.logo_url} alt="Company logo" className='h-6' />}
                    <div className='flex gap-2 items-center'>
                        <MapPinIcon size={15} />{job.location}
                    </div>
                </div>
                <hr />
                {job.description}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`}>
                    <Button variant="secondary" className="w-full">More Details</Button>
                </Link>
                {!isMyJob && (
                    <Button variant="outline" className="w-15" onClick={handleSaveJob} disabled={loadingSavedJob}>
                        {saved ? (
                            <Heart stroke="red" fill="red" size={20} />
                        ) : (
                            <Heart size={20} />
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default JobCard;
