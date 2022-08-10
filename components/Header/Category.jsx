import React from "react";

import Link from "next/link";
import styled from "styled-components";

const StyledItem = styled.li`
  display: flex;
  align-items: flex-start;
  flex-direction: ${({ hasParent }) => hasParent && "column"};
  list-style: none;
  background-color: inherit;
  .subcategories {
    display: flex;
    flex-direction: ${({ hasParent }) => hasParent && "column"};
    background-color: inherit;
    padding: 0 5px;
    height:0;
    opacity: 0;
    z-index: -1;
    transition: 0.3s;
    overflow: hidden;
  }
  &:hover .subcategories {
    opacity: 1;
    z-index: 3 !important;
    height:max-content;
  }
`;

const Category = ({ name, slug, subcategories, parent }) => {
  const hasChildren = subcategories && subcategories.length;
  const hasParent = parent;

  return (
    <StyledItem
      hasParent={!!hasParent}
      className={hasParent === null && "parent"}
    >
      <Link
        href={{
          pathname: "/[category]",
          query: {
            title: name,
          },
        }}
        as={`/${slug}`}
        passHref
      >
        <a>
          <span>{name}</span>
        </a>
      </Link>
      {!!hasChildren && (
        <div className="subcategories">
          {subcategories.map((item) => (
            <Category key={item.name} {...item} />
          ))}
        </div>
      )}
    </StyledItem>
  );
};

export default Category;
