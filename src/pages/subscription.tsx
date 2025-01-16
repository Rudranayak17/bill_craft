import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Check } from 'lucide-react';
import { fadeIn, staggerContainer } from '@/lib/animations';

export function SubscriptionPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background">
        <motion.div
          className=" text-center space-y-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            variants={fadeIn}
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Select the perfect plan for your business needs
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section className=" justify-center items-center">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card
                className={
                  plan.featured
                    ? 'border-primary shadow-lg relative'
                    : undefined
                }
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">₹0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.featured ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FAQs Section */}
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Find answers to common questions about our plans
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const plans = [
  {
    name: 'Free',
    description: 'Perfect for small businesses just getting started',
    price: 0,
    features: [
      'Up to 10 invoices per month',
      'Basic analytics',
      'Email support',
      'Single user',
    ],
  },
  {
    name: 'Pro',
    description: 'Ideal for growing businesses',
    price: 0,
    featured: true,
    features: [
      'Unlimited invoices',
      'Advanced analytics',
      'Priority support',
      'Up to 5 users',
      'Custom branding',
      'API access',
    ],
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with complex needs',
    price: 0,
    features: [
      'Everything in Pro',
      'Unlimited users',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee',
      'Advanced security',
    ],
  },
];

const faqs = [
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, including Visa, MasterCard, and American Express. We also support payments through PayPal and bank transfers.',
  },
  {
    question: 'Can I change my plan later?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'Is there a long-term contract?',
    answer:
      'No, all our plans are month-to-month. You can cancel at any time without any cancellation fees.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes, we offer a 14-day free trial on our Pro plan. No credit card required.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'We offer email support for all plans. Pro and Enterprise plans include priority support with faster response times.',
  },
];
