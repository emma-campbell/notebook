"use client";

import { usePost } from "@/hooks/usePost";
import { DateTime } from "luxon";
import { useParams } from "next/navigation";
import { NotionPage } from "@/components/NotionPage";
import { getPageTitle } from "notion-utils";
import { Layout } from "@/components/layout/Layout";

export default function Post() {
    const { id } = useParams<{ id: string }>();
    const { data, error, isError } = usePost(id as string);

    if (!data) {
        return <div>Loading...</div>;
    }

    const title = getPageTitle(data);

    return <Layout>
        <section className="flex flex-col gap-4 items-start w-full pl-4">
            <h1 className="text-4xl font-bold">{title}</h1>
            {data.published && <p className="text-sm text-gray-500">{DateTime.fromISO(data.published as any).toLocaleString(DateTime.DATE_MED)}</p>}
        </section>
        <section className="w-full">
            <NotionPage recordMap={data} />
        </section>
    </Layout>;
}
