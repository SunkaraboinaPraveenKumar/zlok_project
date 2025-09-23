"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Users, MapPin, Calendar } from "lucide-react";
import { AnimatedText, MagicText } from "@/components/ui/magic-text";
import { GradientButton } from "@/components/ui/gradient-button";
import { FloatingElements } from "@/components/ui/floating-elements";
import { Button } from "@/components/ui/button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const stats = [
    { icon: Users, value: "10K+", label: "Active Members" },
    { icon: MapPin, value: "50+", label: "Locations" },
    { icon: Calendar, value: "1000+", label: "Events Monthly" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"
        style={{ y: backgroundY }}
      />

      {/* Floating elements */}
      <FloatingElements />

      {/* Grid pattern overlay */}
      <div
        className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\\"60\\\" height=\\\"60\\\" viewBox=\\\"0 0 60 60\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"%3E%3Cg fill=\\\"none\\\" fill-rule=\\\"evenodd\\\"%3E%3Cg fill=\\\"%239C92AC\\\" fill-opacity=\\\"0.1\\\"%3E%3Cpath d=\\\"m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30`}
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="pt-32 pb-20 text-center"
            style={{ y: textY }}
          >
            {/* Main heading */}
            <MagicText className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <AnimatedText text="Redefine Your" />
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  <AnimatedText text="Lifestyle" />
                </span>
              </h1>
            </MagicText>

            {/* Subtitle */}
            <MagicText delay={0.3} className="mb-8">
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Premium co-working spaces, co-living experiences, and vibrant
                community events across India's major cities.
              </p>
            </MagicText>

            {/* CTA Buttons */}
            <MagicText delay={0.6} className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <GradientButton className="group">
                  Get Started Today
                  <motion.div
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </GradientButton>

                <Button
                  variant="outline"
                  className="group border-2 border-gray-300 hover:border-blue-500"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:text-blue-500 transition-colors" />
                  Watch Demo
                </Button>
              </div>
            </MagicText>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 group-hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col items-center">
                        <div className="mb-3 p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-gray-600 text-sm font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}