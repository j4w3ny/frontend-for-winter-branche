import numeral from 'numeral';
import { EChartsOption } from 'echarts';
import React, { PropsWithChildren, Suspense, use } from 'react';
import ReactECharts from 'echarts-for-react';
import { Wordcloud } from '@visx/wordcloud';
import { Text } from '@visx/text';
import * as echarts from 'echarts';
import { Audiowide, Poppins } from '@next/font/google';
import Banner from '../assets/banner.svg';
import Image from 'next/image';
import { scaleLog } from '@visx/scale';
const audioWide = Audiowide({ weight: '400' });
const poppins = Poppins({ weight: ['400', '200'], subsets: ['latin'] });

echarts.registerTheme('wonderland', {
  color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9'],
  backgroundColor: 'rgba(255,255,255,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#666666',
    },
    subtextStyle: {
      color: '#999999',
    },
  },
  line: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      width: '3',
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
  },
  radar: {
    itemStyle: {
      borderWidth: '2',
    },
    lineStyle: {
      width: '3',
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
  },
  bar: {
    itemStyle: {
      barBorderWidth: 0,
      barBorderColor: '#ccc',
    },
  },
  pie: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  scatter: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  boxplot: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  parallel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  sankey: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  funnel: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  gauge: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
  },
  candlestick: {
    itemStyle: {
      color: '#d0648a',
      color0: 'transparent',
      borderColor: '#d0648a',
      borderColor0: '#22c3aa',
      borderWidth: '1',
    },
  },
  graph: {
    itemStyle: {
      borderWidth: 0,
      borderColor: '#ccc',
    },
    lineStyle: {
      width: '1',
      color: '#cccccc',
    },
    symbolSize: '8',
    symbol: 'emptyCircle',
    smooth: false,
    color: ['#4ea397', '#22c3aa', '#7bd9a5', '#d0648a', '#f58db2', '#f2b3c9'],
    label: {
      color: '#ffffff',
    },
  },
  map: {
    itemStyle: {
      areaColor: '#eeeeee',
      borderColor: '#999999',
      borderWidth: 0.5,
    },
    label: {
      color: '#28544e',
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(34,195,170,0.25)',
        borderColor: '#22c3aa',
        borderWidth: 1,
      },
      label: {
        color: '#349e8e',
      },
    },
  },
  geo: {
    itemStyle: {
      areaColor: '#eeeeee',
      borderColor: '#999999',
      borderWidth: 0.5,
    },
    label: {
      color: '#28544e',
    },
    emphasis: {
      itemStyle: {
        areaColor: 'rgba(34,195,170,0.25)',
        borderColor: '#22c3aa',
        borderWidth: 1,
      },
      label: {
        color: '#349e8e',
      },
    },
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#cccccc',
      },
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333',
      },
    },
    axisLabel: {
      show: true,
      color: '#999999',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee'],
      },
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)'],
      },
    },
  },
  toolbox: {
    iconStyle: {
      borderColor: '#999999',
    },
    emphasis: {
      iconStyle: {
        borderColor: '#666666',
      },
    },
  },
  legend: {
    textStyle: {
      color: '#999999',
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#cccccc',
        width: 1,
      },
      crossStyle: {
        color: '#cccccc',
        width: 1,
      },
    },
  },
  timeline: {
    lineStyle: {
      color: '#4ea397',
      width: 1,
    },
    itemStyle: {
      color: '#4ea397',
      borderWidth: 1,
    },
    controlStyle: {
      color: '#4ea397',
      borderColor: '#4ea397',
      borderWidth: 0.5,
    },
    checkpointStyle: {
      color: '#4ea397',
      borderColor: '#3cebd2',
    },
    label: {
      color: '#4ea397',
    },
    emphasis: {
      itemStyle: {
        color: '#4ea397',
      },
      controlStyle: {
        color: '#4ea397',
        borderColor: '#4ea397',
        borderWidth: 0.5,
      },
      label: {
        color: '#4ea397',
      },
    },
  },
  visualMap: {
    color: ['#d0648a', '#22c3aa', '#adfff1'],
  },
  dataZoom: {
    backgroundColor: 'rgba(255,255,255,0)',
    dataBackgroundColor: 'rgba(222,222,222,1)',
    fillerColor: 'rgba(114,230,212,0.25)',
    handleColor: '#cccccc',
    handleSize: '100%',
    textStyle: {
      color: '#999999',
    },
  },
  markPoint: {
    label: {
      color: '#ffffff',
    },
    emphasis: {
      label: {
        color: '#ffffff',
      },
    },
  },
});

