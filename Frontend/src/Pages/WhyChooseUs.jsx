import React from "react";
import BackgroundCanvas from "./BackgroundCanvas";
import styles from "./WhyChooseUs.module.css";

import studentImg from "../../public/anshupop.png"; // put your png here

const WhyChooseUs = () => {
    return (
        <section className={styles.section}>
            <BackgroundCanvas />

            <div className={styles.container}>

                {/* Left Content */}
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Empowering Students <br />
                        <span>to Achieve More</span>
                    </h1>

                    <p className={styles.description}>
                        We provide comprehensive learning resources,
                        expert guidance, and a supportive community
                        to help students excel in their academic journey
                        and beyond.
                    </p>
                </div>

                {/* Right Image */}
                <div className={styles.imageContainer}>
                    <img
                        src={studentImg}
                        alt="students"
                        className={styles.image}
                    />
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;