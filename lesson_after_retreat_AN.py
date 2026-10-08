
##example of if-elseif
value = float(input("Welcome! \nPlease enter your value for evaluation:\n"))
result = "";
if value >= 90:
    result = "Exellent usage!?";
elif value >= 80:
    result = "Very Good man!";
elif value >= 70:
    result = "Only Good man!";
elif value >= 60:
    result = "Only Medium man!";
elif value >= 50:
    result = "Only Passed man!";

print("Result is: ",result)


## example for  for loop
def handle_students_stats(students,grades,subjects):
    for i in range(len(students)):
        student_total= 0 
        for j in range(len(grades)):
            grade = grades[i][j]
            student_total += grade
            student_average = student_total/len(grades)
            print("Student ",students[i]," has ",grade," in subject: ",subjects[j])
        print("\n\n--------------------\nAnd the total is: ",student_total,"\nAnd the Student Average is: ",student_average,"\n\n")


students = ["Ali","Muhammed","Said"]
grades = [[58,45,69],[77,96,74],[77,96,74]]
subjects = ["Math","Coding","Big learning"]

handle_students_stats(students,grades,subjects)