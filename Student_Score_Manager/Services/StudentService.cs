using System.Collections.Generic;
using System.Linq;
using Student_Score_Manager.Models;

namespace Student_Score_Manager.Services
{
    public class StudentService : IStudentService
    {
        private readonly List<Student> _students = new List<Student>();

        public void AddStudent(Student student)
        {
            _students.Add(student);
        }

        public List<Student> GetAllStudents()
        {
            return _students;
        }

        public List<Student> GetStudentsSortedByAverage()
        {
            // Sắp xếp học sinh theo điểm trung bình giảm dần
            return _students.OrderByDescending(s => s.GetAverageScore()).ToList();
        }

        public Student GetStudentWithHighestAverage()
        {
            // Tìm học sinh có điểm trung bình cao nhất
            return _students.OrderByDescending(s => s.GetAverageScore()).FirstOrDefault();
        }
    }
}
