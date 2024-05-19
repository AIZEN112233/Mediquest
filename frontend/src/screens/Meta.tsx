import { Helmet } from "react-helmet-async";

type MetaProps = {
  title: string;
  description: string;
  keywords?: string;
};

const Meta = ({ title, description, keywords }: MetaProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To E-Shop",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electroincs",
};

export default Meta;