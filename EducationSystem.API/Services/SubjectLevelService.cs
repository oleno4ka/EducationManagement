using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;
using EducationSystem.Models.BindingModels;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace EducationSystem.Api.Services
{
    public class SubjectLevelService
    {
        private readonly IUnitOfWork _unitOfWork;

        public SubjectLevelService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public List<LevelBindingModel> GetLevels()
        {
            var levels = _unitOfWork.LevelsRepository.Data
                .Select(i => new LevelBindingModel()
                {
                    Id = i.Id,
                    Name = i.Name,
                    MinEntryTaskScore = i.MinEntryTaskScore
                }).ToList();

            return levels;
        }

        public List<SubjectBindingModel> GetSubjects()
        {
            var subjects = _unitOfWork.SubjectsRepository.Data
                .Select(i => new SubjectBindingModel() {
                    Id = i.Id,
                    Name = i.Name
                }).ToList();

            return subjects;
        }

        public List<SubjectLevelBindingModel> GetSubjectLevels(int? subjectId = null, int? levelId = null, int? priceMin = null, int? priceMax = null)
        {
            List<Expression<Func<SubjectLevel, bool>>> filterList = new List<Expression<Func<SubjectLevel, bool>>>();
            if(subjectId.HasValue)
               filterList.Add(l => l.SubjectId == subjectId.Value);
            if (levelId.HasValue)
                filterList.Add(l => l.LevelId == levelId.Value);
            if (priceMin.HasValue)
                filterList.Add(l => l.Price >= priceMin.Value);
            if (priceMax.HasValue)
                filterList.Add(l => l.Price <= priceMax.Value);

            var subjects = _unitOfWork.SubjectLevelsRepository
                .GetAsync(filterList)
                .Select(i => new SubjectLevelBindingModel()
                {
                    SubjectId = i.SubjectId,
                    LevelId = i.LevelId,
                    SubjectName = i.Subject.Name,
                    LevelName = i.Level.Name,
                    EntryTaskIdId = i.EntryTaskId
                }).ToList();

            return subjects;
        }
    }
}
