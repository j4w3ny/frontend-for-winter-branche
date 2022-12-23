'use client';
import { Group, ParentSize, scaleOrdinal } from './client';
import { scaleLog, scaleLinear } from './client';
import { Wordcloud, Text } from './client';
import { PropsWithChildren } from 'react';
import { EChartsReact, echarts } from './client';
import { EChartsOption } from 'echarts';
import { BarRounded, Pie } from './client';
import { Poppins } from '@next/font/google';
import { union } from 'lodash';
import numeral from 'numeral';
import { decode } from 'html-entities';
import { commonWords } from './constant';
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
export function First(props: React.PropsWithChildren<FirstProps>) {
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

interface SecondProps {
  videos: number;
  yearlyTotal: number;
  videoPerDay: string;
  hours: number;
  uptimes: string;
  hoursPerDay: number;
  data: [string, number][];
}

export function Second(props: SecondProps) {
  const max = props.data.reduce((prv, curr) => (prv[1] > curr[1] ? prv : curr));
  const options: EChartsOption = {
    title: {
      show: false,
    },
    grid: {
      show: false,
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: max[1],
      orient: 'horizontal',
      type: 'piecewise',
      inRange: {
        color: ['rgba(29,178,66,0.2)', 'rgba(29,178,66,0.5)', '#1db242'],
      },
      show: false,
    },
    calendar: {
      top: 'center',
      left: 40,
      cellSize: ['auto', 13],
      range: '2022',
      splitLine: {
        show: false,
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#fff',
      },
      yearLabel: { show: false },
      dayLabel: {
        show: true,
        fontWeight: 'lighter',
        nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      monthLabel: { show: true },
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: union(getVirtualData('2022'), props.data),
        itemStyle: {
          borderRadius: 2,
        },
      },
    ],
  };
  function getVirtualData(year: string) {
    const date = +echarts.time.parse(year + '-01-01');
    const end = +echarts.time.parse(+year + '-12-31');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), 0]);
    }
    return data;
  }

  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <>
      <div className='inline-flex flex-col h-full space-y-10 items-start justify-between px-6 py-5 bg-white rounded-2xl'>
        <div className='inline-flex  w-full space-x-16 items-start justify-between'>
          <div className='inline-flex flex-col space-y-0.5 items-start justify-start'>
            <p className='text-2xl font-bold text-gray-900 uppercase'>
              {props.videos}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Videos</p>
          </div>

          <div className='inline-flex flex-col space-y-0.5 items-center justify-start'>
            <p className='text-2xl font-bold text-gray-900 uppercase'>
              {props.yearlyTotal}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>365 days</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-end justify-start'>
            <p className='text-2xl font-bold text-right text-gray-900 uppercase'>
              {props.videoPerDay}
            </p>
            <p className='opacity-50 text-xs text-right text-gray-900'>
              videos / day
            </p>
          </div>
        </div>
        <div className='inline-flex w-full space-x-16 items-start justify-between'>
          <div className='inline-flex flex-col space-y-0.5 items-start justify-start'>
            <p className='text-2xl font-bold text-gray-900 uppercase'>
              {formatter.format(props.hours)}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Hours</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-center justify-start'>
            <p className='text-2xl font-bold text-gray-900 uppercase'>
              {props.uptimes}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Up times</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-end justify-start'>
            <p className='text-2xl font-bold text-right text-gray-900 uppercase'>
              {formatter.format(props.hoursPerDay)}
            </p>
            <p className='opacity-50 text-xs text-right text-gray-900'>
              Hours / day
            </p>
          </div>
        </div>
      </div>
      <div className='inline-flex flex-col px-6 py-5 space-y-10 items-center justify-start bg-white rounded-2xl'>
        <ParentSize>
          {({ width }) => (
            <EChartsReact
              option={options}
              opts={{
                renderer: 'svg',
                locale: 'en',
                height: 184,
                width: width,
              }}
              theme={'wonderland'}
              style={{
                width: width,
                height: 184,
              }}
            />
          )}
        </ParentSize>
      </div>
    </>
  );
}

export interface WordData {
  text: string;
  value: number;
}
export function CardBase(props: PropsWithChildren<{}>) {
  return (
    <div className='inline-flex flex-col w-full h-full space-y-5 items-start justify-start px-6 py-5 bg-white rounded-2xl'>
      {props.children}
    </div>
  );
}
const poppins = Poppins({
  weight: ['400', '600', '500', '700'],
  subsets: ['latin'],
});
interface ThirdProps {
  name: string;
  color: string;
  words: WordData[];
}

