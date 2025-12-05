using Student_Score_Manager.Models;
using Student_Score_Manager.Services;

namespace Student_Score_Manager.Tests;

/// <summary>
/// Integration tests that test the complete workflow of the StudentService
/// </summary>
public class StudentServiceIntegrationTests
{
    [Fact]
    public void CompleteWorkflow_ShouldHandleMultipleOperationsCorrectly()
    {
        // Arrange
        var service = new StudentService();
        service.AddStudent(new Student("Nguyen Van A", new ScoreInfo(8, 8, 8)));
        service.AddStudent(new Student("Tran Thi B", new ScoreInfo(8, 8, 8)));
        service.AddStudent(new Student("Le Van C", new ScoreInfo(8, 8, 8)));
        service.AddStudent(new Student("Pham Thi D", new ScoreInfo(9, 9, 9)));
        service.AddStudent(new Student("Hoang Van E", new ScoreInfo(10, 10, 10)));
        service.AddStudent(new Student("Tran Thi E", new ScoreInfo(7, 7, 7)));

        // Act - Get sorted list
        var sorted = service.GetStudentsSortedByAverage();

        // Assert - Check sorting order
        Assert.Equal(6, sorted.Count);
        Assert.Equal("Hoang Van E", sorted[0].Name);    // 10.0
        Assert.Equal("Pham Thi D", sorted[1].Name);  // 9.0
        Assert.Equal("Le Van C", sorted[2].Name);    // 8.0 (alphabetically first among ties)
        Assert.Equal("Nguyen Van A", sorted[3].Name);      // 8.0
        Assert.Equal("Tran Thi B", sorted[4].Name);      // 8.0
        Assert.Equal("Tran Thi E", sorted[5].Name);      // 7.0
    }

    [Fact]
    public void CompleteWorkflow_ShouldFindStudentsAfterSorting()
    {
        // Arrange
        var service = new StudentService();
        service.AddStudent(new Student("Tran Thi B", new ScoreInfo(9, 8, 8)));   // 8.33
        service.AddStudent(new Student("Le Van C", new ScoreInfo(8, 8, 8)));     // 8.0
        service.AddStudent(new Student("Pham Thi D", new ScoreInfo(10, 10, 10))); // 10.0

        // Act - Get highest scorer
        var highest = service.GetStudentWithHighestAverage();

        // Assert
        Assert.NotNull(highest);
        Assert.Equal("Pham Thi D", highest.Name);
        Assert.Equal(10.0, highest.GetAverageScore());

        // Act - Find students with score 8.0
        var findResult = service.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Single(findResult);
        Assert.Equal("Le Van C", findResult[0].Name);
    }

    [Fact]
    public void CompleteWorkflow_RealWorldScenario()
    {
        // Arrange - Simulate a classroom of students
        var service = new StudentService();
        
        // Add students with various scores
        service.AddStudent(new Student("Nguyen Van A", new ScoreInfo(9, 8, 9)));    // 8.67
        service.AddStudent(new Student("Tran Thi B", new ScoreInfo(10, 10, 9)));    // 9.67
        service.AddStudent(new Student("Le Van C", new ScoreInfo(7, 8, 7)));        // 7.33
        service.AddStudent(new Student("Pham Thi D", new ScoreInfo(9, 9, 9)));      // 9.0
        service.AddStudent(new Student("Hoang Van E", new ScoreInfo(6, 7, 8)));     // 7.0

        // Act - Get all students originally added
        var allStudents = service.GetAllStudents();

        // Assert - Should have 5 students in original order
        Assert.Equal(5, allStudents.Count);
        Assert.Equal("Nguyen Van A", allStudents[0].Name);
        Assert.Equal("Tran Thi B", allStudents[1].Name);

        // Act - Get sorted students (shouldn't affect original)
        var sorted = service.GetStudentsSortedByAverage();

        // Assert - Should be sorted by average descending
        Assert.Equal(5, sorted.Count);
        Assert.Equal("Tran Thi B", sorted[0].Name);   // 9.67
        Assert.Equal("Pham Thi D", sorted[1].Name);   // 9.0
        Assert.Equal("Nguyen Van A", sorted[2].Name); // 8.67
        Assert.Equal("Le Van C", sorted[3].Name);     // 7.33
        Assert.Equal("Hoang Van E", sorted[4].Name);  // 7.0

        // Act - Get highest scorer
        var topStudent = service.GetStudentWithHighestAverage();

        // Assert
        Assert.Equal("Tran Thi B", topStudent.Name);

        // Act - Find students with average around 7-8
        var mediumScorers = service.FindStudentsByAverageScore(7.33);

        // Assert
        Assert.Single(mediumScorers);
        Assert.Equal("Le Van C", mediumScorers[0].Name);
    }

