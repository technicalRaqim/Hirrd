import React, {useState, useEffect} from 'react'
import { useUser } from '@clerk/clerk-react';
import useFetch from '@/hooks/use-fetch';
import { getJobs } from '@/api/apiJobs';
import { getCompanies } from '@/api/apiCompanies';
import { BarLoader } from 'react-spinners';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectValue, Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { State } from 'country-state-city';
const MyListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSubmit=(e)=>{
e.preventDefault()
const formData=new FormData(e.target)
const query=formData.get("search-query")
if(query) setSearchQuery(query)
  }

  const clearFilters=()=>{
    setSearchQuery("")
      setCompany_id("")
      setLocation("")
    
  }

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
       <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      <form onSubmit={handleSubmit} className='h-14 flex w-full items-center mb-3 gap-2'>
        <Input type="text" placeholder="Search job by Title..." name="search-query" 
        className="h-full flex-1 px-4 text-md"/>
        <Button type="submit" variant="blue" className="h-full sm:w-28">Search</Button>
      </form>
     
      <div className='flex flex-col  sm:flex-row gap-2'>
      <Select value={location} onValueChange={(value)=>setLocation(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Filter by Location" />
  </SelectTrigger>
  <SelectContent>
  <SelectGroup>
  {State.getStatesOfCountry("IN").map(({name})=>{
    return (
      <SelectItem value={name} key={name}>{name}</SelectItem>
    )
  })}
  
  </SelectGroup>
   
   
  </SelectContent>
</Select>

<Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Filter by Company" />
  </SelectTrigger>
  <SelectContent>
  <SelectGroup>
  {companies?.map(({name, id})=>{
    return (
      <SelectItem value={id} key={name}>{name}</SelectItem>
    )
  })}
  
  </SelectGroup>
   
   
  </SelectContent>
</Select>
<Button onClick={clearFilters} variant="destructive" className="sm:w-1/2">Clear Filters</Button>
      </div>
      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  )
}

export default MyListing