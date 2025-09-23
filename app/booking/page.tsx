"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSpace, setSelectedSpace] = useState("");
  const [duration, setDuration] = useState("4");
  const router = useRouter();

  // Mock data - in real app, this would come from props or API
  const hub = {
    id: 1,
    name: "ZLOK Mumbai Central",
    address: "Nariman Point, Mumbai",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    spaces: [
      { id: "hot-desk-1", name: "Hot Desk", price: 299, capacity: 1 },
      { id: "dedicated-desk-1", name: "Dedicated Desk", price: 499, capacity: 1 },
      { id: "meeting-room-a", name: "Meeting Room A", price: 799, capacity: 6 },
      { id: "private-office-1", name: "Private Office", price: 1299, capacity: 4 },
    ],
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const selectedSpaceDetails = hub.spaces.find(space => space.id === selectedSpace);
  const totalPrice = selectedSpaceDetails ? selectedSpaceDetails.price * parseInt(duration) : 0;

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedSpace) {
      toast.error("Please fill in all booking details");
      return;
    }

    // Here you would integrate with Razorpay
    toast.success("Booking confirmed! Redirecting to payment...");
    // Simulate payment flow
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Your Space</h1>
              <p className="text-gray-600">Reserve your workspace at {hub.name}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hub Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={hub.image}
                        alt={hub.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{hub.name}</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hub.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Space Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Select Space Type</CardTitle>
                  <CardDescription>Choose the workspace that fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hub.spaces.map((space) => (
                      <div
                        key={space.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedSpace === space.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedSpace(space.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{space.name}</h4>
                          <Badge variant="secondary">₹{space.price}/hr</Badge>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          Up to {space.capacity} people
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Date & Time Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Select Date & Time</CardTitle>
                  <CardDescription>Choose when you'd like to use the space</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Date</h4>
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-3">Start Time</h4>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">Duration (hours)</h4>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="2">2 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="8">8 hours (Full day)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky top-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedSpaceDetails && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Space</span>
                        <span className="font-medium">{selectedSpaceDetails.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rate</span>
                        <span className="font-medium">₹{selectedSpaceDetails.price}/hr</span>
                      </div>
                    </>
                  )}
                  
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">
                        {selectedDate.toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  )}
                  
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{duration} hours</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full mt-6"
                    disabled={!selectedDate || !selectedTime || !selectedSpace}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Payment
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Secure payment powered by Razorpay
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}