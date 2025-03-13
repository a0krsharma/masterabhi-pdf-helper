
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Abhishek Kumar</p>
                <p>Chandi, Nalanda</p>
                <p>Bihar, 803108</p>
                <p>India</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>a0krsharma@gmail.com</p>
                <p className="mt-2 text-muted-foreground">
                  We'll respond as soon as possible
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Available upon request</p>
                <p className="mt-2 text-muted-foreground">
                  Mon-Fri from 9am to 6pm
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  className="resize-none"
                />
              </div>
              <div className="md:col-span-2">
                <Button size="lg" className="mt-2">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
