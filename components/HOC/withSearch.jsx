import { TextField } from "@mui/material";
import { rgba } from "polished";
import { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const StyledInputWraper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => rgba(theme.palette.text.primary, 0.23)};
  border-radius: 1rem;
  color: ${({ theme }) => rgba(theme.palette.text.primary, 0.23)};
  padding-right: 4px;
`;

const StyledInput = styled.input`
  all: unset;
  padding: 2px 4px;
  color: ${({ theme }) => theme.palette.text.primary};
  ::placeholder {
    font-size: 14px;
  }
`;

const withSearch = (WrappedComponent) => {
  const WithSearch = ({ searchPlaceholder, ...props }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChangeSearch = (e) => {
      setSearchTerm(e.target.value);
    };

    return (
      <>
        <StyledInputWraper>
          <SearchIcon fontSize="small" />
          <StyledInput
            type="text"
            onChange={handleChangeSearch}
            value={searchTerm}
            placeholder={searchPlaceholder}
          />
        </StyledInputWraper>
        <WrappedComponent {...props} searchTerm={searchTerm} />
      </>
    );
  };
  WithSearch.displayName = `WithSearch(${getDisplayName(WrappedComponent)})`;
  return WithSearch;
};

export default withSearch;

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};
