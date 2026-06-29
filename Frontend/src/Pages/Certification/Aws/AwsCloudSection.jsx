import { useEffect, useRef, useState } from "react";
import styles from "./AwsCloudSection.module.css";

const services = [
  { name: "EC2", x: 50, y: 15 },
  { name: "Lambda", x: 71, y: 23 },
  { name: "IAM", x: 83, y: 43 },
  { name: "VPC", x: 83, y: 65 },
  { name: "CloudFront", x: 71, y: 84 },
  { name: "Route53", x: 50, y: 92 },
  { name: "RDS", x: 29, y: 84 },
  { name: "CloudWatch", x: 17, y: 65 },
  { name: "ECS", x: 17, y: 43 },
  { name: "SNS", x: 29, y: 23 },
  { name: "SQS", x: 38, y: 13 },
  { name: "S3", x: 62, y: 13 },
];

export default function AwsCloudSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      {/* Background */}

      <div className={styles.background}>
        <img
          src="https://pngfre.com/wp-content/uploads/cloud-png-image-from-pngfre-10.png"
          className={`${styles.cloud} ${styles.leftCloud}`}
          alt=""
        />

        <img
          src="https://png.pngtree.com/png-vector/20250118/ourmid/pngtree-white-clouds-on-isolated-transparent-background-png-image_15264537.png"
          className={`${styles.cloud} ${styles.rightCloud}`}
          alt=""
        />

        <img
          src="https://png.pngtree.com/png-clipart/20250205/original/pngtree-realistic-cloud-on-transparent-isolated-background-png-image_20311834.png"
          className={`${styles.cloud} ${styles.bottomCloud}`}
          alt=""
        />
      </div>

      {/* Glass Card */}

      <div className={styles.card}>
        <div className={styles.header}>
          <span className={styles.badge}>Architecture Overview</span>

          <h2>
            Inside the
            <span>AWS Cloud</span>
          </h2>

          <p>
            Discover how modern cloud applications connect compute, networking,
            storage, security and serverless services into one intelligent cloud
            ecosystem designed for reliability, scalability and innovation.
          </p>
        </div>

        <div className={styles.diagram}>
          {/* Center */}

          <div className={styles.center}>
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.ZFvlTCPiwwImMgpxitHiogHaD5?cb=thfc1falcon3&w=1024&h=538&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt=""
              className={styles.centerImage}
            />

            {/* <div className={styles.centerText}>
              <h3>AWS</h3>

              <span>CLOUD</span>
            </div> */}
          </div>

          {/* Connection Lines */}

          <svg
            className={styles.lines}
            viewBox="0 0 1000 700"
            preserveAspectRatio="none"
          >
            {services.map((service, index) => {
              const x = service.x * 10;
              const y = service.y * 7;

              return <line key={index} x1="500" y1="350" x2={x} y2={y} />;
            })}
          </svg>

          {/* Nodes */}

          {services.map((service, index) => (
            <div
              key={index}
              className={styles.node}
              style={{
                left: `${service.x}%`,
                top: `${service.y}%`,
              }}
            >
              <div className={styles.nodeCircle}>
                <img
                  src="https://cdn.icon-icons.com/icons2/2407/PNG/512/aws_icon_146237.png"
                  alt={service.name}
                  className={styles.icon}
                />
              </div>

              <span>{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
