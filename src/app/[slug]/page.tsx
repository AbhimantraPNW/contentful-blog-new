import { getEntryBySlug } from "@/api/getEntryBySlug";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";
import { findAsset } from "@/utils/findAsset";
import { notFound } from "next/navigation";
import {documentToReactComponents, Options} from '@contentful/rich-text-react-renderer'
import { BLOCKS } from "@contentful/rich-text-types";

interface BlogDetailProps {
  params: {
    slug: string;
  };
}

const BlogDetail: React.FC<BlogDetailProps> = async ({ params }) => {
  const blog = await getEntryBySlug(params.slug);

  if(!blog.items.length) {
    notFound()
  }

  const assetId = blog.items[0].fields.thumbnail.sys.id;
  const assets = blog.includes.Asset;
  const image = findAsset(assetId, assets);

  const RICHTEXT_OPTIONS: Options = {
    renderNode: {
        [BLOCKS.HEADING_2]: (node, children) => {
            return <h2 className="my-2 md:text-xl font-semibold">{children}</h2>
        },
        [BLOCKS.PARAGRAPH]: (node, children) => {
            return <p className="text-lg font-light">{children}</p>
        },
    }
  }

  console.log(blog);
  return (
    <main className="container mx-auto max-w-6xl px-4">
     {/* Header */}
      <section>
        <Badge variant="outline" className="rounded-sm bg-green-100">
          {blog.items[0].fields.category}
        </Badge>
        <h1 className="my-2 text-lg font-semibold md:text-xl">{blog.items[0].fields.title}</h1>
        <p className="text-sm font-light">
          {format(new Date(blog.items[0].fields.createdAt), "dd MMMM yyyy")} -{" "}
          {blog.items[0].fields.author}
        </p>

        <div className="relative h-[200px] md:h-[400px] w-full">
          <Image
            src={`https:${image?.fields.file.url}`}
            alt="thumbnail"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <section>
        {documentToReactComponents(blog.items[0].fields.content, RICHTEXT_OPTIONS)}
      </section>
    </main>
  );
};

export default BlogDetail;
