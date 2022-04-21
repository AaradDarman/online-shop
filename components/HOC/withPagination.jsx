import { useState } from "react";

import PaginationComponent from "../shared/Pagination";

const withPagination = (WrappedComponent) => {
  const WithPagination = ({
    itemsPerPage,
    totalItems,
    handleChangePage,
    pageRange = 3,
    ...props
  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <>
        <WrappedComponent {...props} />
        <PaginationComponent
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          pageRange={pageRange}
          onChangePage={(page) => {
            setCurrentPage(page);
            handleChangePage(page);
          }}
          // getPageUrl={(n) => `/page/${n}`}
          currPage={currentPage}
        />
      </>
    );
  };
  WithPagination.displayName = `WithPagination(${getDisplayName(
    WrappedComponent
  )})`;
  return WithPagination;
};

export default withPagination;

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
