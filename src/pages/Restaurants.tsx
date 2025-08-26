import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Star, Clock, MapPin } from "lucide-react";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  description: string;
}

const restaurants: Restaurant[] = [
  {
    id: "thai-cuisine",
    name: "ร้านอาหารไทยแท้",
    cuisine: "อาหารไทย",
    rating: 4.8,
    deliveryTime: "25-35 นาที",
    image: "🍜",
    description: "อาหารไทยต้นตำรับรสชาติจัดจ้าน"
  },
  {
    id: "japanese-house",
    name: "Japanese House",
    cuisine: "อาหารญี่ปุ่น",
    rating: 4.7,
    deliveryTime: "30-40 นาที",
    image: "🍣",
    description: "ซูชิและราเมนคุณภาพพรีเมียม"
  },
  {
    id: "isaan-paradise",
    name: "สวรรค์อีสาน",
    cuisine: "อาหารอีสาน",
    rating: 4.9,
    deliveryTime: "20-30 นาที",
    image: "🌶️",
    description: "ส้มตำและลาบรสชาติเผ็ดร้อน"
  }
];

const Restaurants = () => {
  const navigate = useNavigate();

  const handleSelectRestaurant = (restaurantId: string) => {
    navigate(`/menu/${restaurantId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">เลือกร้านอาหาร</h1>
            <p className="text-muted-foreground">เลือกร้านอาหารที่คุณต้องการสั่ง</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            ออกจากระบบ
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{restaurant.image}</div>
                <CardTitle className="text-xl text-primary">{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="secondary" className="w-full justify-center py-2">
                  <ChefHat className="w-4 h-4 mr-2" />
                  {restaurant.cuisine}
                </Badge>
                
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                    {restaurant.rating}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.deliveryTime}
                  </div>
                </div>
                
                <Button 
                  variant="restaurant" 
                  className="w-full" 
                  size="lg"
                  onClick={() => handleSelectRestaurant(restaurant.id)}
                >
                  เลือกร้านนี้
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;