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
            // Tạo bản sao để không thay đổi dữ liệu gốc
            List<Student> sortedStudents = new List<Student>(_students);
            
            // Sắp xếp bằng Bubble Sort
            SortStudents(sortedStudents);
            
            return sortedStudents;
        }

        public Student GetStudentWithHighestAverage()
        {
            // Lấy danh sách đã sắp xếp và trả về phần tử đầu tiên
            var sortedStudents = GetStudentsSortedByAverage();
            return sortedStudents.Count > 0 ? sortedStudents[0] : null;
        }

        /// <summary>
        /// Tìm kiếm học sinh có điểm trung bình bằng một giá trị cụ thể
        /// Sử dụng Binary Search trên mảng đã sắp xếp để tìm nhanh nhất
        /// </summary>
        public List<Student> FindStudentsByAverageScore(double targetScore)
        {
            var sortedStudents = GetStudentsSortedByAverage();
            List<Student> result = new List<Student>();
            
            // Binary Search để tìm vị trí bắt đầu
            int left = BinarySearchLeft(sortedStudents, targetScore);
            
            // Nếu không tìm thấy
            if (left == -1)
            {
                return result;
            }
            
            // Duyệt từ vị trí tìm được đến khi điểm khác
            for (int i = left; i < sortedStudents.Count; i++)
            {
                double avg = System.Math.Round(sortedStudents[i].GetAverageScore(), 2);
                if (avg == System.Math.Round(targetScore, 2))
                {
                    result.Add(sortedStudents[i]);
                }
                else if (avg < System.Math.Round(targetScore, 2))
                {
                    // Vì mảng giảm dần, khi avg < target thì không cần tiếp tục
                    break;
                }
            }
            
            return result;
        }

        /// <summary>
        /// Binary Search để tìm vị trí đầu tiên có điểm bằng targetScore
        /// Trả về index hoặc -1 nếu không tìm thấy
        /// </summary>
        private int BinarySearchLeft(List<Student> students, double targetScore)
        {
            int left = 0;
            int right = students.Count - 1;
            int result = -1;
            
            while (left <= right)
            {
                int mid = left + (right - left) / 2;
                double midAvg = System.Math.Round(students[mid].GetAverageScore(), 2);
                double target = System.Math.Round(targetScore, 2);
                
                if (midAvg == target)
                {
                    result = mid;
                    // Tiếp tục tìm bên trái để lấy vị trí đầu tiên
                    right = mid - 1;
                }
                else if (midAvg > target)
                {
                    // Vì mảng giảm dần, target ở bên phải
                    left = mid + 1;
                }
                else
                {
                    // midAvg < target, target ở bên trái
                    right = mid - 1;
                }
            }
            
            return result;
        }

        /// <summary>
        /// Sắp xếp mảng học sinh theo:
        /// 1. Điểm trung bình các môn giảm dần
        /// 2. Khi điểm bằng nhau, sắp xếp theo tên alphabet tăng dần
        /// Sử dụng Bubble Sort 
        /// </summary>
        private void SortStudents(List<Student> students)
        {
            int n = students.Count;
            
            // Bubble Sort
            for (int i = 0; i < n - 1; i++)
            {
                for (int j = 0; j < n - i - 1; j++)
                {
                    double avgJ = students[j].GetAverageScore();
                    double avgJ1 = students[j + 1].GetAverageScore();
                    
                    bool shouldSwap = false;
                    
                    // So sánh điểm trung bình giảm dần
                    if (avgJ < avgJ1)
                    {
                        // j có điểm thấp hơn j+1, cần hoán đổi để giảm dần
                        shouldSwap = true;
                    }
                    else if (avgJ == avgJ1)
                    {
                        // Nếu điểm bằng nhau, so sánh tên theo alphabet tăng dần
                        if (string.Compare(students[j].Name, students[j + 1].Name) > 0)
                        {
                            shouldSwap = true;
                        }
                    }
                    
                    // Hoán đổi nếu cần
                    if (shouldSwap)
                    {
                        Student temp = students[j];
                        students[j] = students[j + 1];
                        students[j + 1] = temp;
                    }
                }
            }
        }
    }
}
