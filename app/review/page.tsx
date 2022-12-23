import React, { Suspense } from 'react';
import { Audiowide, Poppins } from '@next/font/google';
import { numeral } from './client';
import { format } from 'date-fns';
import { decode } from 'html-entities';
import {
  CardBase,
  Second,
  Third,
  Fourth,
  Sixth,
  TopRecordData,
  SixthData,
  WordData,
} from './cards';
import { getData } from './getData';
import { NextPage } from 'next';
const audioWide = Audiowide({ weight: '400', subsets: ['latin'] });
const poppins = Poppins({
  weight: ['400', '600', '500', '700'],
  subsets: ['latin'],
});

function Header() {
  return (
    <div className={audioWide.className + ' pl-9 header-bg header-bg-m '}>
      <div className='pt-12 pb-6'>Youtube LOGO</div>
      <h1 className='text-6xl text-gray-900 uppercase pb-6'>2022 Review</h1>
    </div>
  );
}

function TwoCardsGrid(props: React.PropsWithChildren<{}>) {
  return (
    <div className='inline-grid grid-flow-row gap-4 sm:grid-cols-2 items-center sm:justify-start px-3'>
      {props.children}
    </div>
  );
}
function ThreeCardsGrid(props: React.PropsWithChildren<{}>) {
  return (
    <div className='inline-grid grid-flow-row gap-4 sm:grid-cols-3 items-center sm:justify-start px-3'>
      {props.children}
    </div>
  );
}
interface FirstProps {
  name?: string;
  search?: number;
  likes?: number;
  comments?: number;

  totalHours: number;
  videoCounts: number;
  timePercents: number;
  favoriteCategory: string;
  favoriteVideo: string;
}
function First(props: React.PropsWithChildren<FirstProps>) {
  const format = Intl.NumberFormat('en', { notation: 'compact' }).format;
  return (
    <>
      <div className='inline-flex flex-col space-y-12 items-start justify-between p-4 sm:p-5 sm:bg-white rounded-2xl'>
        <div className='inline-flex items-center justify-between w-full'>
          <div className='inline-flex flex-col space-y-2 items-start justify-start'>
            <p className='opacity-50 text-xs font-medium text-gray-900 uppercase'>
              Hello{' '}
            </p>
            <p className='text-3xl font-bold text-gray-900 uppercase'>
              {props.name ?? 'Chong'}!
            </p>
          </div>
          <img
            className='w-16 h-16 rounded-2xl'
            src='https://via.placeholder.com/60x60'
          />
        </div>
        <div className='inline-flex w-full space-x-16 items-start justify-between'>
          <div className='inline-flex flex-col space-y-0.5 items-start justify-start w-16'>
            <p className='text-3xl font-bold text-gray-900 uppercase'>
              {props.search ?? 0 < 10000
                ? props.search ?? 0
                : numeral(props.search).format('0a')}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Searches</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-center justify-start w-16'>
            <p className='text-3xl font-bold text-gray-900 uppercase'>
              {props.likes ?? 0 < 10000
                ? props.likes ?? 0
                : numeral(props.likes).format('0a')}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Likes</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-end justify-start w-16'>
            <p className='text-3xl font-bold text-right text-gray-900 uppercase'>
              {props.comments ?? 0 < 10000
                ? props.comments ?? 0
                : numeral(props.comments).format('0a')}
            </p>
            <p className='opacity-50 text-xs text-right text-gray-900'>
              Comments
            </p>
          </div>
        </div>
      </div>
      <div className='inline-flex flex-col  space-y-5 h-full items-start justify-center px-6 py-5 bg-white rounded-2xl'>
        <p className='text-base leading-snug text-gray-900'>
          This year... 🧐
          <br />
          You Spent <strong>{format(props.totalHours)} hours</strong> and
          watched <strong>{format(props.videoCounts)} videos</strong> in the
          total of 217 days.
        </p>
        <p
          className='text-base leading-snug text-gray-900'
          // style={{ width: 894 }}
        >
          Spending <strong>{format(props.timePercents)}%</strong> of your time
          on <strong>{props.favoriteCategory}</strong>
          <br />
          related videos & Your Favourite Video is <br />
          <strong>{decode(props.favoriteVideo)}</strong>
        </p>
      </div>
    </>
  );
}

function Footer() {
  return (
    <div
      className={`${audioWide.className} font-normal m-auto text-3xl text-center self-center`}
    >
      {'See you next year!'}
    </div>
  );
}

