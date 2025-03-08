import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";
import { getDateProperty } from "./utils";
import { getStringProperty } from "./utils";
import { Post } from "./types";
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

const AUTH_TOKEN = process.env.NEXT_PUBLIC_NOTION_TOKEN;
export const POST_DB = process.env.NEXT_PUBLIC_NOTION_BLOG_DATABASE_ID;
const NOTION_TOKEN_V2 = process.env.NEXT_PUBLIC_NOTION_TOKEN_V2;
const NOTION_USER_ID = process.env.NEXT_PUBLIC_NOTION_USER_ID;

const NotionApi = new Client({
  auth: AUTH_TOKEN,
});

const PrivateNotionApi = new NotionAPI({
  activeUser: NOTION_USER_ID,
  authToken: NOTION_TOKEN_V2,
});

export async function getPosts(query?: Omit<QueryDatabaseParameters, "database_id">) {
  const response = await NotionApi.databases.query(Object.assign(query ?? {}, { database_id: POST_DB as string }));

  const posts: any[] = [];
  response.results.forEach((item: any) => {
    if (!("properties" in item)) return;
    const post: Post = {
      id: item.id,
      title: getStringProperty(item, "title"),
      slug: getStringProperty(item, "slug"),
      description: getStringProperty(item, "description"),
      published: getDateProperty(item, "published"),
      revised: getDateProperty(item, "revised"),
      category: getStringProperty(item, "category"),
      status: getStringProperty(item, "status"),
    }

    const requiredProperties = ["slug", "title", "category", "status"];
    const isComplete = requiredProperties.every((key) => Boolean(post[key as keyof Post]));

    if (isComplete) {
      posts.push(post);
    }
  });

  return posts;
}

export async function getPost(slug: string) {
  const posts = await (await fetch(`/api/posts`, {
    method: "POST"
  })).json();
  return posts.find((post: Post) => post.slug === slug);
}

export async function getPostContent(id: string) {
  const post = await PrivateNotionApi.getPage(id);
  return post;
}

export { NotionApi, PrivateNotionApi };
