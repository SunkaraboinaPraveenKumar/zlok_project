"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building, TrendingUp, Users, DollarSign, Upload, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function PartnerPage() {
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    address: "",
    city: "",
    contactName: "",
    email: "",
    phone: "",
    description: "",
    amenities: [] as string[],
    images: [] as string[],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const propertyTypes = [
    "Office Building",
    "Co-working Space",
    "Residential Complex",
    "Commercial Complex",
    "Standalone Building",
  ];

  const amenitiesList = [
    "High-speed WiFi",
    "Meeting Rooms",
    "Parking",
    "Cafeteria",
    "Gym/Fitness Center",
    "24/7 Security",
    "Air Conditioning",
    "Power Backup",
    "Reception/Concierge",
    "Printing Facilities",
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Guaranteed Revenue",
      description: "Earn up to 70% revenue share from bookings",
    },
    {
      icon: Users,
      title: "Increased Occupancy",
      description: "Access to our network of 10,000+ members",
    },
    {
      icon: TrendingUp,
      title: "Professional Management",
      description: "We handle operations, you focus on growth",
    },
    {
      icon: Building,
      title: "Brand Enhancement",
      description: "Leverage ZLOK's premium brand reputation",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = () => {
    toast.success("Partnership application submitted! We'll contact you within 48 hours.");
    // Reset form or redirect
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Partner with ZLOK
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Transform your property into a premium co-working destination and earn guaranteed revenue
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Partnership Journey
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with ZLOK?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join India's fastest-growing co-working network and unlock your property's potential
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Partnership Application</CardTitle>
              <CardDescription>
                Tell us about your property and let's explore the partnership opportunity
              </CardDescription>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
                <Progress value={(currentStep / totalSteps) * 100} />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={currentStep.toString()} className="space-y-6">
                {/* Step 1: Basic Information */}
                <TabsContent value="1" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="propertyName">Property Name *</Label>
                      <Input
                        id="propertyName"
                        value={formData.propertyName}
                        onChange={(e) => handleInputChange("propertyName", e.target.value)}
                        placeholder="Enter property name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {propertyTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select value={formData.city} onValueChange={(value) => handleInputChange("city", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mumbai">Mumbai</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="bangalore">Bangalore</SelectItem>
                          <SelectItem value="pune">Pune</SelectItem>
                          <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter complete address"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Step 2: Contact Information */}
                <TabsContent value="2" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Person Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Enter contact person name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Property Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your property, its unique features, and why it would be perfect for ZLOK partnership"
                      rows={4}
                    />
                  </div>
                </TabsContent>

                {/* Step 3: Amenities */}
                <TabsContent value="3" className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Available Amenities</Label>
                    <p className="text-sm text-gray-600 mb-4">Select all amenities available at your property</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {amenitiesList.map(amenity => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityToggle(amenity)}
                          />
                          <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Step 4: Review & Submit */}
                <TabsContent value="4" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Review Your Application</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Property Name</Label>
                          <p>{formData.propertyName || "Not provided"}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Property Type</Label>
                          <p>{formData.propertyType || "Not provided"}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">City</Label>
                          <p>{formData.city || "Not provided"}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Contact Person</Label>
                          <p>{formData.contactName || "Not provided"}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Selected Amenities</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.amenities.map(amenity => (
                            <Badge key={amenity} variant="secondary">{amenity}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}