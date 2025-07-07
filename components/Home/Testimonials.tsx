import React from 'react'
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-20 md:py-32 flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by people across world</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Don&apos;t just take our word for it. See what our customers have to say about their experience.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "SafeBites gives me peace of mind when eating out with my peanut allergy. I can quickly check ingredients and feel confident about my choices.",
                  author: "Priya Sharma",
                  role: "Student, Allergy Advocate",
                  rating: 5,
                },
                {
                  quote: "As a parent of a child with multiple food allergies, SafeBites has been a lifesaver. The alternative suggestions are so helpful!",
                  author: "Mark Evans",
                  role: "Parent & Food Allergy Awareness Volunteer",
                  rating: 5,
                },
                {
                  quote: "I love how easy it is to scan ingredient lists and get instant feedback. SafeBites makes grocery shopping stress-free.",
                  author: "Emily Chen",
                  role: "Food Allergy Blogger",
                  rating: 5,
                },
                {
                  quote: "SafeBites helped me discover hidden allergens in foods I thought were safe. It's an essential tool for anyone with dietary restrictions.",
                  author: "David Kim",
                  role: "Software Engineer, Allergy Sufferer",
                  rating: 5,
                },
                {
                  quote: "The app's recommendations for safe alternatives have expanded my meal options. I feel empowered to try new foods again!",
                  author: "Lisa Patel",
                  role: "Teacher, Living with Celiac Disease",
                  rating: 5,
                },
                {
                  quote: "SafeBites is intuitive and reliable. I recommend it to all my friends with allergies. Thank you for making eating out less stressful!",
                  author: "James Wilson",
                  role: "College Student, Nut Allergy",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex mb-4">
                        {Array(testimonial.rating)
                          .fill(0)
                          .map((_, j) => (
                            <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                          ))}
                      </div>
                      <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                        <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  )
}
