import React from "react";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Link from "next/link";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "& .all-icon": {
    transform: "rotate(90deg)",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.secondary.main,
}));

const CategoryDropDown = ({ name, slug, subcategories, parent }) => {
  const hasChildren = subcategories && subcategories.length;

  return (
    <div className="d-flex flex-column">
      {hasChildren ? (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id={slug}>
            <Typography>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="all-icon" />}
              id={slug}
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
                <a className="w-100">
                  <span>همه موارد این دسته</span>
                </a>
              </Link>
            </AccordionSummary>
            {!!hasChildren &&
              subcategories.map((sub) => (
                <CategoryDropDown key={sub.name} {...sub} />
              ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="all-icon" />}
          id={slug}
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
            <a className="w-100">
              <span>{name}</span>
            </a>
          </Link>
        </AccordionSummary>
      )}
    </div>
  );
};

export default CategoryDropDown;
