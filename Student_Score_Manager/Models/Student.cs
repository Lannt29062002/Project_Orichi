namespace Student_Score_Manager.Models
{
    public class Student
    {
        public string Name { get; set; }
        public ScoreInfo Score { get; set; }

        public Student(string name, ScoreInfo score)
        {
            Name = name;
            Score = score;
        }

        public double GetAverageScore()
        {
            return (Score.Math + Score.Physics + Score.Chemistry) / 3.0;
        }

        public override string ToString()
        {
            return $"Tên: {Name}, Toán: {Score.Math}, Lý: {Score.Physics}, Hóa: {Score.Chemistry}, Trung bình: {GetAverageScore():F2}";
        }
    }

    public class ScoreInfo
    {
        public int Math { get; set; }
        public int Physics { get; set; }
        public int Chemistry { get; set; }

        public ScoreInfo(int math, int physics, int chemistry)
        {
            Math = math;
            Physics = physics;
            Chemistry = chemistry;
        }
    }
}
