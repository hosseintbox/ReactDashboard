
import OriginRequestForm from "../../../components/request/OriginRequestForm";
import PageMeta from "../../../components/common/PageMeta";
import FormLayout from "../../../layout/FormLayout";



export default function OriginRequest() {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <FormLayout>
        <OriginRequestForm />
      </FormLayout>
    </>
  );
}
