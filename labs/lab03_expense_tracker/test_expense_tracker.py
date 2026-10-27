import tempfile, unittest
from pathlib import Path
from decimal import Decimal
from expense_tracker import add, monthly_total
class Tests(unittest.TestCase):
    def test_month(self):
        with tempfile.TemporaryDirectory() as d:
            p=Path(d)/"e.csv"; add(p,"2026-10-01","Food","Lunch","250.00"); add(p,"2026-11-01","Food","Dinner","50")
            self.assertEqual(monthly_total(p,"2026-10"),Decimal("250.00"))
    def test_zero_rejected(self):
        with tempfile.TemporaryDirectory() as d:
            with self.assertRaises(ValueError): add(Path(d)/"e.csv","2026-10-01","Food","Lunch","0")
if __name__=="__main__": unittest.main()
