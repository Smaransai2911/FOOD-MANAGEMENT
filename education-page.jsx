import React, { useState } from 'react';

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState('about');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Food Waste Education</h1>
        <p className="text-muted-foreground">
          Learn about food waste and how you can make a difference
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-card rounded-lg shadow mb-8">
        <div className="flex overflow-x-auto">
          <button
            className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('about')}
          >
            About Food Waste
          </button>
          
          <button
            className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'tips'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('tips')}
          >
            Reduction Tips
          </button>
          
          <button
            className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'storage'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('storage')}
          >
            Storage Guide
          </button>
          
          <button
            className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'expiry'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('expiry')}
          >
            Understanding Expiry Dates
          </button>
          
          <button
            className={`px-6 py-4 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'faq'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-card rounded-lg shadow p-6">
        {/* About Food Waste */}
        {activeTab === 'about' && (
          <div className="prose max-w-none">
            <h2>The Global Food Waste Crisis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p>
                  Food waste is a significant global issue with far-reaching environmental, economic, and social impacts. 
                  Approximately one-third of all food produced for human consumption is lost or wasted, amounting to about 
                  1.3 billion tons annually.
                </p>
                <p>
                  In developed countries, food waste occurs primarily at the consumer level, with households discarding edible 
                  food due to over-purchasing, poor planning, confusion about expiry dates, or aesthetic preferences.
                </p>
                <p>
                  The environmental cost is staggering - food waste accounts for approximately 8% of global greenhouse gas 
                  emissions. When food decomposes in landfills, it produces methane, a greenhouse gas 25 times more potent 
                  than carbon dioxide.
                </p>
              </div>
              <div>
                <div className="bg-muted p-6 rounded-lg h-full">
                  <h3 className="text-lg font-bold mb-3">Food Waste By The Numbers</h3>
                  <ul className="space-y-4">
                    <li className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary mr-3">1/3</span>
                      <span>of all food produced globally is wasted</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary mr-3">1.3B</span>
                      <span>tons of food wasted annually</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary mr-3">$1T</span>
                      <span>economic cost of food waste per year</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary mr-3">8%</span>
                      <span>of global greenhouse gas emissions</span>
                    </li>
                    <li className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary mr-3">28%</span>
                      <span>of agricultural land used to produce wasted food</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h2>Why Food Waste Matters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Environmental Impact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>Produces greenhouse gas emissions</li>
                  <li>Wastes water used in food production</li>
                  <li>Contributes to deforestation and soil degradation</li>
                  <li>Depletes natural resources</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Economic Impact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>Costs households hundreds of dollars annually</li>
                  <li>Wastes resources used in production and transportation</li>
                  <li>Increases food prices due to inefficiencies</li>
                  <li>Lost business opportunities from potential recycling</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Social Impact
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>Occurs while millions suffer from hunger</li>
                  <li>Exacerbates food insecurity and malnutrition</li>
                  <li>Deepens social inequalities</li>
                  <li>Misses opportunities to support communities in need</li>
                </ul>
              </div>
            </div>
            
            <h2>Our Mission</h2>
            <p>
              Our platform aims to address the food waste crisis by empowering individuals to:
            </p>
            <ul className="mb-8">
              <li>Track their food inventory to prevent waste</li>
              <li>Connect with local organizations to donate surplus food</li>
              <li>Find creative recipes to use up ingredients before they expire</li>
              <li>Learn best practices for food storage and management</li>
              <li>Quantify their impact in reducing food waste</li>
            </ul>
            
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Join the Movement</h3>
              <p>
                By making small changes in our daily habits, we can collectively make a significant impact on reducing 
                food waste. Sign up today and be part of the solution!
              </p>
              <a 
                href="/auth" 
                className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                Get Started Now
              </a>
            </div>
          </div>
        )}
        
        {/* Reduction Tips */}
        {activeTab === 'tips' && (
          <div className="prose max-w-none">
            <h2>Smart Food Waste Reduction Tips</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <img 
                  src="/img/food-planning.jpg" 
                  alt="Food planning" 
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <h3>Plan Your Meals</h3>
                <ul>
                  <li>Create a weekly meal plan before shopping</li>
                  <li>Check your inventory before making shopping lists</li>
                  <li>Buy only what you need for planned meals</li>
                  <li>Consider how many meals you'll eat at home vs. out</li>
                  <li>Plan for leftovers in future meals</li>
                </ul>
              </div>
              
              <div>
                <img 
                  src="/img/food-storage.jpg" 
                  alt="Food storage" 
                  className="rounded-lg mb-4 w-full h-64 object-cover"
                />
                <h3>Store Food Properly</h3>
                <ul>
                  <li>Learn optimal storage conditions for different foods</li>
                  <li>Use air-tight containers to keep food fresh longer</li>
                  <li>Label containers with contents and dates</li>
                  <li>Follow the "first in, first out" principle</li>
                  <li>Keep your refrigerator organized and at the right temperature</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3">Shopping Smart</h3>
                <ul className="space-y-2">
                  <li>Stick to your shopping list</li>
                  <li>Avoid bulk deals unless you can use them</li>
                  <li>Buy "ugly" produce - it's perfectly good</li>
                  <li>Shop more frequently for fresh items</li>
                  <li>Check expiry dates while shopping</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3">Cooking Wisely</h3>
                <ul className="space-y-2">
                  <li>Cook appropriate portion sizes</li>
                  <li>Use whole ingredients when possible</li>
                  <li>Save and use vegetable scraps for stock</li>
                  <li>Learn to preserve foods by freezing, canning, etc.</li>
                  <li>Get creative with leftovers and "food scraps"</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3">Community Actions</h3>
                <ul className="space-y-2">
                  <li>Donate excess non-perishables</li>
                  <li>Share surplus garden produce</li>
                  <li>Start or join a community compost</li>
                  <li>Support businesses that minimize waste</li>
                  <li>Educate others about food waste</li>
                </ul>
              </div>
            </div>
            
            <h3>Understanding Your Food's Timeline</h3>
            <p>
              Different foods have different shelf lives. Learning how long foods typically last can help 
              you plan your consumption and reduce waste. Here are some common items:
            </p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left">Food Type</th>
                    <th className="px-4 py-2 text-left">Refrigerator</th>
                    <th className="px-4 py-2 text-left">Freezer</th>
                    <th className="px-4 py-2 text-left">Tips</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-2 font-medium">Leafy Greens</td>
                    <td className="px-4 py-2">5-7 days</td>
                    <td className="px-4 py-2">8-12 months</td>
                    <td className="px-4 py-2">Store with paper towel to absorb moisture</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Berries</td>
                    <td className="px-4 py-2">3-5 days</td>
                    <td className="px-4 py-2">8-12 months</td>
                    <td className="px-4 py-2">Don't wash until ready to use</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Cooked Meat</td>
                    <td className="px-4 py-2">3-4 days</td>
                    <td className="px-4 py-2">2-3 months</td>
                    <td className="px-4 py-2">Store in shallow containers for quick cooling</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Milk</td>
                    <td className="px-4 py-2">5-7 days</td>
                    <td className="px-4 py-2">3 months</td>
                    <td className="px-4 py-2">Store in the back of the fridge, not the door</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Bread</td>
                    <td className="px-4 py-2">5-7 days</td>
                    <td className="px-4 py-2">3 months</td>
                    <td className="px-4 py-2">Freeze half a loaf if you won't use it all</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Track Your Progress</h3>
              <p>
                Use our inventory management system to track your food and get notifications before items expire.
                This can help you reduce waste and save money!
              </p>
              <a 
                href="/inventory" 
                className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                Manage Your Inventory
              </a>
            </div>
          </div>
        )}
        
        {/* Storage Guide */}
        {activeTab === 'storage' && (
          <div className="prose max-w-none">
            <h2>Food Storage Guide</h2>
            <p>
              Proper food storage is essential for maximizing freshness and minimizing waste. 
              Here's a comprehensive guide for storing different types of food.
            </p>
            
            <h3 className="mt-8">Refrigerator Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p>
                  Your refrigerator has different temperature zones. Knowing which foods to store where 
                  can extend their life:
                </p>
                <ul>
                  <li><strong>Upper shelves (35-38°F):</strong> Ready-to-eat foods, leftovers, drinks</li>
                  <li><strong>Middle shelves (38-40°F):</strong> Dairy products, eggs</li>
                  <li><strong>Lower shelves (coldest):</strong> Raw meat, poultry, fish</li>
                  <li><strong>Crisper drawers:</strong> Fruits and vegetables (adjust humidity as needed)</li>
                  <li><strong>Door (warmest):</strong> Condiments, juices</li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-5">
                <h4 className="text-lg font-bold mb-3">Refrigerator Tips</h4>
                <ul className="space-y-2">
                  <li>Keep temperature between 35-38°F (1-3°C)</li>
                  <li>Don't overcrowd - allow air circulation</li>
                  <li>Clean regularly to prevent odors and bacteria</li>
                  <li>Store raw meat in containers to prevent dripping</li>
                  <li>Store leftovers in clear containers to see contents</li>
                  <li>Keep fruits and vegetables separate</li>
                </ul>
              </div>
            </div>
            
            <h3>Fruit Storage Guide</h3>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">Fruit</th>
                      <th className="px-4 py-2 text-left">Room Temp</th>
                      <th className="px-4 py-2 text-left">Refrigerator</th>
                      <th className="px-4 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2 font-medium">Apples</td>
                      <td className="px-4 py-2">1-2 weeks</td>
                      <td className="px-4 py-2">4-6 weeks</td>
                      <td className="px-4 py-2">Refrigerate in crisper drawer; store away from other fruits</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Bananas</td>
                      <td className="px-4 py-2">2-5 days</td>
                      <td className="px-4 py-2">Not recommended</td>
                      <td className="px-4 py-2">Refrigerating causes skin to blacken, but flesh stays edible</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Berries</td>
                      <td className="px-4 py-2">1-2 days</td>
                      <td className="px-4 py-2">3-5 days</td>
                      <td className="px-4 py-2">Don't wash until ready to use; store in breathable container</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Citrus</td>
                      <td className="px-4 py-2">1-2 weeks</td>
                      <td className="px-4 py-2">2-4 weeks</td>
                      <td className="px-4 py-2">Store in mesh bag or crisper drawer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Avocados</td>
                      <td className="px-4 py-2">Until ripe</td>
                      <td className="px-4 py-2">3-5 days (ripe)</td>
                      <td className="px-4 py-2">Ripen at room temp; refrigerate once ripe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <h3>Vegetable Storage Guide</h3>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">Vegetable</th>
                      <th className="px-4 py-2 text-left">Room Temp</th>
                      <th className="px-4 py-2 text-left">Refrigerator</th>
                      <th className="px-4 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2 font-medium">Leafy Greens</td>
                      <td className="px-4 py-2">Not recommended</td>
                      <td className="px-4 py-2">5-7 days</td>
                      <td className="px-4 py-2">Wash, dry thoroughly, wrap in paper towel, store in bag</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Tomatoes</td>
                      <td className="px-4 py-2">Until ripe</td>
                      <td className="px-4 py-2">3-5 days (ripe)</td>
                      <td className="px-4 py-2">Store stem-side down at room temp until ripe</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Root Vegetables</td>
                      <td className="px-4 py-2">1-2 weeks</td>
                      <td className="px-4 py-2">2-3 weeks</td>
                      <td className="px-4 py-2">Remove tops; store in crisper drawer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Potatoes/Onions</td>
                      <td className="px-4 py-2">2-4 weeks</td>
                      <td className="px-4 py-2">Not recommended</td>
                      <td className="px-4 py-2">Store in cool, dark, dry place; never store together</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Bell Peppers</td>
                      <td className="px-4 py-2">1-2 days</td>
                      <td className="px-4 py-2">1-2 weeks</td>
                      <td className="px-4 py-2">Store in crisper drawer; whole peppers last longer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <h3>Protein Storage Guide</h3>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">Protein</th>
                      <th className="px-4 py-2 text-left">Refrigerator</th>
                      <th className="px-4 py-2 text-left">Freezer</th>
                      <th className="px-4 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2 font-medium">Raw Poultry</td>
                      <td className="px-4 py-2">1-2 days</td>
                      <td className="px-4 py-2">9-12 months</td>
                      <td className="px-4 py-2">Store on bottom shelf in original packaging or airtight container</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Raw Ground Meat</td>
                      <td className="px-4 py-2">1-2 days</td>
                      <td className="px-4 py-2">3-4 months</td>
                      <td className="px-4 py-2">Store on bottom shelf away from ready-to-eat foods</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Raw Steaks/Chops</td>
                      <td className="px-4 py-2">3-5 days</td>
                      <td className="px-4 py-2">6-12 months</td>
                      <td className="px-4 py-2">Wrap tightly in freezer paper or plastic wrap</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Fish/Seafood</td>
                      <td className="px-4 py-2">1-2 days</td>
                      <td className="px-4 py-2">2-3 months</td>
                      <td className="px-4 py-2">Store on ice in the refrigerator for best quality</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Tofu</td>
                      <td className="px-4 py-2">3-5 days</td>
                      <td className="px-4 py-2">5-6 months</td>
                      <td className="px-4 py-2">Store in water; change water daily</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3">Freezer Storage Tips</h3>
                <ul className="space-y-2">
                  <li>Set freezer temperature to 0°F (-18°C) or below</li>
                  <li>Use freezer-safe containers or heavy-duty freezer bags</li>
                  <li>Remove air from packaging to prevent freezer burn</li>
                  <li>Label all containers with contents and date</li>
                  <li>Blanch vegetables before freezing to preserve quality</li>
                  <li>Freeze items flat to save space and speed thawing</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3">Pantry Storage Tips</h3>
                <ul className="space-y-2">
                  <li>Store in cool, dry, dark location (50-70°F)</li>
                  <li>Use airtight containers for opened packages</li>
                  <li>Keep foods in original packaging until opened</li>
                  <li>Store flour, sugar, and grains in airtight containers</li>
                  <li>Keep onions, garlic, and potatoes separate</li>
                  <li>Check expiration dates and use FIFO method</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Track Your Food Storage</h3>
              <p>
                Our app helps you track how you're storing your food and reminds you when items 
                need to be used. Keep your inventory updated for the best experience!
              </p>
              <a 
                href="/inventory" 
                className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                Update Your Inventory
              </a>
            </div>
          </div>
        )}
        
        {/* Understanding Expiry Dates */}
        {activeTab === 'expiry' && (
          <div className="prose max-w-none">
            <h2>Understanding Food Date Labels</h2>
            <p>
              Food date labels can be confusing, leading many people to throw away perfectly good food. 
              Understanding what these dates actually mean can help reduce unnecessary food waste.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3>Common Date Labels</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">Best Before / Best By</h4>
                    <p className="text-muted-foreground">
                      Indicates when a product will be at its best quality. The food is still safe to eat after this date 
                      as long as it hasn't spoiled, but may not be at its best flavor or texture.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Use By</h4>
                    <p className="text-muted-foreground">
                      Refers to food safety rather than quality. Foods should not be eaten after the 'use by' date as they 
                      might be unsafe, even if they look and smell fine.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Sell By</h4>
                    <p className="text-muted-foreground">
                      Tells the store how long to display the product for sale. It's not a safety date. Foods are still good 
                      to eat after the sell-by date if properly stored.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Packed On / Manufactured On</h4>
                    <p className="text-muted-foreground">
                      Simply indicates when the food was packaged or produced. Use visual cues and smell to determine freshness.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted rounded-lg p-5">
                <h3 className="text-lg font-bold mb-3">Did You Know?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      <strong>90% of Americans</strong> throw food away prematurely because they misinterpret date labels.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Except for infant formula, <strong>date labels are not federally regulated</strong> and do not indicate safety.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      The average family of four throws out approximately <strong>$1,600 worth of produce</strong> each year.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Many manufacturers are moving toward <strong>clearer date labeling</strong> to help reduce confusion and waste.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h3>How to Tell if Food is Still Good</h3>
            <p>
              Rather than relying solely on dates, use your senses to determine if food is still good to eat:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Look
                </h4>
                <p className="text-sm">
                  Check for discoloration, mold, or texture changes. Some visual changes are harmless while others indicate spoilage.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Smell
                </h4>
                <p className="text-sm">
                  Trust your nose. Sour, rancid, or unusual odors are good indicators that food has spoiled.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Feel
                </h4>
                <p className="text-sm">
                  Notice texture changes like sliminess, excessive softness, or hardness that wasn't present when fresh.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h4 className="font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Taste
                </h4>
                <p className="text-sm">
                  If it passes the look, smell, and feel tests, try a small taste. If it tastes off, don't continue eating.
                </p>
              </div>
            </div>
            
            <h3>Food-Specific Expiry Guidelines</h3>
            <div className="mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left">Food</th>
                      <th className="px-4 py-2 text-left">Past Printed Date - Still Good</th>
                      <th className="px-4 py-2 text-left">Signs of Spoilage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2 font-medium">Eggs</td>
                      <td className="px-4 py-2">3-5 weeks</td>
                      <td className="px-4 py-2">Float in water, sulfur smell when cracked</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Milk</td>
                      <td className="px-4 py-2">5-7 days if refrigerated properly</td>
                      <td className="px-4 py-2">Sour smell, curdling, unusual color</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Yogurt</td>
                      <td className="px-4 py-2">1-2 weeks</td>
                      <td className="px-4 py-2">Mold, off smell, excessive liquid</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Cheese (hard)</td>
                      <td className="px-4 py-2">3-4 weeks</td>
                      <td className="px-4 py-2">Mold (can cut off small spots), slimy texture</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-medium">Canned goods</td>
                      <td className="px-4 py-2">1-4 years</td>
                      <td className="px-4 py-2">Rust, dents, swelling, leaking, spurting when opened</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Track Expiry Dates Automatically</h3>
              <p>
                Our app helps you track expiry dates and get reminders when items need to be used.
                Add your inventory items and we'll help you use them before they spoil!
              </p>
              <a 
                href="/inventory" 
                className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
              >
                Track Your Food
              </a>
            </div>
          </div>
        )}
        
        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="prose max-w-none">
            <h2>Frequently Asked Questions</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">What is food waste?</h3>
                <p>
                  Food waste refers to food that is discarded, uneaten, or lost at any stage of the food supply chain, 
                  from production and processing to retail and consumption. This includes food that spoils before it can 
                  be eaten, food that is thrown away due to aesthetic standards, and food that is discarded by consumers.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">Why should I care about reducing food waste?</h3>
                <p>
                  Reducing food waste has multiple benefits:
                </p>
                <ul>
                  <li>Environmental: Reduces greenhouse gas emissions, conserves resources like water and land</li>
                  <li>Economic: Saves money on your grocery bill and reduces waste management costs</li>
                  <li>Social: Helps address food insecurity by redirecting surplus food to those in need</li>
                  <li>Ethical: Shows respect for the resources and labor that went into producing the food</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">What's the difference between "use by" and "best before" dates?</h3>
                <p>
                  "Use by" dates are about safety and indicate when a food might no longer be safe to eat. Foods should not 
                  be eaten after this date, even if they look and smell fine.
                </p>
                <p>
                  "Best before" dates are about quality rather than safety. After this date, the food may not be at its best 
                  in terms of flavor, texture, or appearance, but it is still safe to eat if stored correctly and shows no 
                  signs of spoilage.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">How can I tell if food is still safe to eat?</h3>
                <p>
                  Use your senses:
                </p>
                <ul>
                  <li>Look for unusual colors, textures, or mold</li>
                  <li>Smell for off or sour odors</li>
                  <li>Feel for slimy textures or unusual hardness/softness</li>
                  <li>If it passes these tests, taste a small amount</li>
                </ul>
                <p>
                  Remember that some foods naturally change appearance as they age but are still safe to eat, while others 
                  may look fine but have harmful bacteria. When in doubt, throw it out.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">What foods can I donate?</h3>
                <p>
                  Most donation centers accept:
                </p>
                <ul>
                  <li>Unopened, non-perishable items within expiration dates</li>
                  <li>Canned goods and dry goods in their original packaging</li>
                  <li>Some accept fresh produce, dairy, and freezer items (call first)</li>
                </ul>
                <p>
                  Food banks typically cannot accept:
                </p>
                <ul>
                  <li>Homemade or partially consumed foods</li>
                  <li>Expired items or items with damaged packaging</li>
                  <li>Alcohol or medications</li>
                </ul>
                <p>
                  Always check with your local food donation center for their specific guidelines.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">How can I reduce food waste in my home?</h3>
                <p>
                  Here are some effective strategies:
                </p>
                <ul>
                  <li>Plan meals and make shopping lists to buy only what you need</li>
                  <li>Store food properly to extend its life</li>
                  <li>Learn to preserve foods through freezing, canning, or pickling</li>
                  <li>Use the oldest items in your pantry and refrigerator first</li>
                  <li>Get creative with leftovers and "scraps" like vegetable peels</li>
                  <li>Compost food waste that cannot be eaten</li>
                  <li>Use our app to track your inventory and expiry dates</li>
                </ul>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">What happens to food waste in landfills?</h3>
                <p>
                  When food waste goes to landfills, it gets buried under layers of other waste without access to oxygen. 
                  This causes it to decompose anaerobically, producing methane, a greenhouse gas that is 25 times more potent 
                  than carbon dioxide. Additionally, nutrients in the food are not returned to the soil as they would be in 
                  composting, resulting in a lost opportunity for enriching agricultural land.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-5">
                <h3 className="text-xl font-bold mb-2">How does your app help reduce food waste?</h3>
                <p>
                  Our app offers several features to help you reduce food waste:
                </p>
                <ul>
                  <li>Inventory tracking with expiry date notifications</li>
                  <li>Recipe suggestions based on ingredients you have</li>
                  <li>Connection to local donation centers for surplus food</li>
                  <li>Educational resources on proper food storage and understanding date labels</li>
                  <li>Impact tracking to see how your actions are making a difference</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">Have More Questions?</h3>
              <p>
                If you have more questions about reducing food waste or using our platform, please 
                don't hesitate to reach out to our team. We're here to help you make a difference!
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                  Contact Us
                </a>
                <a 
                  href="/auth" 
                  className="inline-block px-6 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition"
                >
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}