// async function getData() {
//   // const res = await fetch(process.env.SERVER_ADDR!);
//   // if (!res.ok) {
//   //   // This will activate the closest `error.js` Error Boundary
//   //   throw new Error('Failed to fetch data');
//   // }
//   // return res.json();
//   return
// }
export default async function ReviewPage({
  searchParams,
}: {
  searchParams?: URLSearchParams;
}) {
  if (!searchParams) return;

  const param = new URLSearchParams(searchParams);
  const id = param.get('id');
  if (!id) return;
  const dto = (await getData(id)).data;
  if (!dto.ready) return;
  const data = dto.takeout;
  if (!data) return;
  const totalHours =
    data.category_duration_detail.reduce((a, b) => a + b.watchTime_min, 0) / 60;

  const watchTimeMins = data.category_duration_detail;

  const watchTimeMost = watchTimeMins.find(
    (value) =>
      value.watchTime_min ===
      Math.max(
        ...data.category_duration_detail.map((value) => value.watchTime_min)
      )
  )!;
  const categoryNameOfMost = data.category_duration_detail.find(
    (value) => value.categoryName === watchTimeMost.categoryName
  )!;

  const videoRecord: TopRecordData[] = data.top5.map((item) => {
    return { name: decode(item.video_title), counts: item.watch_times };
  });
  const channelsRecord: TopRecordData[] = data.channel.map((item) => {
    return {
      name: decode(item.channelTitle),
      counts: item.watchTimes2,
    };
  });
  const topicRecords: TopRecordData[] = data.topic.map((item) => {
    return {
      name: item.categoryName,
      counts: item.watchTimes1,
    };
  });

  const languagePieData: SixthData[] = data.lang.map((item) => {
    return {
      name: item.language,
      value: item.lanCounts,
    };
  });

  const durationPieData: SixthData[] = data.category_duration_detail.map(
    (item) => {
      return {
        name: item.categoryName,
        value: item.watchTime_min,
      };
    }
  );

  const heatmapData = Object.entries(
    data.year_detail
      .filter((item) => item.watch_time)
      .map((item) => format(new Date(item.watch_time!), 'yyyy-MM-dd'))
      .reduce((acc, curr) => {
        if (acc[curr]) {
          acc[curr] += 1;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }, {} as Record<string, number>)
  );
  function wordFreq(text: string): WordData[] {
    const words: string[] = text
      .replace(/\./g, '')
      .replace(/\W/g, ' ')
      .split(/\s/);
    const freqMap: Record<string, number> = {};

    for (const w of words) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }
    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));
  }
  const cjkTesting =
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;

  const wordcloudData = data.year_detail.filter((val) =>
    val.watch_time && val.video_title
      ? new Date(val.watch_time).getFullYear() == 2022 &&
        !cjkTesting.test(val.video_title)
      : false
  );

  function reduceFn(prv: Record<string, number>, curr: string) {
    const words: string[] = curr
      .replace(/\./g, '')
      .replace(/\W/g, ' ')
      .split(/\s/);
    for (const w of words) {
      if (w.length <= 1) continue;
      if (!prv[w]) prv[w] = 0;
      prv[w] += 1;
    }
    return prv;
  }

  const toWordDatas = (records: Record<string, number>) =>
    Object.keys(records).map((word) => ({
      text: word,
      value: records[word],
    }));
  const videoWordsFreqMap = wordcloudData
    .filter((val) => val.video_title)
    .map((val) => val.video_title!)
    .reduce(reduceFn, {});
  const videoWords: WordData[] = toWordDatas(videoWordsFreqMap);

  const commentWordsFreqMap = wordcloudData
    .filter((val) => val.comments)
    .map((val) => val.comments!)
    .reduce(reduceFn, {});
  const commentWords = toWordDatas(commentWordsFreqMap);
  const searchWordsFreqMap = wordcloudData
    .filter((val) => val.searches)
    .map((val) => val.searches!)
    .reduce(reduceFn, {});
  const searchWords = toWordDatas(searchWordsFreqMap);
  return (
    <Suspense>
      <div className={`${poppins.className} bg-gray-100`}>
        <Header />
        <div className='grid gap-4 grid-cols-1 py-4'>
          <TwoCardsGrid>
            <First
              search={data.stat.searches[0]}
              likes={data.stat.likes[0]}
              comments={data.stat.comments[0]}
              totalHours={totalHours}
              videoCounts={data.stat.watched[0]}
              timePercents={watchTimeMost.watchTime_min / totalHours}
              favoriteCategory={categoryNameOfMost.categoryName}
              favoriteVideo={data.top5[0].video_title}
            />
          </TwoCardsGrid>
          <TwoCardsGrid>
            <Second
              data={heatmapData}
              videoPerDay={data.stat.video_watched_per_day[0]}
              videos={data.stat.watched[0]}
              yearlyTotal={data.stat.active_total_day[0]}
              hours={totalHours}
              uptimes={data.stat.uptime[0]}
              hoursPerDay={totalHours / data.stat.active_total_day[0]}
            />
          </TwoCardsGrid>
          <ThreeCardsGrid>
            <Third
              words={videoWords}
              name='Video Keyword Cloud'
              color='#FFC01F'
            />
            <Third
              words={commentWords}
              name='Comment Keyword Cloud'
              color='#15ABFF'
            />
            <Third
              words={searchWords}
              name='Search Keyword Cloud'
              color='#968DFF'
            />
          </ThreeCardsGrid>
          <div className='text-sm font-semibold p-3 pt-6'>Your Top Records</div>
          <ThreeCardsGrid>
            <Fourth
              data={videoRecord}
              shadowColor='#FFF2D2'
              color='#FFC01F'
              name='Videos'
            />
            <Fourth
              data={channelsRecord}
              shadowColor='rgba(29, 243, 166, 0.2)'
              color='#1DF3A6'
              name='Channels'
            />
            <Fourth
              data={topicRecords}
              shadowColor='#EAE8FF'
              color='#968DFF'
              name='Topics'
            />
          </ThreeCardsGrid>

          <ThreeCardsGrid>
            <Sixth
              data={languagePieData}
              colorSet={['#1FAEFF', '#FFF61F', '#1DF3A6', '#1DCDF3']}
              name={'Language'}
            />
            <Sixth
              data={durationPieData}
              colorSet={['#1DF3A6', '#FFF61F', '#FFAEF2', '#1DCDF3']}
              name={'Duration'}
            />
            {/* <Sixth
              colorSet={['#4F8BFF', '#FFF61F', '#1DF3A6', '#FFAEF2']}
              name={'Geography'}
            /> */}
          </ThreeCardsGrid>
          {/* <Seventh /> */}
        </div>
      </div>
      <footer className='flex w-full footer-bg h-32'>
        <Footer />
      </footer>
    </Suspense>
  );
}
