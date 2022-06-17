import React from "react";

import MainLayout from "components/layouts/MainLayout";

const signup = () => {
  return <div>signup</div>;
};

signup.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default signup;
