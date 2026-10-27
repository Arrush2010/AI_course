import tempfile,unittest
from pathlib import Path
from inventory import connect,add_product,order
class Tests(unittest.TestCase):
 def test_order(self):
  with tempfile.TemporaryDirectory() as d:
   c=connect(Path(d)/"x.db");add_product(c,"Book",10,500);order(c,1,3)
   self.assertEqual(c.execute("SELECT stock FROM products").fetchone()[0],7);c.close()
 def test_oversell_rollback(self):
  with tempfile.TemporaryDirectory() as d:
   c=connect(Path(d)/"x.db");add_product(c,"Pen",2,100)
   with self.assertRaises(ValueError):order(c,1,3)
   self.assertEqual(c.execute("SELECT stock FROM products").fetchone()[0],2);c.close()
if __name__=="__main__":unittest.main()
