import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  FileText,
  CreditCard,
  TrendingUp,
  Users,
  Star,
} from 'lucide-react';
import { fadeIn, staggerContainer } from '@/lib/animations';

export function HomePage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background text-center">
        <motion.div
          className="max-w-4xl space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            variants={fadeIn}
          >
            Simplify Your Billing,
            <br />
            <span className="text-primary">Boost Your Efficiency</span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Transform your billing process with our comprehensive solution.
            Streamline operations and focus on what matters most - your business.
          </motion.p>
          <motion.div className="flex gap-4 justify-center" variants={fadeIn}>
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={ref} className="container mx-auto text-center">
        <motion.div
          className="space-y-4 mb-16"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-3xl font-bold"
            variants={fadeIn}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Everything you need to manage your billing process efficiently
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="h-full">
                <CardContent className="pt-6 space-y-4 text-center">
                  <feature.icon className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-20 text-center">
        <div className="container mx-auto">
          <motion.div
            className="space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-3xl font-bold"
              variants={fadeIn}
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Don't just take our word for it
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full">
                  <CardContent className="pt-6 space-y-4 text-center">
                    <div className="flex gap-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4 justify-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}


const features = [
  {
    icon: FileText,
    title: 'Invoice Creation',
    description:
      'Create professional invoices in seconds with our intuitive interface.',
  },
  {
    icon: CreditCard,
    title: 'Payment Processing',
    description:
      'Accept payments securely through multiple payment gateways.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Get insights into your business with detailed analytics and reports.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Tracking',
    description:
      'Track your revenue and growth with comprehensive analytics.',
  },
  {
    icon: Users,
    title: 'Client Management',
    description:
      'Manage your clients and their billing information efficiently.',
  },
  {
    icon: Star,
    title: 'Premium Support',
    description:
      '24/7 support to help you with any questions or issues.',
  },
];

const testimonials = [
  {
    content:
      'Bill Craft has transformed how we handle our billing. The automation features save us hours every week.',
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
  },
  {
    content:
      'The analytics dashboard gives us invaluable insights into our cash flow and business performance.',
    name: 'Michael Chen',
    role: 'CFO at GrowthCo',
  },
  {
    content:
      "Customer support is exceptional. They're always there when we need help or have questions.",
    name: 'Emily Rodriguez',
    role: 'Operations Manager',
  },
];