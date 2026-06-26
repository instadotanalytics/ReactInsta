import React from "react";
import styles from "./CareerJourney.module.css";
import {
FaUserGraduate,
FaLaptopCode,
FaCertificate,
FaBriefcase
} from "react-icons/fa";

const CareerJourney=()=>{

const steps=[

{
icon:<FaUserGraduate/>,
title:"Enroll",
desc:"Start your learning journey with industry focused programs"
},

{
icon:<FaLaptopCode/>,
title:"Learn Skills",
desc:"Master practical skills with hands-on projects"
},

{
icon:<FaCertificate/>,
title:"Get Certified",
desc:"Earn globally recognized certifications"
},

{
icon:<FaBriefcase/>,
title:"Get Hired",
desc:"Connect with top companies and accelerate your career"
}

]

return(

<section className={styles.section}>

<div className={styles.header}>
<span>CAREER JOURNEY</span>

<h2>
From Learning To
<span> Success</span>
</h2>

<p>
Follow a structured path designed to transform students into industry professionals
</p>

</div>

<div className={styles.timeline}>

<div className={styles.line}></div>

{steps.map((item,index)=>(

<div
key={index}
className={`${styles.cardContainer}
${index%2===0 ? styles.left : styles.right}`}
>

<div className={styles.card}>

<div className={styles.icon}>
{item.icon}
</div>

<h3>{item.title}</h3>

<p>{item.desc}</p>

</div>

</div>

))}

</div>

</section>

)

}

export default CareerJourney
