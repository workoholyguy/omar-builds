"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Github, Linkedin, Send, ArrowUpRight } from "lucide-react";
import { Container, Section, Button } from "@/components/ui";

const socialLinks = [
  {
    name: "Email",
    href: "mailto:omadjitov1@icloud.com",
    icon: Mail,
    description: "omadjitov1@icloud.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/workoholyguy",
    icon: Github,
    description: "@workoholyguy",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/omar-madjitov/",
    icon: Linkedin,
    description: "/in/omar-madjitov",
  },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    if (!pageRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".contact-label",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        ".contact-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".contact-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        ".contact-link",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        ".contact-form",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setFormState({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // In production, you would send this to an API
    alert("Message sent! (This is a demo - no actual email was sent)");
  };

  return (
    <div ref={pageRef}>
      <Section className="pt-8">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="contact-label text-accent font-mono text-sm mb-2">
                Get in Touch
              </p>
              <h1 className="contact-title text-4xl md:text-5xl font-bold text-foreground mb-4">
                Let&apos;s work together
              </h1>
              <p className="contact-description text-lg text-neutral-400 max-w-xl mx-auto">
                Have a project in mind or just want to chat? I&apos;d love to hear
                from you. Drop me a message and I&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Links */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Connect with me
                </h2>
                <div className="space-y-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link group flex items-center gap-4 p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-colors"
                    >
                      <div className="p-3 rounded-lg bg-neutral-800 group-hover:bg-accent/10 transition-colors">
                        <link.icon className="h-5 w-5 text-neutral-400 group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {link.name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {link.description}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-600 group-hover:text-accent transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Send a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      required
                      className="w-full h-12 px-4 bg-neutral-900 border border-neutral-800 rounded-lg text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="w-full h-12 px-4 bg-neutral-900 border border-neutral-800 rounded-lg text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-neutral-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
