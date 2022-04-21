import React from "react";

import styled from "styled-components";
import Pagination from "react-js-pagination";
import useBreakPoints from "../../utils/useBreakPoints";

const Wraper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  & .page {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.palette.secondary.main};
    width: 35px;
    height: 35px;
    padding: 0;
    margin-right: 5px;
    border-radius: 100%;
  }
  & .page:not(.active-page):hover {
    background: ${({ theme }) => theme.palette.secondary.light};
  }
  & .link {
    color: inherit;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .active-page {
    background: ${({ theme }) => theme.palette.primary.main};
  }
  & .link:hover {
    text-decoration: none;
    color: inherit;
  }
`;

const PaginationComponent = ({
  itemsPerPage,
  totalItems,
  pageRange,
  onChangePage,
  getPageUrl,
  currPage,
}) => {
  const recordPerPage = itemsPerPage;
  const totalRecords = totalItems;
  const { isXs, isSm, isMd, active } = useBreakPoints();

  const breakPointCondition = {
    xs: 5,
    sm: 7,
    md: 10,
    lg: 20,
  };

  const handlePageChange = (pageNumber) => {
    onChangePage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (totalRecords <= recordPerPage) {
    return null;
  }

  return (
    <Wraper>
      <Pagination
        prevPageText="قبلی"
        nextPageText="بعدی"
        activePage={currPage}
        itemsCountPerPage={recordPerPage}
        totalItemsCount={totalRecords}
        pageRangeDisplayed={breakPointCondition[active]}
        onChange={handlePageChange}
        getPageUrl={(n) => `/page/${n}`}
        hideDisabled
        itemClass="page"
        linkClass="link"
        itemClassFirst="first-page"
        itemClassLast="last-page"
        itemClassPrev="prev-page"
        itemClassNext="next-page"
        activeClass="active-page"
        disabledClass="disabled-page"
        activeLinkClass="active-page-link"
      />
    </Wraper>
  );
};

export default PaginationComponent;
