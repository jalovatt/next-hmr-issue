
export default () => <h1>Some page</h1>

export const getServerSideProps = (context) => {
  console.dir({
    url: context.req.url,
    query: context.query,
  });

  return { props: {} };
};
