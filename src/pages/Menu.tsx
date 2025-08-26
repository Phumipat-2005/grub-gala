import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuData: Record<string, MenuItem[]> = {
  "thai-cuisine": [
    {
      id: "tom-yum",
      name: "ต้มยำกุ้ง",
      price: 120,
      description: "ต้มยำรสจัดจ้านพร้อมกุ้งสด",
      image: "🍤",
      category: "แกง"
    },
    {
      id: "pad-thai",
      name: "ผัดไทย",
      price: 80,
      description: "ผัดไทยกุ้งสดรสชาติต้นตำรับ",
      image: "🍝",
      category: "ผัด"
    },
    {
      id: "som-tam",
      name: "ส้มตำ",
      price: 60,
      description: "ส้มตำไทยรสจัดจ้าน",
      image: "🥗",
      category: "ยำ"
    },
    {
      id: "khao-pad",
      name: "ข้าวผัดกุ้ง",
      price: 90,
      description: "ข้าวผัดกุ้งสดหอมกรุ่น",
      image: "🍚",
      category: "ผัด"
    }
  ],
  "japanese-house": [
    {
      id: "sushi-set",
      name: "ซูชิเซ็ต",
      price: 280,
      description: "ซูชิหน้าปลาดิบสดใหม่ 8 ชิ้น",
      image: "🍣",
      category: "ซูชิ"
    },
    {
      id: "ramen",
      name: "ราเมนโชยุ",
      price: 180,
      description: "ราเมนน้ำใสรสชาติเข้มข้น",
      image: "🍜",
      category: "ราเมน"
    },
    {
      id: "tempura",
      name: "เทมปุระชุด",
      price: 200,
      description: "เทมปุระกุ้งและผักทอดกรอบ",
      image: "🍤",
      category: "ทอด"
    }
  ],
  "isaan-paradise": [
    {
      id: "som-tam-isaan",
      name: "ส้มตำปูปลาร้า",
      price: 80,
      description: "ส้มตำรสแซ่บพร้อมปูปลาร้า",
      image: "🦀",
      category: "ยำ"
    },
    {
      id: "larb",
      name: "ลาบหมู",
      price: 90,
      description: "ลาบหมูสับรสชาติจัดจ้าน",
      image: "🥩",
      category: "ลาบ"
    },
    {
      id: "grilled-chicken",
      name: "ไก่ย่าง",
      price: 150,
      description: "ไก่ย่างเครื่องเทศหอมกรุ่น",
      image: "🍗",
      category: "ย่าง"
    }
  ]
};

const restaurantNames: Record<string, string> = {
  "thai-cuisine": "ร้านอาหารไทยแท้",
  "japanese-house": "Japanese House",
  "isaan-paradise": "สวรรค์อีสาน"
};

const Menu = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);

  const menu = restaurantId ? menuData[restaurantId] || [] : [];
  const restaurantName = restaurantId ? restaurantNames[restaurantId] || "ร้านอาหาร" : "ร้านอาหาร";

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "เพิ่มในตะกร้าแล้ว",
      description: `เพิ่ม ${item.name} ในตะกร้าสำเร็จ`,
    });
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (itemId: string) => {
    const item = cart.find(cartItem => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "ตะกร้าว่าง",
        description: "กรุณาเลือกอาหารก่อนสั่งซื้อ",
        variant: "destructive"
      });
      return;
    }
    navigate("/checkout", { state: { cart, restaurantName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate("/restaurants")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-primary">{restaurantName}</h1>
              <p className="text-muted-foreground">เลือกอาหารที่คุณต้องการ</p>
            </div>
          </div>
          
          {cart.length > 0 && (
            <div className="bg-card p-4 rounded-lg shadow-elegant">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <span className="font-semibold">ตะกร้า ({cart.length} รายการ)</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                ฿{getTotalPrice().toLocaleString()}
              </div>
              <Button 
                variant="order" 
                size="sm" 
                className="w-full mt-2"
                onClick={proceedToCheckout}
              >
                สั่งซื้อ
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <Card key={item.id} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="text-5xl mb-2">{item.image}</div>
                  <CardTitle className="text-lg text-primary">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{item.category}</Badge>
                    <span className="text-xl font-bold text-primary">฿{item.price}</span>
                  </div>
                  
                  {quantity === 0 ? (
                    <Button 
                      variant="restaurant" 
                      className="w-full" 
                      onClick={() => addToCart(item)}
                    >
                      เพิ่มในตะกร้า
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center space-x-4">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-semibold min-w-[2ch] text-center">
                        {quantity}
                      </span>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;