using Student_Score_Manager.Models;
using Student_Score_Manager.Services;

namespace Student_Score_Manager.Tests;

public class StudentServiceTests
{
    private StudentService _studentService;

    public StudentServiceTests()
    {
        _studentService = new StudentService();
    }

    #region AddStudent Tests
    [Fact]
    public void AddStudent_ShouldAddStudentSuccessfully()
    {
        // Arrange
        var student = new Student("Hoang Van E", new ScoreInfo(8, 8, 8));

        // Act
        _studentService.AddStudent(student);
        var students = _studentService.GetAllStudents();

        // Assert
        Assert.Single(students);
        Assert.Equal("Hoang Van E", students[0].Name);
    }

    [Fact]
    public void AddStudent_ShouldAddMultipleStudents()
    {
        // Arrange
        var student1 = new Student("Tran Thi B", new ScoreInfo(9, 9, 9));
        var student2 = new Student("Le Van C", new ScoreInfo(8, 8, 8));
        var student3 = new Student("Pham Thi D", new ScoreInfo(7, 7, 7));

        // Act
        _studentService.AddStudent(student1);
        _studentService.AddStudent(student2);
        _studentService.AddStudent(student3);
        var students = _studentService.GetAllStudents();

        // Assert
        Assert.Equal(3, students.Count);
    }

    [Fact]
    public void AddStudent_ShouldPreserveAdditionOrder()
    {
        // Arrange
        var student1 = new Student("Tran Thi B", new ScoreInfo(9, 9, 9));
        var student2 = new Student("Le Van C", new ScoreInfo(8, 8, 8));

        // Act
        _studentService.AddStudent(student1);
        _studentService.AddStudent(student2);
        var students = _studentService.GetAllStudents();

        // Assert
        Assert.Equal("Tran Thi B", students[0].Name);
        Assert.Equal("Le Van C", students[1].Name);
    }
    #endregion

    #region GetAllStudents Tests
    [Fact]
    public void GetAllStudents_ShouldReturnEmptyListWhenNoStudentsAdded()
    {
        // Act
        var students = _studentService.GetAllStudents();

        // Assert
        Assert.Empty(students);
    }

    [Fact]
    public void GetAllStudents_ShouldReturnAllAddedStudents()
    {
        // Arrange
        var student1 = new Student("Tran Thi B", new ScoreInfo(9, 9, 9));
        var student2 = new Student("Le Van C", new ScoreInfo(8, 8, 8));
        _studentService.AddStudent(student1);
        _studentService.AddStudent(student2);

        // Act
        var students = _studentService.GetAllStudents();

        // Assert
        Assert.Equal(2, students.Count);
        Assert.Contains(student1, students);
        Assert.Contains(student2, students);
    }
    #endregion

