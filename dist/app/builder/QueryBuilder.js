"use strict";
// QueryBuilder.ts
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    // Constructor declaration
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    // Search by title or content
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search;
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
        var _a, _b;
        const sortBy = (_a = this.query) === null || _a === void 0 ? void 0 : _a.sortBy;
        const sortOrder = (_b = this.query) === null || _b === void 0 ? void 0 : _b.sortOrder;
        if (sortBy) {
            const sortField = sortOrder === 'asc' ? sortBy : `-${sortBy}`;
            this.modelQuery = this.modelQuery.sort(sortField);
        }
        return this;
    }
    // Filter by author ID
    filter() {
        var _a;
        const filterValue = (_a = this.query) === null || _a === void 0 ? void 0 : _a.filter;
        if (filterValue) {
            this.modelQuery = this.modelQuery.find({
                author: filterValue,
            });
        }
        return this;
    }
}
exports.default = QueryBuilder;