export function Third(props: ThirdProps) {
  const fontScale = scaleLog({
    domain: [
      Math.min(...props.words.map((w) => w.value)),
      Math.max(...props.words.map((w) => w.value)),
    ],
    range: [20, 50],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);
  console.log(props.words);
  const words = props.words
    .filter((val) => !commonWords.includes(val.text.toLowerCase()))
    .sort((a, b) => b.value - a.value)
    .slice(0, 100);
  return (
    <CardBase>
      <h1 className='text-sm font-semibold'>{props.name}</h1>
      <div
        className={`${poppins.className} flex flex-col w-full h-full`}
        style={{
          minWidth: 329,
        }}
      >
        <ParentSize>
          {({ width }) => (
            <Wordcloud
              width={width}
              height={300}
              padding={2}
              fontWeight={700}
              fontSize={fontSizeSetter}
              spiral={'rectangular'}
              words={words}
              rotate={() => 0}
              // random={() => 0.5}
            >
              {(cloudWords) =>
                cloudWords.map((w, i) => (
                  <Text
                    key={w.text + i.toString()}
                    fill={props.color}
                    textAnchor={'middle'}
                    transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                    fontSize={w.size}
                    fontWeight={w.weight}
                  >
                    {w.text}
                  </Text>
                ))
              }
            </Wordcloud>
          )}
        </ParentSize>
      </div>
    </CardBase>
  );
}
export interface TopRecordData {
  name: string;
  counts: number;
}

export interface FourthProp {
  name: string;
  shadowColor: string;
  color: string;
  data: TopRecordData[];
}

export function Fourth(props: FourthProp) {
  //   const mockData: TopRecordData[] = [
  //     {
  //       name: 'A',
  //       counts: 3912,
  //     },
  //     {
  //       name: 'B',
  //       counts: 2648,
  //     },
  //     {
  //       name: 'C',
  //       counts: 1929,
  //     },
  //     {
  //       name: 'D',
  //       counts: 692,
  //     },
  //   ];
  const data = props.data.slice(0, 4);
  return (
    <CardBase>
      <div className='text-sm font-semibold mb-7 w-full h-full border-b'>
        {props.name}
      </div>

      <div
        className='w-full h-full grid grid-flow-row'
        style={{
          minWidth: 329,
        }}
      >
        <div className='grid grid-cols-2 mb-4 w-full'>
          <div className='font-normal text-xs'>{props.name}</div>
          <div className='font-normal text-xs text-end'>{'Counts'}</div>
        </div>
        <div className='grid grid-flow-row gap-5 w-full h-full'>
          {data.map((data, key) => {
            return (
              <div key={`bar-${key}`} className=''>
                <div className='grid grid-cols-8 mb-1'>
                  <p
                    className='text-xs flex w-full font-medium col-span-7 overflow-hidden text-ellipsis'
                    style={{
                      maxHeight: 16,
                    }}
                  >
                    {data.name}
                  </p>
                  <h6 className='text-xs font-medium text-end'>
                    {data.counts}
                  </h6>
                </div>
                <ParentSize>
                  {({ width }) => {
                    const scale = scaleLinear<number>({
                      range: [0, width],
                      round: true,
                      domain: [0, Math.max(...props.data.map((d) => d.counts))],
                    });
                    return (
                      <svg width={width} height={8}>
                        <BarRounded
                          radius={8}
                          x={0}
                          all
                          fill={props.shadowColor}
                          y={0}
                          width={width}
                          height={8}
                        ></BarRounded>
                        <BarRounded
                          radius={8}
                          x={0}
                          all
                          y={0}
                          fill={props.color}
                          width={scale(data.counts)}
                          height={8}
                        ></BarRounded>
                      </svg>
                    );
                  }}
                </ParentSize>
              </div>
            );
          })}
        </div>
      </div>
    </CardBase>
  );
}

interface SixthProp {
  name: string;
  colorSet: string[];
  data: SixthData[];
}
export interface SixthData {
  name: string;
  value: number;
}
export function Sixth(props: SixthProp) {
  const data: SixthData[] = props.data.slice(0, 4);

  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  const format = Intl.NumberFormat('en', { notation: 'compact' }).format;
  const getColor = scaleOrdinal({
    domain: data.map((d) => d.name),
    range: props.colorSet,
  });
  return (
    <CardBase>
      {/* <div className='w-full h-full grid grid-rows-2'> */}
      <div className='w-full mb-7 '>
        <div className='text-sm font-semibold w-full h-full border-b'>
          {props.name}
        </div>
      </div>
      <div className='w-full h-full inline-grid grid-cols-3'>
        <div className='col-span-2 w-full h-full'>
          <ParentSize>
            {({ width }) => {
              const height = 100;
              const centerY = height / 2;
              const radius = Math.min(width, height) / 2;
              const donutThickness = 11.1;
              const centerX = width / 2;
              return (
                <svg width={width} height={height}>
                  <Group top={centerY} left={centerX}>
                    <Pie
                      data={data}
                      pieValue={(d) => d.value}
                      outerRadius={radius}
                      innerRadius={radius - donutThickness}
                    >
                      {({ path, arcs }) => (
                        <g>
                          {arcs.map((arc, key) => (
                            <path
                              key={key}
                              d={
                                path({
                                  ...arc,
                                }) ?? ''
                              }
                              fill={getColor(arc.data.name)}
                            ></path>
                          ))}
                        </g>
                      )}
                    </Pie>
                  </Group>
                </svg>
              );
            }}
          </ParentSize>
        </div>
        <div className='grid grid-flow-row gap-3 w-full h-full'>
          {data
            .sort((a, b) => b.value - a.value)
            .map((d, i) => {
              return (
                <div key={i} className='font-medium text-xs flex gap-1.5'>
                  <div
                    className='w-2.5 h-2.5 flex-none flex-grow-0 my-1'
                    style={{ background: getColor(d.name), borderRadius: 44 }}
                  ></div>
                  <div className='w-full grid'>
                    <span>{d.name}</span>
                    <span>{`${format((d.value / total) * 100)}%`}</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* </div> */}
    </CardBase>
  );
}
