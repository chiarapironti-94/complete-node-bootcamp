import { Document, Query, EnforceDocument } from 'mongoose';

class APIFeatures<T extends Document> {
  public query: Query<
    EnforceDocument<T, Record<string, unknown>>[],
    EnforceDocument<T, Record<string, unknown>>
  >;

  private queryObj: Record<string, unknown>;

  constructor(
    query: Query<
      EnforceDocument<T, Record<string, unknown>>[],
      EnforceDocument<T, Record<string, unknown>>
    >,
    queryObj: Record<string, unknown>
  ) {
    this.query = query;
    this.queryObj = { ...queryObj };
  }

  public filter() {
    const excludedFields = ['sort', 'fields', 'page', 'limit'];
    const queryObjCopy = { ...this.queryObj };
    excludedFields.forEach((field) => delete queryObjCopy[field]);

    let queryStr = JSON.stringify(queryObjCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const filterObj = JSON.parse(queryStr);

    this.query = this.query.find(filterObj);
    return this;
  }

  public sort() {
    if (this.queryObj.sort) {
      const sortBy = (this.queryObj.sort as string).split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  public limitFields() {
    if (this.queryObj.fields) {
      const fields = (this.queryObj.fields as string).split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  public async paginate() {
    const page = Number(this.queryObj.page) || 1;
    const limit = Number(this.queryObj.limit) || 100;
    const skip = (page - 1) * limit;

    const docNumber = await this.query.model.countDocuments();
    if (skip >= docNumber) throw new Error('This page does not exist');

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  public getQuery() {
    return this.query;
  }
}

export default APIFeatures;
