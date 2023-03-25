import { useParams } from "react-router-dom";

interface AccountPageProps {}

const AccountPage: React.FunctionComponent<AccountPageProps> = () => {
  const { id } = useParams();

  return <>Account page: {id}</>;
};

export default AccountPage;