    #region GetStudentsSortedByAverage Tests
    [Fact]
    public void GetStudentsSortedByAverage_ShouldSortByAverageScoreDescending()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(7, 7, 7)));   // 7.0
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(9, 9, 9)));     // 9.0
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(8, 8, 8))); // 8.0

        // Act
        var sorted = _studentService.GetStudentsSortedByAverage();

        // Assert
        Assert.Equal(3, sorted.Count);
        Assert.Equal("Le Van C", sorted[0].Name);      // 9.0
        Assert.Equal("Pham Thi D", sorted[1].Name);  // 8.0
        Assert.Equal("Tran Thi B", sorted[2].Name);    // 7.0
    }

    [Fact]
    public void GetStudentsSortedByAverage_WhenScoresEqual_ShouldSortByNameAscending()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi E", new ScoreInfo(8, 8, 8)));    // 8.0
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));  // 8.0
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(8, 8, 8)));    // 8.0

        // Act
        var sorted = _studentService.GetStudentsSortedByAverage();

        // Assert
        Assert.Equal(3, sorted.Count);
        Assert.Equal("Le Van C", sorted[0].Name);
        Assert.Equal("Tran Thi B", sorted[1].Name);
        Assert.Equal("Tran Thi E", sorted[2].Name);
    }

    [Fact]
    public void GetStudentsSortedByAverage_ShouldHandleComplexScenario()
    {
        // Arrange - Mixed scores and names
        _studentService.AddStudent(new Student("Tran Thi E", new ScoreInfo(8, 8, 8)));     // 8.0
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));   // 8.0
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(8, 8, 8)));     // 8.0
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(9, 9, 9))); // 9.0
        _studentService.AddStudent(new Student("Hoang Van E", new ScoreInfo(10, 10, 10))); // 10.0
        _studentService.AddStudent(new Student("Nguyen Van A", new ScoreInfo(7, 7, 7)));      // 7.0

        // Act
        var sorted = _studentService.GetStudentsSortedByAverage();

        // Assert
        Assert.Equal(6, sorted.Count);
        Assert.Equal("Hoang Van E", sorted[0].Name);    // 10.0
        Assert.Equal("Pham Thi D", sorted[1].Name);  // 9.0
        Assert.Equal("Le Van C", sorted[2].Name);    // 8.0 (first alphabetically)
        Assert.Equal("Tran Thi B", sorted[3].Name);      // 8.0
        Assert.Equal("Tran Thi E", sorted[4].Name);      // 8.0
        Assert.Equal("Nguyen Van A", sorted[5].Name);      // 7.0
    }

    [Fact]
    public void GetStudentsSortedByAverage_ShouldNotModifyOriginalList()
    {
        // Arrange
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(8, 8, 8)));
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(9, 9, 9)));
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(7, 7, 7)));

        // Act
        var sorted = _studentService.GetStudentsSortedByAverage();
        var original = _studentService.GetAllStudents();

        // Assert - Original order should be preserved
        Assert.Equal("Pham Thi D", original[0].Name);
        Assert.Equal("Tran Thi B", original[1].Name);
        Assert.Equal("Le Van C", original[2].Name);

        // Sorted order should be different
        Assert.Equal("Tran Thi B", sorted[0].Name);
        Assert.Equal("Pham Thi D", sorted[1].Name);
        Assert.Equal("Le Van C", sorted[2].Name);
    }
    #endregion

    #region GetStudentWithHighestAverage Tests
    [Fact]
    public void GetStudentWithHighestAverage_ShouldReturnStudentWithHighestScore()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(7, 7, 7)));
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(10, 10, 10)));
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(8, 8, 8)));

        // Act
        var highest = _studentService.GetStudentWithHighestAverage();

        // Assert
        Assert.NotNull(highest);
        Assert.Equal("Le Van C", highest.Name);
        Assert.Equal(10.0, highest.GetAverageScore());
    }

    [Fact]
    public void GetStudentWithHighestAverage_ShouldReturnNullWhenNoStudents()
    {
        // Act
        var highest = _studentService.GetStudentWithHighestAverage();

        // Assert
        Assert.Null(highest);
    }

    [Fact]
    public void GetStudentWithHighestAverage_WithSingleStudent()
    {
        // Arrange
        var student = new Student("Tran Thi B", new ScoreInfo(9, 9, 9));
        _studentService.AddStudent(student);

        // Act
        var highest = _studentService.GetStudentWithHighestAverage();

        // Assert
        Assert.NotNull(highest);
        Assert.Equal("Tran Thi B", highest.Name);
    }
    #endregion

    #region FindStudentsByAverageScore Tests
    [Fact]
    public void FindStudentsByAverageScore_ShouldFindStudentsWithExactScore()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(9, 9, 9)));
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(8, 8, 8)));

        // Act
        var found = _studentService.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Equal(2, found.Count);
        Assert.Contains(found, s => s.Name == "Tran Thi B");
        Assert.Contains(found, s => s.Name == "Pham Thi D");
    }

    [Fact]
    public void FindStudentsByAverageScore_ShouldReturnEmptyWhenNoMatch()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(9, 9, 9)));

        // Act
        var found = _studentService.FindStudentsByAverageScore(10.0);

        // Assert
        Assert.Empty(found);
    }

    [Fact]
    public void FindStudentsByAverageScore_ShouldHandleMultipleStudentsWithSameScore()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi E", new ScoreInfo(8, 8, 8)));
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(8, 8, 8)));
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(9, 9, 9)));

        // Act
        var found = _studentService.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Equal(3, found.Count);
        Assert.Equal("Le Van C", found[0].Name);  // Sorted alphabetically
        Assert.Equal("Tran Thi B", found[1].Name);
        Assert.Equal("Tran Thi E", found[2].Name);
    }

    [Fact]
    public void FindStudentsByAverageScore_ShouldReturnNullWhenEmptyList()
    {
        // Act
        var found = _studentService.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Empty(found);
    }

    [Fact]
    public void FindStudentsByAverageScore_ShouldFindWithDecimalScores()
    {
        // Arrange
        _studentService.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 9)));   // 8.33
        _studentService.AddStudent(new Student("Le Van C", new ScoreInfo(7, 8, 9)));     // 8.0
        _studentService.AddStudent(new Student("Pham Thi D", new ScoreInfo(8, 8, 8))); // 8.0

        // Act
        var found = _studentService.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Equal(2, found.Count);
        Assert.Contains(found, s => s.Name == "Le Van C");
        Assert.Contains(found, s => s.Name == "Pham Thi D");
    }
    #endregion
}