function Header() {
  return (
    <div
      className={audioWide.className + ' pl-9'}
      style={{
        backgroundImage: `url(../assets/banner.svg)`,
      }}
    >
      <div className='pt-12 pb-6'>Youtube LOGO</div>
      <h1 className='text-6xl text-gray-900 uppercase pb-6'>2022 Review</h1>
    </div>
  );
}

function TwoCardsGrid(props: React.PropsWithChildren<{}>) {
  return (
    <div className='inline-grid grid-flow-row gap-4 sm:grid-cols-2 items-center justify-start px-3'>
      {props.children}
    </div>
  );
}
function ThreeCardsGrid(props: React.PropsWithChildren<{}>) {
  return (
    <div className='inline-grid grid-flow-row gap-4 sm:grid-cols-3 items-center justify-start px-3'>
      {props.children}
    </div>
  );
}
interface FirstProps {
  name?: string;
  search?: number;
  likes?: number;
  comments?: number;
}
function First(props: React.PropsWithChildren<FirstProps>) {
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
          You Spent <strong>370 hours</strong> and watched{' '}
          <strong>3770 videos</strong> in the total of 217 days.
        </p>
        <p
          className='text-base leading-snug text-gray-900'
          // style={{ width: 894 }}
        >
          Spending <strong>76 %</strong> of your time on <strong>Music</strong>
          <br />
          related videos & Your Favourite Video is <br />
          <strong>Never gonna give you up</strong>
        </p>
      </div>
    </>
  );
}

interface SecondProps {
  videos: number;
  yearlyTotal: number;
  videoPerDay: number;
  hours: number;
  uptimes: number;
  hoursPerDay: number;
}
function Second(props: SecondProps) {
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
      max: 10000,
      // left: 0,
      show: false,
    },
    calendar: {
      // top: 'center',
      // left: 'center',
      // right: 30,
      left: 12,
      top: 'center',
      cellSize: [32, 24],
      range: '2016',
      splitLine: {
        show: false,
      },
      itemStyle: {
        borderWidth: 3,
        borderColor: '#fff',
        // borderDashOffset: 2,
      },
      yearLabel: { show: false },
      dayLabel: {
        show: true,
        margin: -18,
        // align: 'right',
        // distance: 0,
        // padding: -10,
        fontWeight: 'lighter',
        nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      monthLabel: { show: false },
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        data: getVirtualData('2016'),
        itemStyle: {
          borderRadius: 2,
        },
      },
    ],
  };
  function getVirtualData(year: string) {
    const date = +echarts.time.parse(year + '-01-03');
    const end = +echarts.time.parse(+year + '-10-31');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        Math.floor(Math.random() * 10000),
      ]);
    }
    return data;
  }

  return (
    <>
      <div className='inline-flex flex-col h-full space-y-10 items-start justify-between px-6 py-5 bg-white rounded-2xl'>
        <div className='inline-flex space-x-16 items-start justify-between'>
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
              {props.hours}
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Hours</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-center justify-start'>
            <p className='text-2xl font-bold text-gray-900 uppercase'>
              {props.uptimes}%
            </p>
            <p className='opacity-50 text-xs text-gray-900'>Up times</p>
          </div>
          <div className='inline-flex flex-col space-y-0.5 items-end justify-start'>
            <p className='text-2xl font-bold text-right text-gray-900 uppercase'>
              {props.hoursPerDay}
            </p>
            <p className='opacity-50 text-xs text-right text-gray-900'>
              Hours / day
            </p>
          </div>
        </div>
      </div>
      <div className='inline-flex flex-col px-6 py-5 space-y-10 items-center justify-start bg-white rounded-2xl'>
        <ReactECharts
          option={options}
          lazyUpdate
          theme={'wonderland'}
          style={{
            width: '100%',
            height: 184,
          }}
          opts={{
            locale: 'en',
            height: 184,
          }}
        ></ReactECharts>
        {/* <div className='inline-flex flex-col space-y-0.5 items-start justify-start'></div> */}
      </div>
    </>
  );
}
function CardBase(props: PropsWithChildren<{}>) {
  return (
    <div className='inline-flex flex-col w-full h-full space-y-5 items-start justify-start px-6 py-5 bg-white rounded-2xl'>
      {props.children}
    </div>
  );
}

