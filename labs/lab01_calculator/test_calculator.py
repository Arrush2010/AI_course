import unittest
from calculator import calculate
class Tests(unittest.TestCase):
    def test_add(self): self.assertEqual(calculate(12, "+", 8), 20)
    def test_subtract(self): self.assertEqual(calculate(12, "-", 20), -8)
    def test_multiply(self): self.assertEqual(calculate(4, "*", 3), 12)
    def test_divide(self): self.assertEqual(calculate(10, "/", 4), 2.5)
    def test_zero(self):
        with self.assertRaises(ZeroDivisionError): calculate(2, "/", 0)
    def test_bad_op(self):
        with self.assertRaises(ValueError): calculate(1, "%", 2)
if __name__ == "__main__": unittest.main()
