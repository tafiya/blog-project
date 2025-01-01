// QueryBuilder.ts

import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  // Properties declaration
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  // Constructor declaration
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search by title or content
  search(searchableFields: string[]) {
    const searchTerm = this.query?.search as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  // Sort by fields with order
  sort() {
    const sortBy = this.query?.sortBy as string;
    const sortOrder = this.query?.sortOrder as string;

    if (sortBy) {
      const sortField = sortOrder === 'asc' ? sortBy : `-${sortBy}`;
      this.modelQuery = this.modelQuery.sort(sortField);
    }

    return this;
  }
  // Filter by author ID
  filter() {
    const filterValue = this.query?.filter as string;

    if (filterValue) {
      this.modelQuery = this.modelQuery.find({
        author: filterValue,
      } as FilterQuery<T>);
    }
    return this;
  }
}

export default QueryBuilder;
