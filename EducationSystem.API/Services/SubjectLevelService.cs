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

        public async Task<Level> AddLevel(LevelBindingModel model)
        {
            var exist = _unitOfWork.LevelsRepository.Data.Any(d => d.Name.ToLower() == model.Name.ToLower());

            if (exist)
            {
                return null;
            }

            var level = new Level()
            {
                MinEntryTaskScore = model.MinEntryTaskScore,
                Name = model.Name
            };

            var result = await _unitOfWork.LevelsRepository.AddAsync(level);

            return result;
        }

        public async Task<Subject> AddSubject(SubjectBindingModel model)
        {
            var exist = _unitOfWork.SubjectsRepository.Data.Any(d => d.Name.ToLower() == model.Name.ToLower());

            if (exist)
            {
                return null;
            }

            var subject = new Subject()
            {
                Name = model.Name
            };

            var result = await _unitOfWork.SubjectsRepository.AddAsync(subject);

            return result;
        }

        public Subject EditSubject(SubjectBindingModel model)
        {
            var subject = _unitOfWork.SubjectsRepository.Data.FirstOrDefault(d => d.Id == model.Id);

            if (subject == null)
            {
                return null;
            }

            subject.Name = model.Name;

            var result = _unitOfWork.SubjectsRepository.Update(subject);

            return result;
        }

        public Level EditLevel(LevelBindingModel model)
        {
            var level = _unitOfWork.LevelsRepository.Data.FirstOrDefault(d => d.Id == model.Id);

            if (level == null)
            {
                return null;
            }

            level.Name = model.Name;
            level.MinEntryTaskScore = model.MinEntryTaskScore;

            var result = _unitOfWork.LevelsRepository.Update(level);

            return result;
        }

        public List<SubjectBindingModel> GetSubjects()
        {
            var subjects = _unitOfWork.SubjectsRepository.Data
                .Select(i => new SubjectBindingModel()
                {
                    Id = i.Id,
                    Name = i.Name,

                    SubjectLevels = i.SubjectLevel.Select(sl => new SubjectLevelBindingModel() {
                        EntryTaskId =  sl.EntryTaskId,
                        LevelId = sl.LevelId,
                        SubjectId = sl.SubjectId,
                        LevelName = sl.Level.Name,
                        SubjectName = sl.Level.Name,
                        Price = sl.Price,
                        MinEntryTaskScore = sl.Level.MinEntryTaskScore
                    }).ToList()
                }).ToList();
            return subjects;
        }

        public List<SubjectLevelBindingModel> GetSubjectLevels(int? subjectId = null, int? levelId = null, int? priceMin = null, int? priceMax = null)
        {
            List<Expression<Func<SubjectLevel, bool>>> filterList = new List<Expression<Func<SubjectLevel, bool>>>();
            if (subjectId.HasValue)
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
                    EntryTaskId = i.EntryTaskId
                }).ToList();

            return subjects;
        }

        public SubjectLevel EditSubjectLevel(SubjectLevelBindingModel model)
        {
            var sl = _unitOfWork.SubjectLevelsRepository.Data.FirstOrDefault(d => d.SubjectId == model.SubjectId && d.LevelId == model.LevelId);
            if(sl == null)
            {
                return null;
            }

            sl.Price = model.Price;

            var result = _unitOfWork.SubjectLevelsRepository.Update(sl);

            return result;
        }
    }
}
