namespace DatingApp.API.Helpers
{
    /// <summary>
    /// This is a helper class that we can use to pass the PageList<T>
    /// back inside the header response.  We are adding this in the 
    /// header in DatingApp.API.Helpers.Extensions class
    /// </summary>
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }

        public int ItemsPerPage { get; set; }

        public int TotalItems { get; set; }

        public int TotalPages { get; set; }

        public PaginationHeader(int currentPage, int itemsPerPage, 
            int totalItems, int totalPages)
        {
            this.CurrentPage = currentPage;
            this.ItemsPerPage = itemsPerPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
        }
    }
}
