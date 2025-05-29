import { useState } from "react";
import { Layout } from "@/components/layout";
import { 
  CircleSlash, 
  BarChart, 
  Recycle,
  Leaf,
  Apple,
  FileClock,
  FileText,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  ThumbsUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Educational resources content
const foodWasteFactsData = [
  {
    title: "Global Impact",
    description: "One-third of all food produced globally is lost or wasted, amounting to about 1.3 billion tons per year.",
    source: "UN Food and Agriculture Organization",
    icon: <BarChart className="h-8 w-8" />,
  },
  {
    title: "Environmental Consequences",
    description: "Food waste is responsible for 8% of global greenhouse gas emissions. If food waste were a country, it would be the third largest emitter after China and the US.",
    source: "United Nations Environment Programme",
    icon: <CircleSlash className="h-8 w-8" />,
  },
  {
    title: "Resource Depletion",
    description: "Food production accounts for 70% of water usage and 30% of global energy consumption. Wasting food means wasting these precious resources.",
    source: "World Resources Institute",
    icon: <Recycle className="h-8 w-8" />,
  },
  {
    title: "Hunger Crisis",
    description: "While 820 million people go hungry, a third of all food is wasted. The food currently wasted could feed 2 billion people.",
    source: "World Food Programme",
    icon: <Apple className="h-8 w-8" />,
  },
];

const tipsSections = [
  {
    title: "Shopping Tips",
    icon: <ShoppingBag className="h-6 w-6" />,
    tips: [
      "Make a shopping list and stick to it",
      "Check what you already have before shopping",
      "Don't shop on an empty stomach",
      "Buy only what you need and will use",
      "Choose loose produce so you can buy exactly the amount you need",
      "Check expiration dates and buy strategically",
      "Be realistic about what you'll consume",
    ],
  },
  {
    title: "Storage Tips",
    icon: <FileClock className="h-6 w-6" />,
    tips: [
      "Learn the proper way to store different foods",
      "Use airtight containers to keep food fresh longer",
      "Freeze items you won't use before they expire",
      "Store fruits and vegetables separately",
      "Keep track of what needs to be used first",
      "Understand the difference between 'best by', 'sell by', and 'use by' dates",
      "Regularly clean your refrigerator and organize by expiration date",
    ],
  },
  {
    title: "Cooking Tips",
    icon: <Leaf className="h-6 w-6" />,
    tips: [
      "Plan meals in advance",
      "Cook appropriate portions",
      "Use leftover ingredients creatively",
      "Learn to preserve foods by canning, pickling, or drying",
      "Use all edible parts of ingredients (e.g., vegetable stems and leaves)",
      "Revive wilted vegetables in cold water",
      "Repurpose stale bread into croutons or breadcrumbs",
    ],
  },
];

const faqData = [
  {
    question: "What are the biggest causes of food waste?",
    answer: "Food waste occurs for many reasons, including overbuying, poor planning, misunderstanding expiration dates, improper storage, overserving, and aesthetic standards for produce. In developed countries, consumer behavior is a major factor, while in developing regions, waste primarily occurs due to infrastructure and storage limitations."
  },
  {
    question: "How can I reduce food waste in my home?",
    answer: "You can reduce food waste by planning meals, creating shopping lists, storing food properly, understanding date labels, using leftovers creatively, composting food scraps, and donating excess food. The FoodSaver app helps with tracking inventory, expiration dates, and finding recipes for ingredients you need to use up."
  },
  {
    question: "What types of food can I donate?",
    answer: "You can typically donate unopened, non-perishable items within their expiration dates, such as canned goods, pasta, rice, and cereal. Some organizations also accept perishable items like fresh produce, dairy, and prepared foods, though this varies by location. FoodSaver connects you with local organizations and their specific acceptance policies."
  },
  {
    question: "How does food waste impact the environment?",
    answer: "Food waste has severe environmental impacts: it wastes the resources used in production (water, land, energy), creates methane emissions in landfills (a potent greenhouse gas), and contributes to climate change. By reducing food waste, you help conserve resources and reduce your carbon footprint."
  },
  {
    question: "What's the difference between 'best by', 'sell by', and 'use by' dates?",
    answer: "'Best by' dates indicate peak quality but not safety - foods are often good well beyond this date. 'Sell by' dates are for retailers' inventory management and products remain good beyond these dates. Only 'use by' dates relate to safety and indicate when perishable foods might become unsafe to consume."
  },
];

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState("facts");

  return (
    <Layout>
      <div className="py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-neutral-900">Education Hub</h2>
          <p className="mt-1 text-sm text-neutral-600">Learn about food waste and how to reduce it</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="facts" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="facts">Facts & Stats</TabsTrigger>
            <TabsTrigger value="tips">Reduction Tips</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Food Waste Facts */}
          <TabsContent value="facts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {foodWasteFactsData.map((fact, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-primary-50 rounded-md p-3 mr-4 text-primary-700">
                        {fact.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-neutral-900 mb-2">{fact.title}</h3>
                        <p className="text-neutral-600 mb-2">{fact.description}</p>
                        <p className="text-sm text-neutral-500">Source: {fact.source}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Understanding Food Waste</CardTitle>
                <CardDescription>
                  Food waste is a global issue with significant environmental, economic, and social impacts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Food waste occurs throughout the entire food supply chain, from farm to table. In developed countries, a significant portion occurs at the consumer level, while in developing countries, losses often happen during production and storage.
                  </p>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">The Impact of Food Waste:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Wastes resources used in food production (water, land, energy, labor)</li>
                      <li>Contributes to greenhouse gas emissions and climate change</li>
                      <li>Represents economic losses for farmers, businesses, and consumers</li>
                      <li>Occurs while millions of people struggle with food insecurity</li>
                    </ul>
                  </div>
                  <p>
                    By understanding the causes and consequences of food waste, we can take meaningful steps to reduce it at individual, community, and global levels.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => setActiveTab("tips")}>
                  Learn how to reduce food waste
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>The Food Waste Hierarchy</CardTitle>
                <CardDescription>
                  A framework for prioritizing strategies to reduce food waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <ThumbsUp className="mr-2 h-5 w-5" />
                      Prevention (Most Preferred)
                    </h4>
                    <p className="text-green-700">Reduce the surplus of food generated at all stages of the food system</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Recovery for Human Consumption</h4>
                    <p className="text-blue-700">Donate extra food to food banks, shelters, and other food recovery programs</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">Animal Feed</h4>
                    <p className="text-yellow-700">Divert food scraps to feed animals when safe and appropriate</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">Industrial Uses</h4>
                    <p className="text-orange-700">Convert waste oils into fuel and food waste into energy via anaerobic digestion</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">Composting</h4>
                    <p className="text-purple-700">Create nutrient-rich soil amendment through composting food scraps</p>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-800 mb-2">Landfill/Incineration (Least Preferred)</h4>
                    <p className="text-red-700">Dispose as a last resort when no other options are available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reduction Tips */}
          <TabsContent value="tips">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {tipsSections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0 bg-primary-50 rounded-md p-2 text-primary-700">
                        {section.icon}
                      </div>
                      <CardTitle>{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Meal Planning Guide</CardTitle>
                <CardDescription>
                  Effective meal planning is one of the best ways to reduce food waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">Step 1: Take Inventory</h4>
                    <p className="mb-2">Check your refrigerator, freezer, and pantry to see what you already have.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Note items nearing expiration that need to be used first</li>
                      <li>Make a list of staples you need to restock</li>
                      <li>Use the FoodSaver app to track your inventory</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">Step 2: Plan Your Meals</h4>
                    <p className="mb-2">Create a meal plan for the week based on what you have and what you need to buy.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Prioritize using ingredients that will expire soon</li>
                      <li>Consider your schedule and plan simpler meals for busy days</li>
                      <li>Plan to use leftovers in future meals</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">Step 3: Create a Shopping List</h4>
                    <p className="mb-2">Make a detailed shopping list based on your meal plan.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Organize your list by store sections</li>
                      <li>Include quantities to avoid over-purchasing</li>
                      <li>Stick to your list while shopping</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">Step 4: Prep Ingredients</h4>
                    <p className="mb-2">Prepare ingredients in advance to make cooking easier throughout the week.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Wash and chop vegetables</li>
                      <li>Cook grains and proteins in batches</li>
                      <li>Freeze portions you won't use immediately</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => window.location.href = "/recipes"}>
                  Find recipes for your ingredients
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Download Our Food Storage Guide</CardTitle>
                <CardDescription>
                  Learn how to properly store different types of food to maximize freshness
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="h-40 w-40 md:h-48 md:w-48 bg-neutral-100 rounded-md flex items-center justify-center">
                    <FileText className="h-16 w-16 text-neutral-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-lg mb-2">Food Storage and Shelf Life Guide</h4>
                    <p className="text-neutral-600 mb-4">
                      Our comprehensive guide includes storage tips for fruits, vegetables, dairy, meat, and pantry items, plus a shelf-life chart for common foods.
                    </p>
                    <Button>Download PDF Guide</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about food waste and how to reduce it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqData.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-neutral-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Have More Questions?</CardTitle>
                <CardDescription>
                  We're here to help you reduce food waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-neutral-600">
                    If you have additional questions about food waste reduction or using the FoodSaver app, please contact us.
                  </p>
                  <Button variant="outline">Contact Support</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
