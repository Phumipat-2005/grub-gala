import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Home } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderNumber, total, restaurantName, estimatedTime } = location.state as {
    orderNumber: string;
    total: number;
    restaurantName: string;
    estimatedTime: string;
  };

  const handleGoHome = () => {
    navigate("/restaurants");
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-elegant">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-primary">สั่งซื้อสำเร็จ!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">หมายเลขออเดอร์</div>
              <div className="text-xl font-bold text-primary">{orderNumber}</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ร้าน:</span>
                <span className="font-semibold">{restaurantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ยอดรวม:</span>
                <span className="font-semibold text-primary">฿{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">เวลาจัดส่งโดยประมาณ:</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{estimatedTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-accent/20 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              ขอบคุณที่ใช้บริการ! เราจะจัดส่งอาหารให้คุณในเวลาที่กำหนด
            </p>
          </div>

          <Button 
            variant="hero" 
            size="lg" 
            className="w-full"
            onClick={handleGoHome}
          >
            <Home className="w-4 h-4 mr-2" />
            กลับสู่หน้าหลัก
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;