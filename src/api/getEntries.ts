import { ContentfulResponse } from "@/types/contentful.types";
import { appConfig } from "@/utils/config";

const { accessToken, baseUrl, environtmentId, spaceId } = appConfig;

export const getEntries = async (): Promise<ContentfulResponse> => {
  const res = await fetch(
    baseUrl +
      `/spaces/${spaceId}/environments/${environtmentId}/entries?access_token=${accessToken}`,
    {
      next: { revalidate: 10 },
    },
  );

  return res.json();
};
