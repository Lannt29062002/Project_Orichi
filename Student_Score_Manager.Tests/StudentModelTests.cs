using Student_Score_Manager.Models;

namespace Student_Score_Manager.Tests;

public class StudentModelTests
{
    #region Student Constructor Tests
    [Fact]
    public void Student_Constructor_ShouldSetNameAndScore()
    {
        // Arrange
        var scoreInfo = new ScoreInfo(8, 9, 7);

        // Act
        var student = new Student("Tran Thi B", scoreInfo);

        // Assert
        Assert.Equal("Tran Thi B", student.Name);
        Assert.Equal(scoreInfo, student.Score);
    }
    #endregion

    #region GetAverageScore Tests
    [Fact]
    public void GetAverageScore_ShouldCalculateCorrectAverage()
    {
        // Arrange
        var student = new Student("Tran Thi B", new ScoreInfo(9, 8, 7));

        // Act
        var average = student.GetAverageScore();

        // Assert
        Assert.Equal(8.0, average);
    }

    [Fact]
    public void GetAverageScore_ShouldHandleEqualScores()
    {
        // Arrange
        var student = new Student("Le Van C", new ScoreInfo(8, 8, 8));

        // Act
        var average = student.GetAverageScore();

        // Assert
        Assert.Equal(8.0, average);
    }

    [Fact]
    public void GetAverageScore_ShouldHandleDecimalAverages()
    {
        // Arrange
        var student = new Student("Pham Thi D", new ScoreInfo(8, 8, 9));

        // Act
        var average = student.GetAverageScore();

        // Assert
        Assert.Equal(8.333333333333334, average, precision: 10);
    }

    [Fact]
    public void GetAverageScore_ShouldHandleMaxScores()
    {
        // Arrange
        var student = new Student("Hoang Van E", new ScoreInfo(10, 10, 10));

        // Act
        var average = student.GetAverageScore();

        // Assert
        Assert.Equal(10.0, average);
    }

    [Fact]
    public void GetAverageScore_ShouldHandleMinScores()
    {
        // Arrange
        var student = new Student("Tran Thi E", new ScoreInfo(0, 0, 0));

        // Act
        var average = student.GetAverageScore();

        // Assert
        Assert.Equal(0.0, average);
    }

    [Fact]
    public void GetAverageScore_ShouldHandleMixedScores()
    {
        // Arrange
        var student = new Student("Frank", new ScoreInfo(10, 5, 0));

        // Act
        var average = student.GetAverageScore();

        // Assert
        Assert.Equal(5.0, average);
    }
    #endregion

    #region ToString Tests
    [Fact]
    public void ToString_ShouldFormatStudentInfoCorrectly()
    {
        // Arrange
        var student = new Student("Tran Thi B", new ScoreInfo(8, 9, 7));

        // Act
        var result = student.ToString();

        // Assert
        Assert.Contains("Tran Thi B", result);
        Assert.Contains("8", result);
        Assert.Contains("9", result);
        Assert.Contains("7", result);
        Assert.Contains("8.00", result); // Average formatted to 2 decimal places
    }

    [Fact]
    public void ToString_ShouldIncludeAllScoresAndAverage()
    {
        // Arrange
        var student = new Student("Le Van C", new ScoreInfo(9, 8, 10));

        // Act
        var result = student.ToString();

        // Assert
        Assert.Matches(@"Tên:\s+Le Van C", result);
        Assert.Matches(@"Toán:\s+9", result);
        Assert.Matches(@"Lý:\s+8", result);
        Assert.Matches(@"Hóa:\s+10", result);
        Assert.Matches(@"Trung bình:\s+9\.00", result);
    }
    #endregion
}

public class ScoreInfoTests
{
    #region ScoreInfo Constructor Tests
    [Fact]
    public void ScoreInfo_Constructor_ShouldSetAllScores()
    {
        // Arrange & Act
        var scoreInfo = new ScoreInfo(8, 9, 7);

        // Assert
        Assert.Equal(8, scoreInfo.Math);
        Assert.Equal(9, scoreInfo.Physics);
        Assert.Equal(7, scoreInfo.Chemistry);
    }

    [Fact]
    public void ScoreInfo_Constructor_ShouldHandleEqualScores()
    {
        // Arrange & Act
        var scoreInfo = new ScoreInfo(8, 8, 8);

        // Assert
        Assert.Equal(8, scoreInfo.Math);
        Assert.Equal(8, scoreInfo.Physics);
        Assert.Equal(8, scoreInfo.Chemistry);
    }

    [Fact]
    public void ScoreInfo_Constructor_ShouldHandleMaxScores()
    {
        // Arrange & Act
        var scoreInfo = new ScoreInfo(10, 10, 10);

        // Assert
        Assert.Equal(10, scoreInfo.Math);
        Assert.Equal(10, scoreInfo.Physics);
        Assert.Equal(10, scoreInfo.Chemistry);
    }

    [Fact]
    public void ScoreInfo_Constructor_ShouldHandleMinScores()
    {
        // Arrange & Act
        var scoreInfo = new ScoreInfo(0, 0, 0);

        // Assert
        Assert.Equal(0, scoreInfo.Math);
        Assert.Equal(0, scoreInfo.Physics);
        Assert.Equal(0, scoreInfo.Chemistry);
    }
    #endregion
}
