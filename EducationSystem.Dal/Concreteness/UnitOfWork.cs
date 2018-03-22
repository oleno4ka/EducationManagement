using EducationManagement.Database.Models;
using EducationSystem.Dal.Abstraction;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace EducationSystem.Dal.Concreteness
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly EducationManagementContext _context;

        public UnitOfWork(EducationManagementContext context, UserManager<User> userManager, SignInManager<User> signInManager
            , RoleManager<Role> roleManager)
        {
            _context = context;
            UserManager = userManager;
            SignInManager = signInManager;
            RoleManager = roleManager;
        }

        private IUsersRepository _usersRepository;

        public IUsersRepository UsersRepository
        {
            get
            {
                if (_usersRepository == null)
                {
                    _usersRepository = new UsersRepository(_context);
                }
                return _usersRepository;
            }
        }

        public UserManager<User> UserManager { get; }

        public RoleManager<Role> RoleManager { get; }

        public SignInManager<User> SignInManager { get; }

        public async Task<int> Save()
        {
            return await _context.SaveChangesAsync();
        }

        // IDisposable
        readonly bool _disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
