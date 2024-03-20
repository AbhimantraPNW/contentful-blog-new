import { getEntries } from "@/api/getEntries";
import CardBlogs from "./components/CardBlogs";
import { findAsset } from "@/utils/findAsset";

export default async function Home() {
  const blogs = await getEntries();

  return (
    <main className="container mx-auto px-4">
      {/* Jumbotron */}
      <section className="mt-10 space-y-2 text-center">
        <h1 className="text-5xl font-bold ">Coffee Blogs</h1>
        <p className="md:text-xl">blog about coffee and coffeeshops in Jogja</p>
      </section>

      {/* Blog List */}
      <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
        {blogs.items.map((blog, index) => {
          const assetId = blog.fields.thumbnail.sys.id;
          const assets = blogs.includes.Asset;
          const image = findAsset(assetId, assets);

          return (
            <CardBlogs
              key={index}
              title={blog.fields.title}
              author={blog.fields.author}
              category={blog.fields.category}
              createdAt={blog.fields.createdAt}
              description={blog.fields.description}
              imageUrl={`https:${image?.fields.file.url}`}
              slug={blog.fields.slug}
            />
          );
        })}
      </section>
    </main>
  );
}
