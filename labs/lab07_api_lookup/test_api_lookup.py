import unittest
from api_lookup import validate
class Tests(unittest.TestCase):
 def test_ok(self):self.assertIn("result",validate({"result":{"ok":True}}))
 def test_bad(self):
  with self.assertRaises(ValueError):validate([])
if __name__=="__main__":unittest.main()
