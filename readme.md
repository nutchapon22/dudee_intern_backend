# API Documentation
#### Fibonacci และ washing machine

api สำหรับนวณ ลำดับ fibonacci โดย respond ค่า

 - จำนวน member
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

    npm run start
## API Endpoint

## สำหรับ fibonacci sequence 

    http://localhost:3000/api/v1/test/{จำนวนลำดับ}

## สำหรับ washing machine

#### แสดงทั้งหมด 

     http://localhost:3000/api/washing

method : GET

#### แสดงจาก id 

     http://localhost:3000/api/washing/{id}
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
    
#### ลบเครื่องซักผ้า

     http://localhost:3000/api/washing/{id}
method: DELETE

## ตัวอย่างการใช้

#### fibonacci sequence

    http://localhost:3000/api/v1/test/9
method : GET
ผลลัพธ์ 

	   {
		   "member-count": 8,
		   "secqueance": [0,1,1,2,3,5,8,13,21],
		   "total": 54
	   }

#### washing machine
แสดงทั้งหมด 

    http://localhost:3000/api/washing
method : GET
ผลลัพธ์ 

    [
	    {
		    "id": 1,
		    "status": "test status update",
		    "inUse": 0,
		    "coin": 50,
		    "timeLeft": "00:10:00"
	    },
	    {
		    "id": 2,
		    "status": "available",
		    "inUse": 1,
		    "coin": 5,
		    "timeLeft": "99:99:99"
		},
	    {
		    "id": 4,
		    "status": "ACTIVE",
		    "inUse": 0,
		    "coin": 0,
		    "timeLeft": "00:00:00"
		},
		{
			"id": 5,
			"status": "ACTIVE",
			"inUse": 0,
			"coin": 0,
			"timeLeft": "00:00:00"
		}
	]
แสดงจาก ID

    http://localhost:3000/api/washing/5
method : GET
ผลลัพธ์ 

    {
	    "id":5,
	    "status":"ACTIVE",
	    "inUse":0,
	    "coin":0,
	    "timeLeft":"00:00:00"
	}
	   

	   


 