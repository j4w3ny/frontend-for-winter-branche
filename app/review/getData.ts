type DataDTO =
  | {
      id: string;
      data: {
        takeout:
          | {
              topic: {
                categoryName: string;
                watchTimes1: number;
              }[];
              category_duration_detail: {
                categoryName: string;
                watchTime_min: number;
              }[];
              channel: {
                channelTitle: string;
                watchTimes2: number;
                channelLink: string;
              }[];
              lang: {
                language: string;
                lanCounts: number;
              }[];
              top5: {
                watch_time_rank: string;
                video_id: string;
                video_link: string;
                watch_times: number;
                video_title: string;
              }[];
              stat: {
                watched: {
                  '0': number;
                };
                searches: {
                  '0': number;
                };
                likes: {
                  '0': number;
                };
                comments: {
                  '0': number;
                };
                active_total_day: {
                  '0': number;
                };
                uptime: {
                  '0': string;
                };
                video_watched_per_day: {
                  '0': string;
                };
              };
              year_detail: {
                video_title: string | null;

                video_id: string | null;
                video_link: string | null;
                channel_link: string | null;

                channel_title: string | null;
                watch_time: string | null;
                searches: string | null;
                searches_link: string | null;
                search_time: string | null;
                liked_video_id: string | null;
                liked_video_link: string | null;
                liked_time: string | null;
                comments: string | null;
                comment_time: string | null;
              }[];
            }
          | undefined;
        ready: boolean;
      };
    }
  | { error: string };
export async function getData(uuid: string): Promise<DataDTO> {
  const server = process.env.SERVER_ADDR;

  const res = await fetch(`${server}/data/?id=${uuid}`);
  if (!res.ok) {
    return { error: 'Server Error' };
  }
  return res.json();
}
