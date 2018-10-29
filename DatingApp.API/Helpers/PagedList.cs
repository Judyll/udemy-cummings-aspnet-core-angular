using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    // We can make this more generic by specifying the PageList as
    // type of 'T' so that we can use it for 'User', or 'Photo',
    // or 'Messages'
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }

        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            TotalCount = count;
            PageSize = pageSize;
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);

            // Add the items to our class
            this.AddRange(items);
        }

        /// <summary>
        /// Creates a new instance of the PageList class
        /// </summary>
        /// <param name="source"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, 
            int pageNumber, int pageSize)
        {
            // We are working out on the total count of the items
            var count = await source.CountAsync();
            // Get the items from the source
            // For example, if we have 13 items and we have a page size of 5 items per page,
            // and we want to request page #2, so we want to skip the first
            // 5 items which are for page #1, start with item #6 and take the 
            // 5 items for page #2
            var items = await source.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
