import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Target,
  Shield,
  Zap,
  Heart,
  Coffee,
} from 'lucide-react';
import { fadeIn, staggerContainer } from '@/lib/animations';

export function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background">
        <motion.div
          className="container text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            variants={fadeIn}
          >
            About Bill Craft
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={fadeIn}
          >
            We're on a mission to revolutionize billing management for businesses
            worldwide.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="space-y-6" variants={fadeIn}>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At Bill Craft, we believe that managing billing shouldn't be a
              headache. Our mission is to provide businesses with powerful,
              intuitive tools that simplify their billing processes and help them
              focus on what truly matters - growing their business.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Target className="h-6 w-6 text-primary" />
                <span>Simplify billing management</span>
              </div>
              <div className="flex items-center gap-4">
                <Shield className="h-6 w-6 text-primary" />
                <span>Ensure secure transactions</span>
              </div>
              <div className="flex items-center gap-4">
                <Zap className="h-6 w-6 text-primary" />
                <span>Boost efficiency</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="aspect-square bg-primary/10 rounded-full flex items-center justify-center"
            variants={fadeIn}
          >
            <Users className="h-32 w-32 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/50 py-20">
        <div className="">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl font-bold"
              variants={fadeIn}
            >
              Our Values
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn}
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <value.icon className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold" variants={fadeIn}>
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={fadeIn}
          >
            The passionate individuals behind Bill Craft
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

const values = [
  {
    icon: Heart,
    title: 'Customer First',
    description:
      'We put our customers at the heart of everything we do.',
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'We ensure the highest level of security for all transactions.',
  },
  {
    icon: Coffee,
    title: 'Innovation',
    description:
      'We continuously innovate to provide the best solutions.',
  },
];

const team = [
  {
    name: 'XYZ',
    role: 'CEO & Founder',
  },
  {
    name: 'XYZ',
    role: 'CTO',
  },
  {
    name: 'XYZ',
    role: 'Head of Product',
  },
];