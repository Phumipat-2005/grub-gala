import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Target, Heart, Clock, MapPin, Phone } from "lucide-react";

interface Persona {
  id: string;
  name: string;
  image: string;
  age: string;
  status: string;
  occupation: string;
  background: string[];
  goals: string[];
  expectations: string[];
  behaviors: string[];
  motivations: string[];
  bgColor: string;
}

const personas: Persona[] = [
  {
    id: "student",
    name: "นักศึกษา",
    image: "👨‍🎓",
    age: "18-23 ปี",
    status: "นักศึกษาปริญญาตรี ปี 1-4",
    occupation: "วิศวกรรมคอมพิวเตอร์",
    bgColor: "bg-teal-gradient",
    background: [
      "อายุ: 18-23 ปี",
      "สถานะ: นักศึกษาปริญญาตรี ปี 1-4", 
      "คณะ: วิศวกรรมคอมพิวเตอร์",
      "อุปกรณ์หลัก: สมาร์ทโฟน (iOS/Android), อินเทอร์เน็ตมหาวิทยาลัย",
      "พฤติกรรมการกิน: ชอบสั่งอ่วงหน้าเพื่อลดเวลา, บางครั้งสั่งพร้อมเพื่อน"
    ],
    goals: [
      "ชื้อราคาไม่อย่างราคาเจ็บ ไม่ต้องรอนาน",
      "ใช้ระบบเพื่อทักษะหาสถานะกลัวขั้นใดแบบเรียลไทม์",
      "ลดความเงื่อนไขและความแออัดในโรงอาหาร",
      "ได้รับอาหารที่ตรงตามโภชนาการและโครงการ",
      "ได้รับอาหารตรงตามกำหนดเวลาและปริมาณ"
    ],
    expectations: [
      "อาหารมีราคาถูกและคุ้มค่า (30-50 บาทต่อมื้อ)",
      "มีเมนูอาหารให้เลือกหลากหลาย",
      "ใช้งานในการรับอาหารสั่งล่วง",
      "รองรับการยืมบาน (ไม่เกิน 5-10 นาที)",
      "มีช่องทางการรัชซิงหลายแบบ (เงินสด, QR Code, บัตรนักศึกษา, e-Wallet)"
    ],
    behaviors: [
      "นักใช้บริการรื่นเดิน ๆ ที่ยากมีลักษณะแล้วถูกมาก",
      "กำโรงอาหารคนแน่น อาจเลือกไม่ย้อยจาก้าน",
      "รอบหารวิ่งทะลแน่น",
      "แขร็จนมูลลาดหรือโปรโมชันให้เพื่อนผ่านไป",
      "เข้ยอนีถ่า",
      "กำระมขลำหรือจำ จะเปลี่ยนไปช่อยหน้าร้าน แทน"
    ],
    motivations: [
      "ความสะดวกในการซื้ออาหาร",
      "มีความครองตันดีคุมภาพจากการ",
      "มีโภชนาการใดปู่ยันให้เพื่อนผ่านใช",
      "เซียล่นีดี"
    ]
  },
  {
    id: "teacher",
    name: "อาจารย์",
    image: "👨‍🏫",
    age: "30-60 ปี",
    status: "อาจารย์มหาวิทยาลัย (อาจารย์ประจำหรือพิเศษ)",
    occupation: "อาจารย์มหาวิทยาลัย",
    bgColor: "bg-orange-gradient",
    background: [
      "อายุ: 30-60 ปี",
      "พฤติกรรมการกิน: นักใส่งารปิง็คำเน็ช คึ่อมสื่อมหรือพิเซลย์",
      "สถานะ: อาจารย์มหาวิทยาลัย (อาจารย์ประจำหรือพิเศษ)"
    ],
    goals: [
      "สั่งอาหารได้อย่างรวดเร็ว ไม่ต้องคอย",
      "ลดความน่วยและความแออัดในโรงอาหาร",
      "สั่วาคำดำหวาดและความแอลจดทำปําเป่า"
    ],
    expectations: [
      "ระบบสั่งย่าม ใช้ใจได้ในาม (ไม่เนื่อ 1-2 นาทีต่อการสั่ง)",
      "รองรับการจำรัยเงินหลายแบบ (เงินสด, QR Code, บัตร, e-Wallet)"
    ],
    behaviors: [],
    motivations: [
      "ได้ประหยัดเวลา",
      "ได้ลดความร่วมรวย"
    ]
  },
  {
    id: "vendor",
    name: "แม่ค้า", 
    image: "👩‍🍳",
    age: "30-50 ปี",
    status: "เจ้าของร้านอาหาร/เครื่องดื่มในโรงอาหาร",
    occupation: "เจ้าของร้านอาหาร",
    bgColor: "bg-orange-gradient",
    background: [
      "อายุ: 30-50 ปี",
      "สถานะ: เจ้าของร้านอาหาร/เครื่องดื่มในโรงอาหาร"
    ],
    goals: [
      "รับออเดอร์ลูกค้าครบถ้วน",
      "เพิ่มยอดขายและจำนวนลูกค้า",
      "ลดต้องคุมคณาสก่อพจากการรับปำยาเปล่า"
    ],
    expectations: [
      "ใช้งานง่าย ไม่ต้องกดหลายขั้นตอน",
      "ลดความสับสนระหว่างวิซั่งฺคำกกิงอะ",
      "ราคาอาหารจำดงครบค่อม"
    ],
    behaviors: [],
    motivations: [
      "เพิ่มยอดขาย",
      "ปรีกรราสงจได้ดียิน"
    ]
  },
  {
    id: "officer",
    name: "เจ้าหน้าที่",
    image: "👮‍♂️", 
    age: "มีหน้าที่รักษาความปลอดภัยในมหาวิทยาลัย",
    status: "ปฏิบัติงานประจำจุด",
    occupation: "เจ้าหน้าที่รักษาความปลอดภัย",
    bgColor: "bg-orange-gradient",
    background: [
      "เจ้าหน้าที่ที่ทำงานอยู่ภายในมหาวิทยาลัย",
      "ปฏิบัติงานประจำจุด"
    ],
    goals: [
      "ประหยัดเวลา ไม่ต้องเดินออกจากจุดปฏิบัติงาน ชื่อฯการเอง",
      "จ่ายเงินได้สะดวก ไม่ต้องใช้เงินสดตลอดเวลา",
      "ไม่เสียเวลาต่อคิวในโรงอาหาร โดยเฉพาะช่วงเที่ยง",
      "รับประทานอาหารได้ที่จุดปฏิบัติ ๆ"
    ],
    expectations: [
      "ระบบต้องใช้งานง่าย เข้าใจได้ทันที",
      "ชื่อมุลอาหาร/ร้านค้าต้องอบเไปจดแบบเรียล ไทม์",
      "มีระบบจำยเงินแบบสแกน QR PromptPay",
      "รองรับการใช้งานไม่ไม่ฟ้เครื่องยาย อินเทอร์เน็ตของมหาวิทยาลัย"
    ],
    behaviors: [
      "ระบบต้องใช้งานง่าย เข้าใจได้ทันที",
      "ซื่อมุลอาหาร/ร้านค้าต้องอบซินเนตแบบเรียล ไทม์",
      "มีระบบจ่ายเงินแบบสแกน QR PromptPay",
      "รองรับการใช้งานไม่ใช่เครื่องหายย อินเทอร์เน็ตของมหาวิทยาลัย"
    ],
    motivations: [
      "รับอาหารทันเวลา",
      "มีลักษณะพิเศษเสอบาร์เจ้าหน้าที่ มหาวิทยาลัย เช่น เมนูราคาประหยัด หรือใช้จีไดสิทธิอย่าง"
    ]
  },
  {
    id: "outsider",
    name: "บุคคลภายนอก",
    image: "👨‍💼",
    age: "เป็นผู้นครอง หรือ วิทยากร และ ผู้มาร่วม กิจกรรม",
    status: "ไม่ริระบบนนกมนวกใในวิทยาลัยมากนัก ใช้เท่าที่ จำเป็น เช่น ชื้ออาหารหรืออย่างเงิน",
    occupation: "ผู้เข้าชมภายนอก",
    bgColor: "bg-orange-gradient",
    background: [
      "เป็นผู้นครอง หรือ วิทยากร และ ผู้มาร่วม กิจกรรม",
      "ไม่ริระบบนนกมนวกใในวิทยาลัยมากนัก ใช้เท่าที่ จำเป็น เช่น ชื้ออาหารหรืออย่างเงิน"
    ],
    goals: [
      "เข้าชนื้ออาหารได้อย่างรวดเร็ว ไม่ต้องรอนาน",
      "จ่ายเงินได้สะดวก ไม่ต้องใช้เงินสดตลอดเวลา",
      "อยากรู้เมนูและราคาอาหารข้อมหน้า",
      "ต้องการความยิดเปิด-ปิดโรงอาหาร และความหนาแน่นของคน"
    ],
    expectations: [
      "ระบบต้องใช้งานง่าย เข้าใจได้ทันที",
      "ชื่อมุลอาหาร/ร้านค้าต้องอซอัปเดตแบบเรียล ไทม์",
      "มีระบบจ่ายเงินแบบสแกน QR PromptPay",
      "รองรับการใช้งานไม่ให้เคร่อง่าย อินเทอร์เน็ตของมหาวิทยาลัย"
    ],
    behaviors: [],
    motivations: [
      "ความสะดวกในการซื้ออาหาร",
      "มีความครองคืคุมภาพจากคุมภาพการ"
    ]
  }
];

