import React, { useEffect } from "react";

import { Breadcrumbs, Typography } from "@mui/material";

import Link from "next/link";

const MyBreadCrumbs = ({ breadcrumbs }) => {
  let homeBread = { name: "فروشگاه اینترنتی", slug: "/" };

  const bcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      breadcrumbs.unshift(homeBread);
      return breadcrumbs;
    },
    [breadcrumbs]
  );

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ width: "100%", padding: "10px" }}
    >
      {bcrumbs.map((crumb, idx) => (
        <Crumb
          text={crumb.name}
          href={idx === 0 ? crumb.slug : `/${crumb.slug}`}
          key={crumb.slug}
          last={idx === breadcrumbs.length - 1}
        />
      ))}
    </Breadcrumbs>
  );
};

function Crumb({ text: defaultText, href, last = false }) {
  const [text, setText] = React.useState(defaultText);

  if (last) {
    return <Typography color="text.primary">{text}</Typography>;
  }

  return <Link href={href}>{text}</Link>;
}

export default MyBreadCrumbs;
