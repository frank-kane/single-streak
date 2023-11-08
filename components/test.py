def generate_sequence(starting_number, x, num_outcomes=50):
    outcomes = []
    current_number = starting_number
    for _ in range(num_outcomes):
        outcomes.append(current_number)
        current_number = int(current_number* x)
    return outcomes

starting_number = 100  # Replace with your desired starting number
x = 1.05  # Replace with the increment value
num_outcomes = 50  # You can change the number of outcomes if needed

result = generate_sequence(starting_number, x, num_outcomes)
print(result)



