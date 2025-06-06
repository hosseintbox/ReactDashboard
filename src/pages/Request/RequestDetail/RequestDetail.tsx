// import React from 'react'

// function RequestDetail() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default RequestDetail

import PageMeta from "../../../components/common/PageMeta";
import FormLayout from "../../../layout/FormLayout";
import NewRequestForm from "../../../components/request/NewRequestForm";

export default function RequestDetail() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <FormLayout>
        <NewRequestForm />
      </FormLayout>
    </>
  );
}
