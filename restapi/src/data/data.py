# Python code to illustrate
# inserting data in MongoDB
from pymongo import MongoClient
import uuid
import os
from dotenv import load_dotenv

try:
	conn = MongoClient("mongodb://SergioArroni:julio321@localhost:27017/DeDesktop?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
	print("Connected successfully!!!")
except:
	print("Could not connect to MongoDB")

# database
db = conn.DeDesktop

# Created or Switched to collection names: my_gfg_collection
collection = db.product

prod1 = {
		"id": str(uuid.uuid4()),
		"name":"Monitor NiSuPu",
		"description":"It's a bad monitor",
        "price":10,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/HP_l9kqjo.jpg"
		}
prod2 = {
		"id": str(uuid.uuid4()),
		"name":"Monitor HP",
		"description":"It's a good monitor",
        "price":100,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1646938754/samples/ecommerce/NiSiPu_dfue3n.jpg"
		}

# Insert Data
rec_prod_id1 = collection.insert_one(prod1)
rec_prod_id2 = collection.insert_one(prod2)

print("Data inserted with record ids",rec_prod_id1," ",rec_prod_id2)

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

# Insert Data
rec_user_id1 = collection.insert_one(user1)
rec_user_id2 = collection.insert_one(user2)

print("Data inserted with record ids",rec_user_id1," ",rec_user_id2)

# Printing the data inserted
cursor = collection.find()
for record in cursor:
	print(record)
