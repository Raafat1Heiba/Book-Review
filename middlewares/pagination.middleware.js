class PaginationMiddleware {
  constructor() {}

  paginate(pageSize) {
    return (req, res, next) => {
      try {
        const pageNumber = +req.query.page || 1;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const data = (req.pagination = {
          page: pageNumber,
          limit: pageSize,
          startIndex,
          endIndex,
        });

        next();
      } catch (e) {
        return res.status(401).send({ message: e.message });
      }
    };
  }
}

module.exports = PaginationMiddleware;
