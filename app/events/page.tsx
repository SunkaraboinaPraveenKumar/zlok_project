"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const events = [
    {
      id: 1,
      title: "Startup Networking Mixer",
      description: "Connect with fellow entrepreneurs and investors in Mumbai's startup ecosystem.",
      date: "2024-01-20",
      time: "18:00",
      location: "ZLOK Mumbai Central",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
      category: "Networking",
      price: 0,
      capacity: 100,
      registered: 67,
      tags: ["Startup", "Networking", "Free"],
    },
    {
      id: 2,
      title: "Tech Talk: AI in Business",
      description: "Learn how artificial intelligence is transforming modern business operations.",
      date: "2024-01-25",
      time: "19:00",
      location: "ZLOK Bangalore Koramangala",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      category: "Workshop",
      price: 499,
      capacity: 50,
      registered: 32,
      tags: ["AI", "Technology", "Business"],
    },
    {
      id: 3,
      title: "Design Thinking Workshop",
      description: "Master the art of design thinking with hands-on exercises and real case studies.",
      date: "2024-01-28",
      time: "10:00",
      location: "ZLOK Delhi CP",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      category: "Workshop",
      price: 799,
      capacity: 30,
      registered: 18,
      tags: ["Design", "Workshop", "Creative"],
    },
    {
      id: 4,
      title: "Friday Night Social",
      description: "Unwind with the ZLOK community over drinks and games.",
      date: "2024-02-02",
      time: "20:00",
      location: "ZLOK Mumbai BKC",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
      category: "Social",
      price: 299,
      capacity: 80,
      registered: 45,
      tags: ["Social", "Drinks", "Games"],
    },
  ];

  const categories = ["All", "Networking", "Workshop", "Social", "Conference"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  const EventCard = ({ event, isPast = false }: { event: any, isPast?: boolean }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant={event.price === 0 ? "secondary" : "default"}>
            {event.price === 0 ? "Free" : `₹${event.price}`}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white">
            {event.category}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-lg">{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            {event.registered}/{event.capacity} registered
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Button 
          className="w-full" 
          disabled={isPast || event.registered >= event.capacity}
        >
          {isPast ? "Event Ended" : event.registered >= event.capacity ? "Sold Out" : "Register Now"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Events</h1>
            <p className="text-gray-600">Join workshops, networking sessions, and social gatherings</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Events Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="upcoming" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">
                Upcoming Events ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past Events ({pastEvents.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No upcoming events found.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <EventCard event={event} isPast />
                  </motion.div>
                ))}
              </div>
              {pastEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No past events found.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}