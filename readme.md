# Fibonacci และ washing machine

api สำหรับนวณ ลำดับ fibonacci โดย respond ค่า

 -  จำนวน member
 - ตัวเลขในลำดับ
 - ผลรวมของตัวเลขในลำดับ

api สำหรับ washing machine ไว้สำหรับจัดการเครื่องซักผ้าเช่น

 - เพิ่มเครื่องซักผ้า
 - แก้ไขเครื่องซักผ้า
 - ลบเครื่องซักผ้า
 
## วิธีการติดตั้ง
clone project โดยใช้คำสั่งใน comand promt

    git clone https://github.com/nutchapon22/dudee_intern_backend.git

เข้าไปในโฟลเดอร์ที่ clone มา

    cd dudee_intern_backend
ใช้คำสั่ง

    npm install

## วิธีใช้

คำสั่งเพื่อเริ่ม server

    node server.js
## API Endpoint
## สำหรับ fibonacci 

    http://localhost:3000/api/v1/test/{จำนวนลำดับ}

## สำหรับ washing machine

#### แสดงทั้งหมด 

     http://localhost:3000/api/washing

method : GET

#### แสดงค่าจาก id 

    GET: http://localhost:3000/api/washing/{id}
  method : GET
#### เพิ่มเครื่องซักผ้า

     http://localhost:3000/api/washing
method : POST

#### อัพเดทเวลา

     http://localhost:3000/api/washing/time/{id}
mehod : PUT
ใส่ body

    {
	    "timeleft": TEXT
    }

####  อัพเดทเหรียญ

     http://localhost:3000/api/washing/coin/{id}
  
 method : PUT 
 ใส่ body

    {
    "money": INTEGER
    }

#### อัพเดทสถานะ 
    PUT: http://localhost:3000/api/washing/status/{id}

ใส่ body

    {
    "status": TEXT
    }
    
#### ลบเครื่อง

     http://localhost:3000/api/washing/{id}
method: DELETE
##
