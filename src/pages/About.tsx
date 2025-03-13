
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About Us</h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Welcome to MasterAbhiPDF, your complete solution for all PDF-related tasks.
              Our mission is to provide easy-to-use, high-quality tools that make working 
              with PDFs simple and efficient.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p className="mb-4">
              Founded with a vision to simplify document management, MasterAbhiPDF has grown 
              to become a trusted tool for professionals and individuals worldwide.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Meet the Founder</h2>
            <div className="bg-muted p-6 rounded-lg mb-8">
              <h3 className="text-xl font-medium mb-2">Abhishek Kumar</h3>
              <p className="text-muted-foreground mb-2">Founder & CEO</p>
              <p className="mb-4">
                With a passion for creating useful digital tools, Abhishek developed MasterAbhiPDF 
                to address common challenges faced when working with PDF documents.
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Chandi, Nalanda, Bihar, 803108</p>
                <p>Email: a0krsharma@gmail.com</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
            <ul className="space-y-2 mb-6">
              <li>
                <strong>Simplicity:</strong> We believe in creating tools that are intuitive and easy to use.
              </li>
              <li>
                <strong>Quality:</strong> We're committed to providing high-quality results with every tool.
              </li>
              <li>
                <strong>Accessibility:</strong> Our tools are designed to be accessible to everyone, regardless of technical expertise.
              </li>
              <li>
                <strong>Privacy:</strong> We respect your privacy and ensure your documents are processed securely.
              </li>
            </ul>
            
            <p className="text-lg mt-8">
              Thank you for choosing MasterAbhiPDF for your document needs. We're constantly working to improve 
              our tools and would love to hear your feedback!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
