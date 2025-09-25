"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, ArrowRight, Users, MapPin, Calendar, Wifi } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";
import { loadRazorpay, createRazorpayOrder } from "@/lib/razorpay";

export default function PlansPage() {
  const { data: session } = useSession();
  const [isYearly, setIsYearly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const createPayment = useMutation(api.payments.createPayment);

  const plans = [
    {
      id: "explorer",
      name: "Explorer",
      description: "Perfect for occasional users and freelancers",
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      icon: Zap,
      features: [
        "5 day passes per month",
        "Access to common areas",
        "High-speed WiFi",
        "Printing facilities",
        "Community events access",
        "Mobile app access",
        "Basic support",
      ],
      limits: {
        monthlyBookings: 5,
        eventAccess: true,
        priority: "standard",
      },
      popular: false,
      color: "from-gray-500 to-gray-700",
    },
    {
      id: "professional",
      name: "Professional",
      description: "For regular co-workers and small teams",
      monthlyPrice: 7999,
      yearlyPrice: 79990,
      icon: Star,
      features: [
        "Unlimited day passes",
        "Dedicated desk option",
        "Meeting room credits (4/month)",
        "Premium WiFi",
        "All community events",
        "Guest passes (2/month)",
        "Locker facility",
        "Priority support",
        "Co-living trial access",
      ],
      limits: {
        monthlyBookings: 20,
        eventAccess: true,
        priority: "high",
      },
      popular: true,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For teams and businesses",
      monthlyPrice: 15999,
      yearlyPrice: 159990,
      icon: Crown,
      features: [
        "Everything in Professional",
        "Private office space",
        "Unlimited meeting rooms",
        "24/7 access",
        "Dedicated account manager",
        "Custom branding",
        "Priority booking",
        "Complimentary co-living",
        "Team management tools",
        "Advanced analytics",
      ],
      limits: {
        monthlyBookings: -1, // unlimited
        eventAccess: true,
        priority: "premium",
      },
      popular: false,
      color: "from-purple-600 to-pink-600",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Community Access",
      description: "Connect with like-minded professionals across all locations",
    },
    {
      icon: MapPin,
      title: "Multiple Locations",
      description: "Access to 50+ premium locations across major Indian cities",
    },
    {
      icon: Calendar,
      title: "Event Participation",
      description: "Join workshops, networking events, and community gatherings",
    },
    {
      icon: Wifi,
      title: "Premium Amenities",
      description: "High-speed internet, printing, meeting rooms, and more",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSelectPlan = async (planId: string) => {
    if (!session) {
      toast.error("Please sign in to select a plan");
      return;
    }
    
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;
    
    const amount = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
    setIsLoading(true);
    
    try {
      const order = await createRazorpayOrder(amount);
      const isLoaded = await loadRazorpay();
      
      if (!isLoaded) {
        throw new Error("Payment gateway failed to load");
      }
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "ZLOK",
        description: `${plan.name} Plan Subscription`,
        order_id: order.id,
        handler: async (response: any) => {
          toast.success("Subscription activated successfully!");
        },
        prefill: {
          name: session.user?.name || "",
          email: session.user?.email || "",
        },
        theme: {
          color: "#3B82F6",
        },
      };
      
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initiate payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-4">
              Flexible Plans
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible plans designed for every lifestyle. Switch between monthly and yearly billing.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Billing Toggle */}
        <motion.div
          className="flex items-center justify-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Monthly
          </span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
          />
          <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
            Yearly
          </span>
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
            Save 17%
          </Badge>
        </motion.div>

        <Tabs defaultValue="plans" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="space-y-8">
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <Card className={`h-full ${plan.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`inline-flex w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} items-center justify-center mb-4 mx-auto`}>
                        <plan.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="text-center pb-6">
                      <div className="mb-6">
                        <div className="text-4xl font-bold text-gray-900">
                          {formatPrice(isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice)}
                        </div>
                        <div className="text-gray-600">
                          per month {isYearly && "(billed annually)"}
                        </div>
                        {isYearly && (
                          <div className="text-sm text-green-600 font-medium">
                            Save {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice)} per year
                          </div>
                        )}
                      </div>

                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={feature} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <Check className="w-5 h-5 text-green-500" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full group ${plan.popular
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                            : 'bg-gray-900 hover:bg-gray-800'
                          }`}
                        size="lg"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-600 mb-4">
            Need a custom plan for your team?
          </p>
          <Link href={"/contact"}>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}