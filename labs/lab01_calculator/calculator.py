def calculate(a, op, b):
    if op == "+": return a + b
    if op == "-": return a - b
    if op == "*": return a * b
    if op == "/":
        if b == 0: raise ZeroDivisionError("Cannot divide by zero.")
        return a / b
    raise ValueError("Use +, -, *, or /.")

def main():
    print("Smart Calculator — enter q to quit")
    while True:
        op = input("Operation (+, -, *, /, q): ").strip().lower()
        if op == "q":
            print("Goodbye!")
            break
        if op not in {"+", "-", "*", "/"}:
            print("Choose +, -, *, / or q.")
            continue
        try:
            a = float(input("First number: "))
            b = float(input("Second number: "))
            print("Result:", calculate(a, op, b))
        except ValueError as exc:
            print("Invalid input:", exc)
        except ZeroDivisionError as exc:
            print("Calculation error:", exc)

if __name__ == "__main__": main()
