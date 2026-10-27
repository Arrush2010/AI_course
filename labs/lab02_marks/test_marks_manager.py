import unittest
from marks_manager import summary, add_student, validate_marks
class Tests(unittest.TestCase):
    def test_average(self): self.assertEqual(summary({"id":"1","name":"A","marks":[80,70,90]})["average"], 80)
    def test_invalid(self):
        with self.assertRaises(ValueError): validate_marks([101])
    def test_duplicate(self):
        with self.assertRaises(ValueError): add_student([{"id":"1","name":"A","marks":[80]}], "1", "B", [70])
if __name__ == "__main__": unittest.main()
