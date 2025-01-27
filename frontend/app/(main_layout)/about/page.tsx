"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { motion } from "framer-motion";
import { CloudLightning, Lightbulb, Sparkles, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Container from "@/components/shared/Container";

const fadeInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const FeatureCard = ({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: React.ElementType;
  description: string;
}) => (
  <Card>
    <CardBody className="p-6 flex flex-col items-center text-center">
      <Icon className="w-8 h-8 text-blue-600 mb-2" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </CardBody>
  </Card>
);

const features = [
  {
    title: "Expert Advice",
    icon: Lightbulb,
    description: "Insights from industry professionals.",
  },
  {
    title: "Community-Driven",
    icon: Users,
    description: "Learn and collaborate with fellow engineers.",
  },
  {
    title: "Latest Tech News",
    icon: CloudLightning,
    description: "Stay updated with cutting-edge technology.",
  },
  {
    title: "Product Reviews",
    icon: Sparkles,
    description: "Make informed decisions on engineering tools.",
  },
];

export default function AboutUs() {
  const [scrollY, setScrollY] = useState(0);
  const [featuresInView, setFeaturesInView] = useState(false);

  const router = useRouter();

  const handlePushSignin = () => {
    router.push("/signin");
  };

  // Intersection Observer for the "What We Offer" section
  const { ref, inView } = useInView({
    threshold: 0.2, // Trigger animation when 20% of the section is visible
    triggerOnce: true, // Only trigger once
  });

  useEffect(() => {
    if (inView) {
      setFeaturesInView(true);
    }
  }, [inView]);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants for motion text
  const textVariants = {
    initial: { opacity: 0, x: -50, scale: 1 },
    animate: (scrollY: number) => ({
      opacity: 1,
      x: scrollY > 300 ? (scrollY % 2 === 0 ? 150 : -150) : 0,
      scale: scrollY > 300 ? 1.1 : 1,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <Container>
      <motion.div
        animate="animate"
        className="container mx-auto py-8"
        initial="initial"
        variants={{
          animate: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Top Section with Scroll Animation */}
        <motion.div
          animate="animate"
          className="text-center mb-12"
          custom={scrollY}
          initial="initial"
          variants={textVariants}
        >
          <h1 className="text-5xl font-bold mb-4">EngineersIQ</h1>
          <h2 className="text-2xl">Transforming Ideas into Code, Together.</h2>
        </motion.div>

        <motion.div className="mb-12" custom={scrollY} variants={textVariants}>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <div className="space-y-4">
            <p>
              At EngineersIQ, we believe in the transformative power of software
              engineering to shape the future. Our mission is to create an
              inclusive, knowledge-rich platform that empowers software
              engineers of all experience levels to thrive in an ever-evolving
              digital landscape. We are committed to bridging the gap between
              emerging technologies and real-world application, offering our
              community the tools, resources, and collaborative spaces they need
              to excel.
            </p>
            <p>
              Through expert-led content, up-to-date industry insights, and
              peer-to-peer learning, we aim to foster a culture of continuous
              growth, innovation, and collaboration. Whether you&apos;re just
              starting your coding journey or are a seasoned professional
              looking to stay on top of the latest trends, EngineersIQ is here
              to provide the guidance, support, and connections you need to
              succeed.
            </p>
            <p>
              We envision a future where every software engineer has the
              knowledge, confidence, and resources to solve complex problems,
              build groundbreaking software, and contribute meaningfully to the
              tech industry. By focusing on practical, hands-on learning and
              community-driven growth, we seek to cultivate the next generation
              of software leaders and innovators.
            </p>
          </div>
        </motion.div>

        <motion.div className="mb-12 overflow-x-hidden" variants={fadeInRight}>
          <h2 className="text-3xl font-semibold mb-4">Our Community</h2>
          <p className="mb-4">
            EngineersIQ is more than just a platform; it&apos;s a thriving
            community of engineers, professionals, and curious learners. Our
            diverse user base contributes to a rich ecosystem of knowledge,
            where everyone has something to learn and something to teach.
          </p>
          <p>
            Whether you&apos;re troubleshooting a complex engineering problem,
            exploring new tools, or diving into the world of coding, you&apos;ll
            find a supportive community ready to help and collaborate.
          </p>
        </motion.div>

        <motion.div
          ref={ref} // Attach ref to track visibility
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
                exit={{ opacity: 0, x: 50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{
                  duration: 0.3,
                  delay: (index + 1) * 0.2,
                }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="text-center" variants={fadeInRight}>
          <h2 className="text-3xl font-semibold mb-4">
            Join Our Engineering Community
          </h2>
          <p className="mb-8">
            Ready to enhance your engineering knowledge and connect with
            like-minded enthusiasts?
          </p>
          <Button
            className="font-semibold"
            color="primary"
            size="lg"
            onPress={handlePushSignin}
          >
            Sign Up Now
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}
