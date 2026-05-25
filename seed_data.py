import psycopg2
from pymongo import MongoClient
from passlib.context import CryptContext
import json

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

print("Seeding MongoDB (Pets)...")
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client.happypaws
    pets_collection = db.pets
    
    # Drop existing to start fresh
    pets_collection.drop()

    sample_pets = [
        {"name": "Bella", "type": "Dog", "breed": "Golden Retriever", "age": 3, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Dog+Bella"},
        {"name": "Luna", "type": "Cat", "breed": "Maine Coon", "age": 2, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Cat+Luna"},
        {"name": "Charlie", "type": "Dog", "breed": "French Bulldog", "age": 1, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Dog+Charlie"},
        {"name": "Max", "type": "Dog", "breed": "German Shepherd", "age": 4, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Dog+Max"},
        {"name": "Milo", "type": "Cat", "breed": "Siamese", "age": 1, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Cat+Milo"},
        {"name": "Lucy", "type": "Dog", "breed": "Poodle", "age": 5, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Dog+Lucy"},
        {"name": "Leo", "type": "Cat", "breed": "Persian", "age": 3, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Cat+Leo"},
        {"name": "Cooper", "type": "Dog", "breed": "Beagle", "age": 2, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Dog+Cooper"},
        {"name": "Daisy", "type": "Dog", "breed": "Labrador", "age": 4, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Dog+Daisy"},
        {"name": "Chloe", "type": "Cat", "breed": "Ragdoll", "age": 2, "image_url": "https://placehold.co/400x400/b22240/ffffff?text=Cat+Chloe"}
    ]
    pets_collection.insert_many(sample_pets)
    print(f"Successfully inserted {len(sample_pets)} pets into MongoDB.")
except Exception as e:
    print(f"Failed to seed MongoDB: {e}")

print("\\nSeeding PostgreSQL (Users)...")
try:
    conn = psycopg2.connect("postgresql://postgres:postgres@localhost:5432/postgres")
    conn.autocommit = True
    cur = conn.cursor()
    try:
        cur.execute("CREATE DATABASE happypaws_users")
    except psycopg2.errors.DuplicateDatabase:
        pass
    cur.close()
    conn.close()

    conn = psycopg2.connect("postgresql://postgres:postgres@localhost:5432/happypaws_users")
    cur = conn.cursor()
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            hashed_password VARCHAR(255),
            role VARCHAR(50)
        )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            price FLOAT,
            image_url TEXT
        )
    ''')
    
    cur.execute('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    cur.execute('TRUNCATE TABLE products RESTART IDENTITY CASCADE')

    hashed_pw = pwd_context.hash("password123")
    users = [
        ("admin@happypaws.com", hashed_pw, "admin"),
        ("user1@happypaws.com", hashed_pw, "user"),
        ("user2@happypaws.com", hashed_pw, "user"),
        ("user3@happypaws.com", hashed_pw, "user")
    ]
    
    for u in users:
        cur.execute("INSERT INTO users (email, hashed_password, role) VALUES (%s, %s, %s)", u)
        
    products = [
        ("Premium Salmon Kibble", 45.99, "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=400"),
        ("Plush Donut Bed", 34.50, "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400"),
        ("Interactive Laser Toy", 18.99, "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=400"),
        ("Organic Dog Treats", 12.50, "https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&q=80&w=400"),
        ("Cat Tree Tower", 120.00, "https://images.unsplash.com/photo-1545641444-12967f6311ce?auto=format&fit=crop&q=80&w=400"),
        ("Heavy Duty Leash", 25.00, "https://images.unsplash.com/photo-1601646271978-68e16ccda6cc?auto=format&fit=crop&q=80&w=400"),
        ("Stainless Steel Bowl", 15.00, "https://images.unsplash.com/photo-1629571168910-c2a4729f6dd8?auto=format&fit=crop&q=80&w=400"),
        ("Pet Grooming Kit", 40.00, "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=400"),
        ("Automatic Feeder", 85.00, "https://images.unsplash.com/photo-1623348632664-9fb9bc957642?auto=format&fit=crop&q=80&w=400"),
        ("Self-Cleaning Litter Box", 150.00, "https://images.unsplash.com/photo-1596700512803-b67db6f80720?auto=format&fit=crop&q=80&w=400")
    ]
    
    for p in products:
        cur.execute("INSERT INTO products (name, price, image_url) VALUES (%s, %s, %s)", p)
    
    conn.commit()
    cur.close()
    conn.close()
    print("Successfully inserted users and products into PostgreSQL.")
except Exception as e:
    print(f"Failed to seed PostgreSQL: {e}")