const Personas = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleBack}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-primary">User Personas</h1>
            <p className="text-muted-foreground">กลุ่มผู้ใช้งานระบบสั่งอาหาร</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <Card key={persona.id} className="hover:shadow-elegant transition-all duration-300">
              <CardHeader className={`${persona.bgColor} text-white rounded-t-lg`}>
                <div className="text-center">
                  <div className="text-6xl mb-4 bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    {persona.image}
                  </div>
                  <CardTitle className="text-2xl font-bold">{persona.name}</CardTitle>
                  <p className="text-white/90 text-sm">{persona.age}</p>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {/* Background */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-primary">พื้นหลัง (Background)</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {persona.background.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Goals */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-4 h-4 text-secondary" />
                    <h3 className="font-semibold text-secondary">เป้าหมาย (Goals)</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {persona.goals.map((goal, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {goal}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expectations */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-4 h-4 text-accent" />
                    <h3 className="font-semibold text-accent">ความคาดหวัง (Expectations)</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {persona.expectations.map((expectation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {expectation}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Behaviors */}
                {persona.behaviors.length > 0 && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <h3 className="font-semibold text-muted-foreground">พฤติกรรมการใช้บริการ (Behaviors)</h3>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      {persona.behaviors.map((behavior, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {behavior}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Motivations */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="w-4 h-4 text-destructive" />
                    <h3 className="font-semibold text-destructive">แรงจูงใจ (Motivation)</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    {persona.motivations.map((motivation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-destructive rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {motivation}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personas;