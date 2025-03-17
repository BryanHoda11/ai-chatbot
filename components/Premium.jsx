import React from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

const Premium = () => {
    const Plans = [
        {
            plan: 'BASIC PLAN',
            price: '$20',
        },
        {
            plan: 'PRO PLAN',
            price: '$30',
        },
        {
            plan: 'PREMIUM PLAN',
            price: '$40',
        },
    ]
    return (
        <>
        <div className="back max-md:block hidden">
            <Link to='/' className='flex items-center gap-2 mx-4 cursor-pointer text-black dark:text-white'> <FaArrowLeftLong /> Back </Link>
        </div>
            <h2 className='text-black dark:text-white text-2xl sm:text-3xl text-center py-7 font-semibold'>Explore our Premium Plans!</h2>

            <div className="plan-cards flex justify-center flex-wrap gap-7 my-8 w-[85%] mx-auto">
                {Plans.map((p) => (
                    <div className="card px-4 py-4 text-black dark:text-white bg-gray-200 dark:bg-[#1f1e1e] min-w-[300px] h-auto">
                        <h3 className='text-lg flex items-center w-full justify-between font-semibold'>{p.plan}
                            {p.plan === 'PRO PLAN' ? (<div className="recommended flex items-center gap-1 text-xs">Recommended <FaThumbsUp className='dark:text-white' size={15}/></div>) : ""}
                        </h3>

                        <div className='text-4xl flex items-baseline gap-3 text-black dark:text-white font-bold py-5'>{p.price} <span className='font-normal text-lg'>/ month</span> </div>

                        <ul className='flex flex-col gap-2 py-5'>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' /> Unlimited Storage</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' /> Generate Images</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' /> Share screenshots</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' /> API Access</li>
                            <li className='flex items-center gap-2'><FaCheck className='text-green-500' /> Access to Chatbot +</li>
                        </ul>

                        <button className='w-fit px-5 text-sm py-2 border border-neutral-800 dark:border-none rounded-lg dark:bg-[#2b2b2b] cursor-pointer mt-5 dark:text-white text-center'>PURCHASE</button>
                    </div>
                ))}
            </div>

            <p className='text-center font-semibold dark:text-white text-sm my-7'>Purchase the best suited plan for you to avail the best benefits of our <span className='text-gray-800 dark:text-gray-200 opacity-70 hover:underline cursor-pointer'>Chatbot +</span></p>
        </>
    )
}

export default Premium
