export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      <h1> Hello from the Home Page </h1>
      {posts.nodes.map((post) => {
        return (
          <ul key={post.slug}>
            <li>{post.title}</li>
          </ul>
        );
      })}
    </div>
  );
}

export async function getStaticProps() {
  // run query inside here
  const res = await fetch("http://refurbly.local/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query HomePageQuery {
            posts {
              nodes {
                slug
                title
              }
            }
          }
        `,
    }),
  });

  const json = await res.json();

  return {
    props: {
      posts: json.data.posts,
    },
  };
}
