import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock user loyalty data (in a real app, this would come from your backend)
const userLoyalty = {
  points: 750,
  tier: "Silver",
  nextTier: "Gold",
  pointsToNextTier: 250,
  totalPointsNeeded: 1000,
  history: [
    { date: "2025-10-30", action: "Purchase", points: 150, orderId: "#12345" },
    { date: "2025-10-15", action: "Review", points: 50, productId: "789" },
    { date: "2025-10-01", action: "Purchase", points: 200, orderId: "#12344" },
  ]
};

const tiers = [
  {
    name: "Bronze",
    pointsRequired: 0,
    benefits: [
      "Earn 1 point per ₹100 spent",
      "Birthday special offers",
      "Access to member-only sales",
    ]
  },
  {
    name: "Silver",
    pointsRequired: 500,
    benefits: [
      "Earn 2 points per ₹100 spent",
      "Free shipping on orders above ₹500",
      "Early access to sales",
      "Exclusive monthly offers",
    ]
  },
  {
    name: "Gold",
    pointsRequired: 1000,
    benefits: [
      "Earn 3 points per ₹100 spent",
      "Free shipping on all orders",
      "Priority customer service",
      "Exclusive seasonal gifts",
      "Double points days",
    ]
  },
  {
    name: "Platinum",
    pointsRequired: 2000,
    benefits: [
      "Earn 4 points per ₹100 spent",
      "Free express shipping",
      "Personal beauty consultant",
      "VIP event invitations",
      "Birthday month double points",
      "Free annual beauty box",
    ]
  }
];

const rewards = [
  {
    points: 200,
    name: "₹200 off your next purchase",
    description: "Minimum order value ₹1000",
    category: "Discount"
  },
  {
    points: 500,
    name: "Free Beauty Box",
    description: "Curated selection of premium samples",
    category: "Product"
  },
  {
    points: 750,
    name: "Free Makeup Consultation",
    description: "30-minute session with our experts",
    category: "Service"
  },
  {
    points: 1000,
    name: "Limited Edition Beauty Kit",
    description: "Exclusive products worth ₹2500",
    category: "Product"
  }
];

export default function LoyaltyProgramPage() {
  const progressToNextTier = (userLoyalty.points / userLoyalty.totalPointsNeeded) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-display">
            Beauty Rewards Program
          </h1>
          <p className="text-lg text-gray-600">
            Earn points, unlock rewards, and enjoy exclusive benefits
          </p>
        </div>

        {/* Current Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rewards Status</CardTitle>
              <CardDescription>Track your progress and points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Current Tier</div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-lg py-2">
                      {userLoyalty.tier}
                    </Badge>
                    <span className="text-2xl font-bold">{userLoyalty.points} points</span>
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <div className="text-sm text-gray-500">
                    {userLoyalty.pointsToNextTier} points to {userLoyalty.nextTier}
                  </div>
                  <Progress value={progressToNextTier} className="h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tiers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="tiers">Membership Tiers</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="history">Points History</TabsTrigger>
          </TabsList>

          {/* Tiers Content */}
          <TabsContent value="tiers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <Card key={tier.name} className={
                  tier.name === userLoyalty.tier ? 'border-primary' : ''
                }>
                  <CardHeader>
                    <CardTitle>{tier.name}</CardTitle>
                    <CardDescription>{tier.pointsRequired}+ points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards Content */}
          <TabsContent value="rewards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.name}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{reward.name}</CardTitle>
                      <Badge variant="secondary">{reward.points} points</Badge>
                    </div>
                    <CardDescription>{reward.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full"
                      disabled={userLoyalty.points < reward.points}
                    >
                      {userLoyalty.points >= reward.points ? "Redeem" : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* History Content */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Points Activity</CardTitle>
                <CardDescription>Recent points earned and redeemed</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full">
                  <div className="space-y-4">
                    {userLoyalty.history.map((item, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center py-3 border-b last:border-0"
                      >
                        <div>
                          <div className="font-medium">{item.action}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                          {item.orderId && (
                            <div className="text-sm text-gray-500">Order {item.orderId}</div>
                          )}
                        </div>
                        <Badge variant="outline">+{item.points} points</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}