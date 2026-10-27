import sqlite3
from pathlib import Path
DB=Path(__file__).with_name("inventory.db")
def connect(path=DB):
 c=sqlite3.connect(path);c.execute("PRAGMA foreign_keys=ON")
 c.executescript("CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT UNIQUE NOT NULL,stock INTEGER NOT NULL CHECK(stock>=0),price_cents INTEGER NOT NULL CHECK(price_cents>=0));CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY,product_id INTEGER NOT NULL REFERENCES products(id),quantity INTEGER NOT NULL CHECK(quantity>0),total_cents INTEGER NOT NULL);")
 return c
def add_product(c,name,stock,price_cents):
 if not name.strip() or stock<0 or price_cents<0:raise ValueError("Name required; stock and price must be nonnegative.")
 c.execute("INSERT INTO products(name,stock,price_cents) VALUES(?,?,?)",(name.strip(),stock,price_cents));c.commit()
def order(c,pid,qty):
 if qty<=0:raise ValueError("Quantity must be positive.")
 try:
  c.execute("BEGIN IMMEDIATE");r=c.execute("SELECT stock,price_cents FROM products WHERE id=?",(pid,)).fetchone()
  if r is None:raise ValueError("Product not found.")
  stock,price=r
  if stock<qty:raise ValueError("Insufficient stock.")
  c.execute("UPDATE products SET stock=stock-? WHERE id=?",(qty,pid))
  cur=c.execute("INSERT INTO orders(product_id,quantity,total_cents) VALUES(?,?,?)",(pid,qty,qty*price));c.commit();return cur.lastrowid
 except Exception:c.rollback();raise
def main():
 c=connect();print("1 Add product  2 List  3 Order  4 Quit");choice=input("Choose: ").strip()
 try:
  if choice=="1":add_product(c,input("Name: "),int(input("Stock: ")),int(input("Price in cents: ")));print("Added.")
  elif choice=="2":print(c.execute("SELECT * FROM products").fetchall())
  elif choice=="3":print("Order ID:",order(c,int(input("Product ID: ")),int(input("Quantity: "))))
  else:print("Goodbye.")
 except (ValueError,sqlite3.IntegrityError) as e:print("Operation failed:",e)
 finally:c.close()
if __name__=="__main__":main()
