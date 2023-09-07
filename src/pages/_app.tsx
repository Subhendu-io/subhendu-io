import Layout from "@/layouts";

import "@/styles/style.css";

function App({ Component, ...props }: any) {
  const excludeLayout = Component.excludeLayout || false;
  return (
    <>
      {excludeLayout ? (
        <Component {...props} />
      ) : (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    </>
  );
}
export default App;
