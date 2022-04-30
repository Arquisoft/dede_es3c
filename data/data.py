# Python code to illustrate
# inserting data in MongoDB
from pymongo import MongoClient
import uuid
import os

try:
	conn = MongoClient("mongodb://SergioArroni:julio321@mongo:27017/DeDesktop?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
	print("Connected successfully!!!")
except:
	print("Could not connect to MongoDB")

# database
db = conn.DeDesktop

prod1_id = str(uuid.uuid4())
prod2_id = str(uuid.uuid4())
prod3_id = str(uuid.uuid4())
prod4_id = str(uuid.uuid4())
prod5_id = str(uuid.uuid4())
prod6_id = str(uuid.uuid4())
prod7_id = str(uuid.uuid4())
prod8_id = str(uuid.uuid4())
prod9_id = str(uuid.uuid4())
prod10_id = str(uuid.uuid4())
dc1_id = str(uuid.uuid4())
dc2_id = str(uuid.uuid4())

# Created or Switched to collection names: my_gfg_collection
collection = db.product

prod1 = {
		"id": prod1_id,
		"name":"NiSuPu Monitor",
		"description":"It's a bad Monitor",
        "price":69.96,
		"category":"Monitors",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/HP_l9kqjo.jpg",
		"stock":34
		}
prod2 = {
		"id": prod2_id,
		"name":"HP Monitor",
		"description":"It's a good Monitor",
        "price":99.99,
		"category":"Monitors",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/NiSiPu_dfue3n.jpg",
		"stock":36
		}
prod3 = {
		"id": prod3_id,
		"name":"NiSuPu Laptop",
		"description":"It's a bad Laptop",
        "price":56.5,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193157/samples/ecommerce/Portatil_Malo_so3bll.jpg",
		"stock":58
		}
prod4 = {
		"id": prod4_id,
		"name":"HP Laptop",
		"description":"It's a good Laptop",
        "price":345.99,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193012/samples/ecommerce/Portatil_bueno.jpg",
		"stock":95
		}
prod5 = {
		"id": prod5_id,
		"name":"God's Monitor",
		"description":"It's a very good monitor",
        "price":842.99,
		"category":"Monitors",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193343/samples/ecommerce/Deus_Monitor_awrfqo.jpg",
		"stock":23
		}
prod6 = {
		"id": prod6_id,
		"name":"NVIDIA 69 Supreme Titan Ultimate Pro",
		"description":"It is so expensive because it has RGB",
        "price":8400.99,
		"category":"Graphic_card",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193197/samples/ecommerce/Grafica_NVIDIA_olazl1.jpg",
		"stock":6
		}
prod7 = {
		"id": prod7_id,
		"name":"Cloud",
		"description":"Sitting here is like being on a cloud",
        "price":485.99,
		"category":"Chair",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193125/samples/ecommerce/Cloud_h9hgsc.png",
		"stock":10
		}
prod8 = {
		"id": prod8_id,
		"name":"RADEON AMD 666 Definitive edition",
		"description":"This graph gets hotter than hell",
        "price":7823.65,
		"category":"Graphic_card",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193186/samples/ecommerce/Grafica_AMD_mwbknw.jpg",
		"stock":18
		
		}
prod9 = {
		"id": prod9_id,
		"name":"PC Master Race",
		"description":"This computer programs only",
        "price":9999.54,
		"category":"PC",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193137/samples/ecommerce/PC_Master_dlbgig.webp",
		"stock":40
		}
prod10 = {
		"id": prod10_id,
		"name":"The humble pc",
		"description":"A good software architect will use this humble PC",
        "price":49.34,
		"category":"PC",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193512/samples/ecommerce/ElHumildePC_sp9ovk.webp",
		"stock":4
		}


# Insert Data
rec_prod_id1 = collection.insert_one(prod1)
rec_prod_id2 = collection.insert_one(prod2)
rec_prod_id3 = collection.insert_one(prod3)
rec_prod_id4 = collection.insert_one(prod4)
rec_prod_id5 = collection.insert_one(prod5)
rec_prod_id6 = collection.insert_one(prod6)
rec_prod_id7 = collection.insert_one(prod7)
rec_prod_id8 = collection.insert_one(prod8)
rec_prod_id9 = collection.insert_one(prod9)
rec_prod_id10 = collection.insert_one(prod10)

# print("Data inserted with record ids",rec_prod_id1," ",rec_prod_id2)

# insert users

collection = db.user

user1 = {
		"id": str(uuid.uuid4()),
		"username":"LeBron Raymone James Sr.",
		"email":"Thegoat@gmail.com",
        "salt": "596c06198d4ad5e349aab6de4e38c7a4",
        "hash": "55e2bf53ca5eecea3c225c6164abde0c008f86b5da63d68a52432025af08c134315359614b8a9f12a54917a539bc07636173a4ac9775be392d022ef748b07e0e",
		"rol":"Admin"
		}
user2 = {
		"id": str(uuid.uuid4()),
		"username":"Wardell Stephen Curry II",
		"email":"Chef@gmail.com",
     	"salt": "339ca94acee3deca6d7b828d32ec2c91",
        "hash": "dbca9157ddd245919d7d8f1447de16038fef80c6452654385257d3a32cc2b512f1fb2199df14248d6d6224ea8eb7eb783743038fa01d3ce2d5e07307b2517c74",
		"rol":"Client"
		}
user3 = {
		"id": str(uuid.uuid4()),
		"username":"Benjamin David Simmons",
		"email":"Ben@gmail.com",
        "salt": "00c5983ba369ba2bc1af6e0c097c8cc9",
        "hash": "6ee29247f6d06d7b1bfd550766c5d8ca4d0454deecfd2049cb4a9450ee823ec2ce5d0925fb91355ebc8423ac07cf87e70f66ec84c1f32c8dce097358a98bab5c",
		"rol":"Client"
		}
user4 = {
		"id": str(uuid.uuid4()),
		"username":"Dwyane Tyrone Wade, Jr.",
        "salt": "37028d151dd80a66e0228630712fd781",
        "hash": "81d2ab8889ecb3c4841a14f4cb2e45364f622405be31a1593f4f9ae373d62b376e64ab5392bbbbb6061f5cbe1f682562369d78720fab687959b45dcd7465b5b6",
		"rol":"Client"
		}
user5 = {
		"id": str(uuid.uuid4()),
		"username":"Russell Westbrook III",
		"email":"West@gmail.com",
        "salt": "f28fef0fc80e40a304ed402c8d3a8adc",
        "hash": "ca9cc4ac3f99fce105b6502fa4756dc77704fb6289ccbad485f414a47688983da4e62653601320c808e5066a1ab5f49652a89b6b9ea0e1c09d7173481b01b1d2",
		"rol":"Client"
		}

# Insert Data
rec_user_id1 = collection.insert_one(user1)
rec_user_id2 = collection.insert_one(user2)
rec_user_id3 = collection.insert_one(user3)
rec_user_id4 = collection.insert_one(user4)
rec_user_id5 = collection.insert_one(user5)


# print("Data inserted with record ids",rec_user_id1," ",rec_user_id2)

'''
# Printing the data inserted
cursor = collection.find()
for record in cursor:
	print(record)
import sys 
print("Output from Python") 
print("First name: " + sys.argv[1]) 
print("Last name: " + sys.argv[2]) 
'''



collection = db.distribution_center

dc1 = {
		"id": dc1_id,
		"address": "Calle Valdes Salas, 11, 33007 Oviedo, Asturias"
}
dc2 = {
		"id": dc2_id,
		"address": "Escuela Tecnica Superior de Ingenieria Informatica, Universidad de Sevilla, 41012 Sevilla",
}	
# Insert Data
rec_distcenter_id1=collection.insert_one(dc1)
rec_distcenter_id2=collection.insert_one(dc2)

collection = db.product_store

ps1_1 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod1_id,
	"stock": 6
}
ps1_2 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod2_id,
	"stock": 10
}
ps1_3 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod3_id,
	"stock": 34
}
ps1_4 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod4_id,
	"stock": 22
}
ps1_5 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod5_id,
	"stock": 3
}
ps1_6 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod6_id,
	"stock": 40
}
ps1_7 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod7_id,
	"stock": 6
}
ps1_8 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod8_id,
	"stock": 8
}
ps1_9 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod9_id,
	"stock": 6
}
ps1_10 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod10_id,
	"stock": 12
}
ps2_1 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod1_id,
	"stock": 2
}
ps2_3 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod3_id,
	"stock": 8
}
ps2_4 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod4_id,
	"stock": 4
}
ps2_5 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod5_id,
	"stock": 10
}
ps2_8 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod8_id,
	"stock": 5
}
ps2_9 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod9_id,
	"stock": 14
}
collection.insert_one(ps1_1)
collection.insert_one(ps1_2)
collection.insert_one(ps1_3)
collection.insert_one(ps1_4)
collection.insert_one(ps1_5)
collection.insert_one(ps1_6)
collection.insert_one(ps1_7)
collection.insert_one(ps1_8)
collection.insert_one(ps1_9)
collection.insert_one(ps1_10)
collection.insert_one(ps2_1)
collection.insert_one(ps2_3)
collection.insert_one(ps2_4)
collection.insert_one(ps2_5)
collection.insert_one(ps2_8)
collection.insert_one(ps2_9)

collection = db.productorder

prodord1 = {
		"id": str(uuid.uuid4()),
		"product": prod1,
		"quantity": 5,
		"distributionCenter": dc1
		}
prodord2 = {
		"id": str(uuid.uuid4()),
		"product": prod3,
		"quantity": 2,
		"distributionCenter": dc1
		}
prodord3 = {
		"id": str(uuid.uuid4()),
		"product": prod9,
		"quantity": 6,
		"distributionCenter": dc1
		}
# Insert Data
rec_prodorder_id1=collection.insert_one(prodord1)
rec_prodorder_id2=collection.insert_one(prodord2)
rec_prodorder_id2=collection.insert_one(prodord3)

collection = db.order

ord1 = {
		"id": str(uuid.uuid4()),
		"user": "Thegoat@gmail.com",
		"products": [prodord1,prodord2]
		}
ord2 = {
		"id": str(uuid.uuid4()),
		"user": "Chef@gmail.com",
		"products": [prodord1,prodord2,prodord3]
		}
# Insert Data
rec_order_id1=collection.insert_one(ord1)
rec_order_id2=collection.insert_one(ord2)
