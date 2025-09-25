"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Users,
  MapPin,
  Calendar,
  Building2,
  Zap,
  Shield,
  Phone,
} from "lucide-react";
import { AnimatedText, MagicText } from "@/components/ui/magic-text";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Active Members",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: MapPin,
      value: "50+",
      label: "Prime Locations",
      color: "from-slate-600 to-slate-700",
    },
    {
      icon: Calendar,
      value: "1000+",
      label: "Monthly Events",
      color: "from-indigo-600 to-indigo-700",
    },
  ];

  const features = [
    {
      icon: Building2,
      title: "Premium Spaces",
      desc: "Modern co-working environments",
    },
    {
      icon: Zap,
      title: "High-Speed Connectivity",
      desc: "Enterprise-grade infrastructure",
    },
    { icon: Shield, title: "24/7 Security", desc: "Safe and secure facilities" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* Professional background with subtle gradients */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Main background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        {/* Floating animated elements */}
        <FloatingElements
          // @ts-ignore
          elements={[
            {
              icon: Zap,
              size: 40,
              color: "text-blue-400/60",
              x: "10%",
              y: "20%",
              speed: 0.5,
            },
            {
              icon: Users,
              size: 36,
              color: "text-indigo-400/60",
              x: "80%",
              y: "30%",
              speed: 0.6,
            },
            {
              icon: Shield,
              size: 44,
              color: "text-slate-400/60",
              x: "50%",
              y: "70%",
              speed: 0.4,
            },
          ]}
        />

        {/* Floating animated elements */}
        <FloatingElements
          // @ts-ignore
          elements={[
            {
              icon: Zap,
              size: 40,
              color: "text-blue-400/60",
              x: "10%",
              y: "20%",
              speed: 0.5,
            },
            {
              icon: Users,
              size: 36,
              color: "text-indigo-400/60",
              x: "80%",
              y: "30%",
              speed: 0.6,
            },
            {
              icon: Shield,
              size: 44,
              color: "text-slate-400/60",
              x: "50%",
              y: "70%",
              speed: 0.4,
            },
          ]}
        />

        {/* Floating animated elements */}
        <FloatingElements
          // @ts-ignore
          elements={[
            {
              icon: Zap,
              size: 40,
              color: "text-blue-400/60",
              x: "10%",
              y: "20%",
              speed: 0.5,
            },
            {
              icon: Users,
              size: 36,
              color: "text-indigo-400/60",
              x: "80%",
              y: "30%",
              speed: 0.6,
            },
            {
              icon: Shield,
              size: 44,
              color: "text-slate-400/60",
              x: "50%",
              y: "70%",
              speed: 0.4,
            },
          ]}
        />

        {/* Floating animated elements */}
        <FloatingElements
          // @ts-ignore
          elements={[
            {
              icon: Zap,
              size: 40,
              color: "text-blue-400/60",
              x: "10%",
              y: "20%",
              speed: 0.5,
            },
            {
              icon: Users,
              size: 36,
              color: "text-indigo-400/60",
              x: "80%",
              y: "30%",
              speed: 0.6,
            },
            {
              icon: Shield,
              size: 44,
              color: "text-slate-400/60",
              x: "50%",
              y: "70%",
              speed: 0.4,
            },
          ]}
        />
        {/* Geometric shapes for professional look */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-blue-50/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-gradient-to-tr from-slate-50/30 to-transparent" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </motion.div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="pt-24 pb-16" style={{ y: textY }}>
            {/* Professional badge */}
            <MagicText className="mb-8 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium"
              >
                <Zap className="w-4 h-4 mr-2" />
                Hyderabad's Leading Workspace Solutions
              </motion.div>
            </MagicText>

            {/* Main heading */}
            <div className="text-center mb-8">
              <MagicText>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
                  <AnimatedText text="Elevate Your" />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
                    <AnimatedText text="Work Experience" />
                  </span>

                </h1>
              </MagicText>

              {/* Professional subtitle */}
              <MagicText delay={0.3}>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
                  Transform your productivity with premium co-working spaces,
                  integrated co-living solutions, and professional networking
                  opportunities across India's business hubs.
                </p>
              </MagicText>
            </div>

            {/* CTA */}
            <MagicText delay={0.6} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group" onClick={()=>router.push("/dashboard")}>
                  Start Your Journey
                  <motion.div
                    className="inline-block ml-2"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Button>

                <Button
                  variant="outline"
                  className="group border-2 border-slate-300 hover:border-blue-500 px-8 py-3 rounded-lg font-semibold bg-white/80 backdrop-blur-sm"
                  onClick={()=>router.push("/contact")}
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:text-blue-500 transition-colors" />
                  Contact Us
                </Button>
              </div>
            </MagicText>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="group"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-md border border-slate-100 group-hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                      <div className="flex flex-col items-center">
                        <div
                          className={`mb-4 p-3 bg-gradient-to-r ${stat.color} rounded-xl text-white group-hover:scale-110 transition-transform shadow-lg`}
                        >
                          <Icon className="w-7 h-7" />
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-2">
                          {stat.value}
                        </div>
                        <div className="text-slate-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Features */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      className="flex items-center p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-slate-100 hover:shadow-md transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                    >
                      <div className="mr-4 p-2 bg-slate-100 rounded-lg">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </div>
  );
}
