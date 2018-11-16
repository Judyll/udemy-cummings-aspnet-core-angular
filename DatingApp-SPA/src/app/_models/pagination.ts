export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

// Now that we have implemented pagination, we will now store the results
// that we are getting from the GetUsers([FromQuery]UserParams userParams)
// in two parts: we are going to have the user themselves and we gonna have
// the pagination
// But, for this class, we will make it a type of <T> to make it generic
// so that we can use the same class when we will add pagination to messages
// as well.
export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
