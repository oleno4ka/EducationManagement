using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EducationManagement.Database.Models
{
    public partial class EducationManagementContext : DbContext
    {
        public virtual DbSet<File> File { get; set; }
        public virtual DbSet<FileType> FileType { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<Level> Level { get; set; }
        public virtual DbSet<Student> Student { get; set; }
        public virtual DbSet<StudentGroup> StudentGroup { get; set; }
        public virtual DbSet<StudentTask> StudentTask { get; set; }
        public virtual DbSet<Subject> Subject { get; set; }
        public virtual DbSet<SubjectLevel> SubjectLevel { get; set; }
        public virtual DbSet<SubjectLevelFile> SubjectLevelFile { get; set; }
        public virtual DbSet<Task> Task { get; set; }
        public virtual DbSet<TaskFile> TaskFile { get; set; }
        public virtual DbSet<TaskType> TaskType { get; set; }
        public virtual DbSet<Teacher> Teacher { get; set; }
        public virtual DbSet<TeacherGroup> TeacherGroup { get; set; }
        public virtual DbSet<TeacherSubject> TeacherSubject { get; set; }
        public virtual DbSet<Unit> Unit { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Role> IdentityUserRole { get; set; }

        // Unable to generate entity type for table 'dbo.SubjectLevelFile'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-DC8DPTO;Database=EducationManagementNew;user id=sa;password=12345;Trusted_Connection=True;");
            }
        }

        public EducationManagementContext(DbContextOptions<EducationManagementContext> options)
        : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreationDate).HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Url).IsRequired();

                entity.HasOne(d => d.FileType)
                    .WithMany(p => p.File)
                    .HasForeignKey(d => d.FileTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_File_FileType");
            });

            modelBuilder.Entity<FileType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.StartDate).HasColumnType("date");

                entity.HasOne(d => d.SubjectLevel)
                    .WithMany(p => p.Group)
                    .HasForeignKey(d => new { d.SubjectId, d.LevelId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Group_SubjectLevel");
            });

            modelBuilder.Entity<Level>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);
            });

            modelBuilder.Entity<Student>().HasBaseType<User>();

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<Admin>().HasBaseType<User>();

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<StudentGroup>(entity =>
            {
                entity.HasKey(e => new { e.StudentId, e.GroupId });

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.StudentGroup)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentGroup_Group");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.StudentGroup)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentGroup_Student");
            });

            modelBuilder.Entity<StudentTask>(entity =>
            {
                entity.HasKey(e => new { e.StudentId, e.TaskId });

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.StudentTask)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentTask_Student");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.StudentTask)
                    .HasForeignKey(d => d.TaskId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentTask_Task");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<SubjectLevel>(entity =>
            {
                entity.HasKey(e => new { e.SubjectId, e.LevelId });

                entity.HasOne(d => d.EntryTask)
                    .WithMany(p => p.SubjectLevel)
                    .HasForeignKey(d => d.EntryTaskId)
                    .HasConstraintName("FK_SubjectLevel_Task");

                entity.HasOne(d => d.Level)
                    .WithMany(p => p.SubjectLevel)
                    .HasForeignKey(d => d.LevelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubjectLevel_Level");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.SubjectLevel)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubjectLevel_Subject");
            });

            modelBuilder.Entity<SubjectLevelFile>(entity =>
            {
                entity.HasKey(e => new { e.SubjectId, e.LevelId, e.FileId });

                entity.HasOne(d => d.SubjectLevel)
                    .WithMany(p => p.SubjectLevelFiles)
                    .HasForeignKey(d => new { d.LevelId, d.SubjectId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubjectLevelFile_SubjectLevel");

                entity.HasOne(d => d.File)
                    .WithOne(p => p.SubjectLevelFile)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SubjectLevelFile_File");
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Deadline).HasColumnType("date");

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Duration).HasMaxLength(256);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasOne(d => d.Creator)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.CreatorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Task_Teacher");

                entity.HasOne(d => d.TaskType)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.TaskTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Task_TaskType");

                entity.HasOne(d => d.Unit)
                    .WithMany(p => p.Task)
                    .HasForeignKey(d => d.UnitId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Task_Unit");
            });

            modelBuilder.Entity<TaskFile>(entity =>
            {
                entity.HasKey(e => new { e.TaskId, e.FileId });

                entity.HasOne(d => d.File)
                    .WithMany(p => p.TaskFile)
                    .HasForeignKey(d => d.FileId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TaskFile_File");

                entity.HasOne(d => d.Task)
                    .WithMany(p => p.TaskFile)
                    .HasForeignKey(d => d.TaskId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TaskFile_Task");
            });

            modelBuilder.Entity<TaskType>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);
            });

            modelBuilder.Entity<Teacher>().HasBaseType<User>();

            modelBuilder.Entity<Teacher>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<TeacherGroup>(entity =>
            {
                entity.HasKey(e => new { e.GroupId, e.TeacherId });

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.TeacherGroup)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherGroup_Group");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.TeacherGroup)
                    .HasForeignKey(d => d.TeacherId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherGroup_Teacher");
            });

            modelBuilder.Entity<TeacherSubject>(entity =>
            {
                entity.HasKey(e => new { e.SubjectId, e.TeacherId });

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.TeacherSubject)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherSubject_Subject");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.TeacherSubject)
                    .HasForeignKey(d => d.TeacherId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherSubject_Teacher");
            });

            modelBuilder.Entity<Unit>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.HasOne(d => d.SubjectLevel)
                    .WithMany(p => p.Unit)
                    .HasForeignKey(d => new { d.SubjectId, d.LevelId })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Unit_SubjectLevel_Level");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.DateRegistered).HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.MiddleName).HasMaxLength(256);

                entity.Property(e => e.PhoneNumber).HasMaxLength(256);
            });
        }
    }
}
