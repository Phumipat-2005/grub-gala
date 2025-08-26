import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConfirming, setIsConfirming] = useState(false);

  const { cart, restaurantName } = location.state as { 
    cart: CartItem[], 
    restaurantName: string 
  };

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 30;
  const total = subtotal + deliveryFee;

  const handleConfirmOrder = async () => {
    setIsConfirming(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    toast({
      title: "สั่งซื้อสำเร็จ!",
      description: `หมายเลขออเดอร์: ${orderNumber}`,
    });
    
    navigate("/order-success", { 
      state: { 
        orderNumber, 
        total, 
        restaurantName,
        estimatedTime: "25-35 นาที"
      } 
    });
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-destructive">ไม่พบรายการสั่งซื้อ</CardTitle>
            <CardDescription>กรุณาเลือกอาหารจากเมนู</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/restaurants")} variant="hero">
              กลับไปเลือกร้าน
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-primary">สรุปรายการสั่งซื้อ</h1>
            <p className="text-muted-foreground">ตรวจสอบรายการก่อนยืนยันการสั่งซื้อ</p>
          </div>
        </div>

        <Card className="shadow-elegant mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>🏪</span>
              <span>{restaurantName}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.image}</span>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ฿{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              </div>
            ))}
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>ยอดรวมอาหาร</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>ค่าจัดส่ง</span>
                <span>฿{deliveryFee}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>ยอดรวมทั้งหมด</span>
                <span className="text-primary">฿{total.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>ยืนยันการสั่งซื้อ</CardTitle>
            <CardDescription>
              กรุณาตรวจสอบรายการให้ถูกต้องก่อนกดยืนยัน
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="order" 
              size="lg" 
              className="w-full"
              onClick={handleConfirmOrder}
              disabled={isConfirming}
            >
              {isConfirming ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังประมวลผล...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  ยืนยันการสั่งซื้อ (฿{total.toLocaleString()})
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;