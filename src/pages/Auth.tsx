import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", phone: "", password: "" });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.phone && loginData.password) {
      localStorage.setItem("user", JSON.stringify({ phone: loginData.phone }));
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "ยินดีต้อนรับสู่ระบบสั่งอาหาร",
      });
      navigate("/restaurants");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.name && registerData.phone && registerData.password) {
      localStorage.setItem("user", JSON.stringify({ name: registerData.name, phone: registerData.phone }));
      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: `ยินดีต้อนรับ ${registerData.name}`,
      });
      navigate("/restaurants");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">ระบบสั่งอาหาร</CardTitle>
          <CardDescription className="text-muted-foreground">เข้าสู่ระบบหรือสมัครสมาชิกใหม่</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">เข้าสู่ระบบ</TabsTrigger>
              <TabsTrigger value="register">สมัครสมาชิก</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-phone">เบอร์โทรศัพท์</Label>
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="0812345678"
                    value={loginData.phone}
                    onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">รหัสผ่าน</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" size="lg">
                  เข้าสู่ระบบ
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">ชื่อ-นามสกุล</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="ชื่อ นามสกุล"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-phone">เบอร์โทรศัพท์</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="0812345678"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">รหัสผ่าน</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" variant="hero" className="w-full" size="lg">
                  สมัครสมาชิก
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;