    [Fact]
    public void BinarySearchPerformance_ShouldFindCorrectlyInLargeList()
    {
        // Arrange - Create a service with many students
        var service = new StudentService();
        
        // Add 20 students with various scores
        for (int i = 1; i <= 10; i++)
        {
            service.AddStudent(new Student($"StudentA{i}", new ScoreInfo(9, 9, 9)));  // 9.0
            service.AddStudent(new Student($"StudentB{i}", new ScoreInfo(5, 5, 5)));  // 5.0
        }

        // Act - Find students with 9.0
        var highScorers = service.FindStudentsByAverageScore(9.0);

        // Assert
        Assert.Equal(10, highScorers.Count);
        foreach (var student in highScorers)
        {
            Assert.StartsWith("StudentA", student.Name);
        }

        // Act - Find students with 5.0
        var lowScorers = service.FindStudentsByAverageScore(5.0);

        // Assert
        Assert.Equal(10, lowScorers.Count);
        foreach (var student in lowScorers)
        {
            Assert.StartsWith("StudentB", student.Name);
        }
    }

    [Fact]
    public void OriginalListIntegrity_ShouldNotBeModifiedByOperations()
    {
        // Arrange
        var service = new StudentService();
        var charlie = new Student("Pham Thi D", new ScoreInfo(8, 8, 8));
        var alice = new Student("Tran Thi B", new ScoreInfo(9, 9, 9));
        var bob = new Student("Le Van C", new ScoreInfo(7, 7, 7));

        service.AddStudent(charlie);
        service.AddStudent(alice);
        service.AddStudent(bob);

        var originalOrder = service.GetAllStudents();
        var originalNames = new[] { "Pham Thi D", "Tran Thi B", "Le Van C" };

        // Act - Perform multiple operations
        var sorted = service.GetStudentsSortedByAverage();
        var highest = service.GetStudentWithHighestAverage();
        var found = service.FindStudentsByAverageScore(8.0);
        var allAgain = service.GetAllStudents();

        // Assert - Original list should remain unchanged
        Assert.Equal(3, allAgain.Count);
        for (int i = 0; i < originalNames.Length; i++)
        {
            Assert.Equal(originalNames[i], allAgain[i].Name);
        }
    }

    [Fact]
    public void EdgeCase_ShouldHandleStudentsWithIdenticalScoresAndNames()
    {
        // Arrange
        var service = new StudentService();
        service.AddStudent(new Student("Nguyen Van A", new ScoreInfo(8, 8, 8)));
        service.AddStudent(new Student("Nguyen Van A", new ScoreInfo(8, 8, 8)));
        service.AddStudent(new Student("Nguyen Van A", new ScoreInfo(8, 8, 8)));

        // Act
        var sorted = service.GetStudentsSortedByAverage();
        var found = service.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Equal(3, sorted.Count);
        Assert.Equal(3, found.Count);
        Assert.All(sorted, s => Assert.Equal("Nguyen Van A", s.Name));
        Assert.All(found, s => Assert.Equal("Nguyen Van A", s.Name));
    }

    [Fact]
    public void EdgeCase_ShouldHandleSingleStudent()
    {
        // Arrange
        var service = new StudentService();
        var onlyStudent = new Student("Hoang Van E", new ScoreInfo(7, 8, 9));

        service.AddStudent(onlyStudent);

        // Act
        var all = service.GetAllStudents();
        var sorted = service.GetStudentsSortedByAverage();
        var highest = service.GetStudentWithHighestAverage();
        var found = service.FindStudentsByAverageScore(8.0);

        // Assert
        Assert.Single(all);
        Assert.Single(sorted);
        Assert.NotNull(highest);
        Assert.Equal("Hoang Van E", highest.Name);
        Assert.Single(found);
    }
}
