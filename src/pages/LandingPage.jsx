import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import companies from "../data/companies.json"
import { Card,CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '@/components/ui/accordion'
import faqs from '../data/faq.json'
const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col justify-center items-center gradient-title text-4xl font-extrabold
        sm:text-6xl lg:text-8xl'>Find your Dream job {""}
        <span className='flex items-center gap-2 sm:gap-6'>and get {""}
        <img className="h-14 sm:h-24 lg:h-32"src="/logo.png"/></span></h1>
        <p className='text-gray-300 sm:mt-4 text-xs sm:text-xl'>Explore thousands of job listings or find the best candidate</p>
      </section>
      <div className='flex justify-center gap-6'>
        {/*button*/}
        <Link to="/jobs">
        <Button variant="blue" size="xl">Find Jobs</Button>
        </Link>
        <Link to="/post-job">
        <Button variant="destructive" size="xl">Post a Job</Button>
        </Link>
      </div>
       {/*carousel*/}
       <Carousel
       plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    
      {/*banner*/}
      <img src="/banner.jpeg"/>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {/*cards*/} 
       <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      {/*accordian*/} 
      <Accordion type="multiple" className="w-auto">
      {faqs.map((faq,index)=>{
        return(
          <AccordionItem key={index} value={`item-${index + 1}`}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
        )
      })}
    </Accordion>
    </main>
  )
}

export default LandingPage