interface WordData {
  text: string;
  value: number;
}
function Third() {
  const colors = ['#143059', '#2F6B9A', '#82a6c2'];
  const words = [
    {
      text: 'Hello',
      value: 100,
    },
    {
      text: 'test',
      value: 100,
    },
    {
      text: 'world',
      value: 100,
    },
  ];
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  return (
    <CardBase>
      <div className='flex flex-col w-full h-full'>
        <Wordcloud
          width={500}
          height={500}
          padding={2}
          fontSize={fontSizeSetter}
          spiral={'rectangular'}
          words={words}
          rotate={() => 0}
          random={() => 0.5}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={colors[i % colors.length]}
                textAnchor={'middle'}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
    </CardBase>
  );
}
function Fourth() {
  const options: EChartsOption = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {},
    grid: {
      left: 0,
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      show: false,
      type: 'value',
      boundaryGap: [0, 0.02],
    },
    yAxis: {
      type: 'category',
      show: true,
      splitLine: { show: false },
      // offset: 10,
      nameLocation: 'middle',
      axisLine: { show: false, onZero: false },
      axisLabel: { show: true, margin: 0 },
      minorSplitLine: { show: false },
      data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'],
    },
    series: [
      {
        name: '2011',
        showBackground: true,
        backgroundStyle: {
          borderRadius: 10,
        },
        type: 'bar',
        itemStyle: {
          borderRadius: 10,
        },
        label: { show: false },
        labelLine: { showAbove: true },
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
    ],
  };

  return (
    <CardBase>
      <ReactECharts
        lazyUpdate
        style={{
          width: '100%',
        }}
        theme={'wonderland'}
        option={options}
      />
    </CardBase>
  );
}

function Fifth() {
  const options: EChartsOption = {};
  const mockData = {
    content: 'REPLACEMENT',
  };
  return (
    <>
      <div className='col-span-2'>
        <CardBase>
          <p className='text-sm font-semibold text-gray-900'>
            We told ChatGPT to write a story with your keywords... here is what
            happend
          </p>
          <div className='flex flex-col space-y-1 items-center justify-start'>
            <p className='text-xs text-gray-900'>
              {/* TODO */}
              {mockData.content}
              <br />
            </p>
            <div className='inline-flex space-x-1.5 items-center justify-start'>
              <p className='text-xs font-semibold text-green-600'>More</p>
              <div className='w-2.5 h-1.5 bg-pink-900 bg-opacity-50 border rounded-full border-green-600' />
            </div>
          </div>
        </CardBase>
      </div>
      <div className='inline-flex flex-col space-y-3 items-start justify-start px-5 py-4 bg-white rounded-2xl'>
        <p className='text-sm font-semibold text-gray-900'>
          The 2022 YouGraph.
        </p>
        <ReactECharts
          style={{
            width: '100%',
          }}
          option={options}
        />
      </div>
    </>
  );
}

function Sixth() {
  const options = {};
  return (
    <CardBase>
      <ReactECharts
        style={{
          width: '100%',
        }}
        option={options}
      />
    </CardBase>
  );
}
function Seventh() {
  return (
    <img
      className='rounded-3xl'
      style={{ width: 1896, height: 754 }}
      src='https://via.placeholder.com/1896x754'
    />
  );
}
export default function Review() {
  return (
    <Suspense>
      <div className={`${poppins.className} bg-gray-100`}>
        <Header />
        <div className='grid gap-4 grid-cols-1 pt-4'>
          <TwoCardsGrid>
            <First />
          </TwoCardsGrid>
          <TwoCardsGrid>
            <Second
              videoPerDay={0}
              videos={0}
              yearlyTotal={0}
              hours={0}
              uptimes={0}
              hoursPerDay={0}
            />
          </TwoCardsGrid>
          <ThreeCardsGrid>
            <Third />
            <Third />
            <Third />
          </ThreeCardsGrid>
          <ThreeCardsGrid>
            <Fourth />
            <Fourth />
            <Fourth />
          </ThreeCardsGrid>

          <ThreeCardsGrid>
            <Sixth />
            <Sixth />
            <Sixth />
          </ThreeCardsGrid>
          {/* <Seventh /> */}
        </div>
      </div>
    </Suspense>
  );
}
