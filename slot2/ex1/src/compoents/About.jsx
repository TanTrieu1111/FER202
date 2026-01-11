//khai bao 1 doi tuong student gom co id, name, avatar,grade,age
//in ra thong tin cua h1,p và img
function About() {
    const student = {
        id: 'DE190696',
        name: 'Trieu',
        avatar: '/image/wp13792881.webp',
        grade: 'A',
        age: 21
    };
    console.log(student);

    return (
      <div>
        <h1>This is About Student</h1>
        <p>ID: {student.id}</p>
        <p>Name: {student.name}</p>
        <p>Grade: {student.grade}</p>
        <p>Age: {student.age}</p>
        <h3>Avatar:
            <img src={student.avatar} alt="Student Avatar" width="100" height="100" />
        </h3>
      </div>
    );
} export default About;