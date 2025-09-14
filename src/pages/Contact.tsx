import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent Successfully",
      description: "Thank you for your inquiry. We'll get back to you soon!",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['info@sahayagrid.gov.in','support@sahayagrid.gov.in'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91-674-2301234', '+91-674-2301235'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'SAHAYA GRID Project Team',
        'Electronics & IT Department',
        'Bhubaneswar, Odisha 751001'
      ],
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Get in touch with our team for support, inquiries, or collaboration opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Contact information for the SAHAYA GRID project team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="p-2 rounded-lg gradient-primary flex-shrink-0">
                      <info.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Support</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technical Support:</span>
                    <span className="font-medium">24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emergency Contact:</span>
                    <span className="font-medium">+91-9876543210</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        required 
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        required 
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      required 
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      required 
                      placeholder="Inquiry about SAHAYA GRID system"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      required 
                      placeholder="Please describe your inquiry or feedback..."
                      className="min-h-32"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      type="submit" 
                      className="flex-1" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <Button 
                      type="reset" 
                      variant="outline"
                      className="flex-1"
                    >
                      Clear Form
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    * Required fields. Your information will be handled according to our privacy policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        


      </div>
    </div>
  );
};

export default Contact;