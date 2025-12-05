using System.Collections.Generic;
using Student_Score_Manager.Models;

namespace Student_Score_Manager.Services
{
    public interface IStudentService
    {
        void AddStudent(Student student);
        List<Student> GetAllStudents();
        List<Student> GetStudentsSortedByAverage();
        Student GetStudentWithHighestAverage();
        List<Student> FindStudentsByAverageScore(double targetScore);
    }
}
