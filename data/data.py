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

# Created or Switched to collection names: my_gfg_collection
collection = db.product

prod1 = {
		"id": str(uuid.uuid4()),
		"name":"NiSuPu Monitor",
		"description":"It's a bad Monitor",
        "price":69.96,
		"category":"Monitors",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/HP_l9kqjo.jpg",
		"stock":34
		}
prod2 = {
		"id": str(uuid.uuid4()),
		"name":"HP Monitor",
		"description":"It's a good Monitor",
        "price":99.99,
		"category":"Monitors",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/NiSiPu_dfue3n.jpg",
		"stock":36
		}
prod3 = {
		"id": str(uuid.uuid4()),
		"name":"NiSuPu Laptop",
		"description":"It's a bad Laptop",
        "price":56.5,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193157/samples/ecommerce/Portatil_Malo_so3bll.jpg",
		"stock":58
		}
prod4 = {
		"id": str(uuid.uuid4()),
		"name":"HP Laptop",
		"description":"It's a good Laptop",
        "price":345.99,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193012/samples/ecommerce/Portatil_bueno.jpg",
		"stock":95
		}
prod5 = {
		"id": str(uuid.uuid4()),
		"name":"God's Monitor",
		"description":"It's a very good monitor",
        "price":842.99,
		"category":"Monitors",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193343/samples/ecommerce/Deus_Monitor_awrfqo.jpg",
		"stock":23
		}
prod6 = {
		"id": str(uuid.uuid4()),
		"name":"NVIDIA 69 Supreme Titan Ultimate Pro",
		"description":"It is so expensive because it has RGB",
        "price":8400.99,
		"category":"Graphic_card",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193197/samples/ecommerce/Grafica_NVIDIA_olazl1.jpg",
		"stock":6
		}
prod7 = {
		"id": str(uuid.uuid4()),
		"name":"Cloud",
		"description":"Sitting here is like being on a cloud",
        "price":485.99,
		"category":"Chair",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193125/samples/ecommerce/Cloud_h9hgsc.png",
		"stock":10
		}
prod8 = {
		"id": str(uuid.uuid4()),
		"name":"RADEON AMD 666 Definitive edition",
		"description":"This graph gets hotter than hell",
        "price":7823.65,
		"category":"Graphic_card",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193186/samples/ecommerce/Grafica_AMD_mwbknw.jpg",
		"stock":18
		
		}
prod9 = {
		"id": str(uuid.uuid4()),
		"name":"PC Master Race",
		"description":"This computer programs only",
        "price":9999.54,
		"category":"PC",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1647193137/samples/ecommerce/PC_Master_dlbgig.webp",
		"stock":40
		}
prod10 = {
		"id": str(uuid.uuid4()),
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
        "password":"lakers",
		"rol":"Admin"
		}
user2 = {
		"id": str(uuid.uuid4()),
		"username":"Wardell Stephen Curry II",
		"email":"Chef@gmail.com",
        "password":"123456",
		"rol":"Client"
		}
user3 = {
		"id": str(uuid.uuid4()),
		"username":"Benjamin David Simmons",
		"email":"Ben@gmail.com",
        "password":"123456",
		"rol":"Client"
		}
user4 = {
		"id": str(uuid.uuid4()),
		"username":"Dwyane Tyrone Wade, Jr.",
		"email":"Flash@gmail.com",
        "password":"123456",
		"rol":"Client"
		}
user5 = {
		"id": str(uuid.uuid4()),
		"username":"Russell Westbrook III",
		"email":"West@gmail.com",
        "password":"123456",
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

collection = db.productorder

prodord1 = {
		"id": str(uuid.uuid4()),
		"product": prod1,
		"quantity": 5
		}
prodord2 = {
		"id": str(uuid.uuid4()),
		"product": prod3,
		"quantity": 2
		}
prodord3 = {
		"id": str(uuid.uuid4()),
		"product": prod9,
		"quantity": 6
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



collection = db.distributioncenter

dc1 = {
		"id": str(uuid.uuid4()),
		"address": "Calle Valdes Salas, 11, 33007 Oviedo, Asturias",
		"store":{
        	"NiSuPu Monitor": 7,
        	"NiSuPu Laptop": 2
    	}
}
dc2 = {
		"id": str(uuid.uuid4()),
		"address": "Escuela Tecnica Superior de Ingeniería Informatica, Universidad de Sevilla, 41012 Sevilla",
		"store":{
        	"NiSuPu Monitor": 2,
        	"NiSuPu Laptop": 8
    	}
}	
# Insert Data
rec_distcenter_id1=collection.insert_one(dc1)
rec_distcenter_id2=collection.insert_one(dc2)
