import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, Star, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/restaurants");
    }
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-8xl mb-6">🍽️</div>
          <h1 className="text-5xl font-bold mb-4">ระบบสั่งอาหาร</h1>
          <p className="text-xl opacity-90 mb-8">
            สั่งอาหารออนไลน์ง่าย ๆ จากร้านโปรดของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <ChefHat className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">หลากหลายร้าน</h3>
            <p className="text-sm opacity-80">เลือกจากร้านอาหารมากมาย</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <Clock className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">จัดส่งรวดเร็ว</h3>
            <p className="text-sm opacity-80">อาหารถึงมือใน 25-35 นาที</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <Star className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">คุณภาพดี</h3>
            <p className="text-sm opacity-80">อาหารคุณภาพจากร้านคัดสรร</p>
          </div>
        </div>

        <Button 
          variant="hero" 
          size="lg" 
          className="text-lg px-8 py-6"
          onClick={handleGetStarted}
        >
          เริ่มสั่งอาหาร
        </Button>
      </div>
    </div>
  );
};

export default Index;
