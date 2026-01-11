// 1. Khai báo danh sách student
const Student = [
  { id: 1, name: 'Alice', age: 20, grade: 'A' },
  { id: 2, name: 'Bob', age: 22, grade: 'B' },
  { id: 3, name: 'Charlie', age: 23, grade: 'C' },
  { id: 4, name: 'David', age: 21, grade: 'B' },
  { id: 5, name: 'Eve', age: 20, grade: 'A' }
];

// 2. Hàm in thông tin 1 student
const printStudent = (student) => {
  console.log(
    `ID: ${student.id}, Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`
  );
};

// 3. Dùng vòng for để in từng student
for (let i = 0; i < Student.length; i++) {
  printStudent(Student[i]);
}

// 4. Dùng rest operator lấy phần còn lại của mảng
const [studentA, studentB, ...restStudents] = Student;

console.log("Student A:", studentA);
console.log("Student B:", studentB);
console.log("Rest of Students:", restStudents);
//them 1 student moi su dung spread operator
const newStudent = { id: 6, name: 'Frank', age: 24, grade: 'C' };
const updatedStudents = [...Student, newStudent];
console.log("Updated Students List:", updatedStudents);
for (let i = 0; i < updatedStudents.length; i++) {
  printStudent(updatedStudents[i]);
}
