"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Users, Wifi, Coffee, Car, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

export default function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const spaces = [
    {
      id: 1,
      name: "ZLOK Mumbai Central",
      address: "Nariman Point, Mumbai",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      rating: 4.8,
      reviews: 124,
      price: 299,
      amenities: ["wifi", "coffee", "parking", "meeting-rooms"],
      tags: ["Hot Desk", "Private Office", "Meeting Room"],
      distance: "2.3 km",
    },
    {
      id: 2,
      name: "ZLOK Bangalore Koramangala",
      address: "Koramangala, Bangalore",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      rating: 4.9,
      reviews: 89,
      price: 249,
      amenities: ["wifi", "coffee", "meeting-rooms"],
      tags: ["Hot Desk", "Dedicated Desk"],
      distance: "1.8 km",
    },
    {
      id: 3,
      name: "ZLOK Delhi Connaught Place",
      address: "Connaught Place, New Delhi",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
      rating: 4.7,
      reviews: 156,
      price: 349,
      amenities: ["wifi", "coffee", "parking", "meeting-rooms", "gym"],
      tags: ["Hot Desk", "Private Office", "Event Space"],
      distance: "3.1 km",
    },
  ];

  const amenityIcons = {
    wifi: Wifi,
    coffee: Coffee,
    parking: Car,
    "meeting-rooms": Users,
  };

  const cities = ["Mumbai", "Bangalore", "Delhi", "Pune", "Hyderabad"];
  const filterOptions = [
    "Hot Desk",
    "Dedicated Desk",
    "Private Office",
    "Meeting Room",
    "Event Space",
    "24/7 Access",
    "Parking",
    "Gym",
  ];

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         space.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = !selectedCity || space.address.includes(selectedCity);
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => space.tags.includes(filter));
    
    return matchesSearch && matchesCity && matchesFilters;
  });

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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Space</h1>
            <p className="text-gray-600">Discover co-working spaces across India's major cities</p>
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
                placeholder="Search spaces, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full md:w-48 h-12">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {selectedFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Spaces</SheetTitle>
                  <SheetDescription>
                    Refine your search with these filters
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {filterOptions.map(option => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={selectedFilters.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFilters([...selectedFilters, option]);
                          } else {
                            setSelectedFilters(selectedFilters.filter(f => f !== option));
                          }
                        }}
                      />
                      <label htmlFor={option} className="text-sm font-medium">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            {filteredSpaces.length} spaces found
          </p>
        </motion.div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">
                      ₹{space.price}/day
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{space.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {space.address}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{space.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({space.reviews})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {space.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2">
                      {space.amenities.slice(0, 4).map(amenity => {
                        const Icon = amenityIcons[amenity as keyof typeof amenityIcons];
                        return Icon ? (
                          <div key={amenity} className="p-2 bg-gray-100 rounded-full">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                        ) : null;
                      })}
                    </div>
                    <span className="text-sm text-gray-500">{space.distance}</span>
                  </div>
                  <Button className="w-full">Book Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}