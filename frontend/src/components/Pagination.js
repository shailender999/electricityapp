import _ from "lodash";

const Pagination = (props) => {
  const { pageSize, itemsCount, onPageChange, currentPage } = props;
  const pageCount = itemsCount / pageSize;
  const pages = _.range(1, Math.ceil(pageCount) + 1);

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={
                currentPage === page ? "page-item active" : "page-item"
              }
            >
              <a
                onClick={() => onPageChange(page)}
                href="#"
                className="page-link"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
