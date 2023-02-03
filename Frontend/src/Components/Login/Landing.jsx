import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Landing.module.css'

export default function Landing() {
  return (
    <div className={`${classes.comp}`}>
        <p className={`${classes.head} text-center pt-3`}>Alpha Hospital</p>
        <div className={`${classes.landback} `}>
        <div className={`pt-[9%]`}>
            <p className={`${classes.para} mx-auto p-[3%]`}>As a hospital, we want to provide the best service possible for our patients. We want to make sure that they are comfortable and safe at all times. We also want them to be satisfied with the care they receive during their stay in our hospital. <br/>
            Therefore, we have implemented several measures that would ensure that our guests are having a better experience with us and we can improve on this in the future.
            </p>
        </div>
        </div>
        <div className={`flex justify-around py-[2.75%] ${classes.foot}`}>
            <div>
                Address: 123, Jaynagar, 4th block <br/>
                Phone: (123) 456-7890 <br/>
                Mail: 123@email.com <br/>
            </div>
            <div>
                <Link className={`underline`} to={'/login'}><span style={{fontSize:"25px"}}>Login</span></Link>
                <br/>
                <Link className={`underline mt-1`} to={'/signup'}><span style={{fontSize:"25px"}}>Signup</span></Link>
            </div>
        </div>
    </div>
  )
}