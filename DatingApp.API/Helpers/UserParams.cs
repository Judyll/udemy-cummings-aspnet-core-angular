namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        private const int _maxPageSize = 50;
        private int _pageSize = 10;

        public int PageNumber { get; set; } = 1;
                
        public int PageSize
        {
            get { return _pageSize; }
            set { _pageSize = (value > _maxPageSize) ? _maxPageSize : value; }
        }

        public int UserId { get; set; }

        public string Gender { get; set; }
    }
}
