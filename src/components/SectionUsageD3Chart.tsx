import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { BarChart2, Eye, MousePointerClick, TrendingUp, Award, RefreshCw } from 'lucide-react';

export interface SectionStatItem {
  id: string;
  name: string;
  shortName: string;
  visits: number;
  clicks: number;
}

const DEFAULT_SECTION_STATS: SectionStatItem[] = [
  { id: 'sec-1', name: '১ম সেকশন: হিরো ব্যানার', shortName: '১ম সেকশন', visits: 2840, clicks: 1920 },
  { id: 'sec-2', name: '২য় সেকশন: ভিডিও ভাষণ', shortName: '২য় সেকশন', visits: 1950, clicks: 1340 },
  { id: 'sec-3', name: '৩য় সেকশন: ৩ডি এরিয়াল ম্যাপ', shortName: '৩য় সেকশন', visits: 1620, clicks: 980 },
  { id: 'sec-4', name: '৪র্থ সেকশন: দোকান ডিরেক্টরি', shortName: '৪র্থ সেকশন', visits: 3450, clicks: 2680 },
  { id: 'sec-5', name: '৫ম সেকশন: কাঁচাবাজার', shortName: '৫ম সেকশন', visits: 2210, clicks: 1750 },
  { id: 'sec-6', name: '৬ষ্ঠ সেকশন: মুদিখানা', shortName: '৬ষ্ঠ সেকশন', visits: 1890, clicks: 1410 },
  { id: 'sec-7', name: '৭ম সেকশন: সেলুন ও বেডিং', shortName: '৭ম সেকশন', visits: 1450, clicks: 1020 },
  { id: 'sec-8', name: '৮ম সেকশন: ফার্মেসী স্বাস্থ্যসেবা', shortName: '৮ম সেকশন', visits: 2980, clicks: 2190 },
  { id: 'sec-9', name: '৯ম সেকশন: ভূমি সেবা চেম্বার', shortName: '৯ম সেকশন', visits: 1760, clicks: 1230 },
  { id: 'sec-10', name: '১০ম সেকশন: ফেসবুক সোশ্যাল ওয়াল', shortName: '১০ম সেকশন', visits: 3820, clicks: 2940 },
];

const STORAGE_KEY = 'goni_market_section_usage_stats_v1';

export function getStoredSectionStats(): SectionStatItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 9) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load section stats', e);
  }
  return DEFAULT_SECTION_STATS;
}

export function incrementSectionVisit(sectionId: string) {
  try {
    const stats = getStoredSectionStats();
    const updated = stats.map((item) => {
      if (item.id === sectionId) {
        return { ...item, visits: item.visits + 1 };
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to increment section visit', e);
  }
}

interface SectionUsageD3ChartProps {
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
}

export const SectionUsageD3Chart: React.FC<SectionUsageD3ChartProps> = ({
  selectedSectionId,
  onSelectSection,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [stats, setStats] = useState<SectionStatItem[]>(getStoredSectionStats);
  const [metric, setMetric] = useState<'visits' | 'clicks'>('visits');
  const [hoveredSection, setHoveredSection] = useState<SectionStatItem | null>(null);

  const handleResetStats = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStats(DEFAULT_SECTION_STATS);
  };

  // Render D3 Bar Chart
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = containerRef.current.clientWidth || 700;
    const height = 260;
    const margin = { top: 35, right: 20, bottom: 45, left: 45 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('width', '100%').attr('height', height);

    // Defs for gradients
    const defs = svg.append('defs');

    // Normal bar gradient
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#f59e0b');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#d97706');

    // Active selected bar gradient
    const activeGradient = defs
      .append('linearGradient')
      .attr('id', 'active-bar-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    activeGradient.append('stop').attr('offset', '0%').attr('stop-color', '#10b981');
    activeGradient.append('stop').attr('offset', '100%').attr('stop-color', '#059669');

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand<string>()
      .domain(stats.map((d) => d.shortName))
      .range([0, innerWidth])
      .padding(0.3);

    const maxVal = d3.max(stats, (d: SectionStatItem) => (metric === 'visits' ? d.visits : d.clicks)) || 1000;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxVal * 1.15])
      .nice()
      .range([innerHeight, 0]);

    // Grid lines
    chartGroup
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickFormat(() => '')
      )
      .selectAll('line')
      .attr('stroke', '#334155')
      .attr('stroke-dasharray', '3,3')
      .attr('opacity', 0.4);

    // Bars
    chartGroup
      .selectAll('.bar')
      .data(stats)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: SectionStatItem) => xScale(d.shortName) || 0)
      .attr('width', xScale.bandwidth())
      .attr('y', innerHeight)
      .attr('height', 0)
      .attr('rx', 6)
      .attr('ry', 6)
      .attr('fill', (d: SectionStatItem) => (d.id === selectedSectionId ? 'url(#active-bar-gradient)' : 'url(#bar-gradient)'))
      .attr('stroke', (d: SectionStatItem) => (d.id === selectedSectionId ? '#34d399' : '#fbbf24'))
      .attr('stroke-width', (d: SectionStatItem) => (d.id === selectedSectionId ? 2 : 0))
      .style('cursor', 'pointer')
      .on('mouseenter', (event: MouseEvent, d: SectionStatItem) => {
        setHoveredSection(d);
        d3.select(event.currentTarget as SVGElement)
          .transition()
          .duration(150)
          .attr('opacity', 0.85)
          .attr('transform', 'scale(1.03)')
          .attr('transform-origin', `${(xScale(d.shortName) || 0) + xScale.bandwidth() / 2}px ${innerHeight}px`);
      })
      .on('mouseleave', (event: MouseEvent) => {
        setHoveredSection(null);
        d3.select(event.currentTarget as SVGElement)
          .transition()
          .duration(150)
          .attr('opacity', 1)
          .attr('transform', 'scale(1)');
      })
      .on('click', (_: MouseEvent, d: SectionStatItem) => {
        onSelectSection(d.id);
      })
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr('y', (d: SectionStatItem) => yScale(metric === 'visits' ? d.visits : d.clicks))
      .attr('height', (d: SectionStatItem) => innerHeight - yScale(metric === 'visits' ? d.visits : d.clicks));

    // Value Labels on top of bars
    chartGroup
      .selectAll('.value-label')
      .data(stats)
      .enter()
      .append('text')
      .attr('class', 'value-label')
      .attr('x', (d: SectionStatItem) => (xScale(d.shortName) || 0) + xScale.bandwidth() / 2)
      .attr('y', (d: SectionStatItem) => yScale(metric === 'visits' ? d.visits : d.clicks) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', (d: SectionStatItem) => (d.id === selectedSectionId ? '#34d399' : '#fcd34d'))
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text((d: SectionStatItem) => {
        const val = metric === 'visits' ? d.visits : d.clicks;
        return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${val}`;
      });

    // X Axis
    const xAxis = d3.axisBottom(xScale);
    const xAxisGroup = chartGroup
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    xAxisGroup.selectAll('text').attr('fill', '#94a3b8').attr('font-size', '10px').attr('font-weight', '600');
    xAxisGroup.selectAll('line').attr('stroke', '#475569');
    xAxisGroup.select('.domain').attr('stroke', '#475569');

    // Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(5);
    const yAxisGroup = chartGroup.append('g').call(yAxis);

    yAxisGroup.selectAll('text').attr('fill', '#94a3b8').attr('font-size', '9px');
    yAxisGroup.selectAll('line').attr('stroke', '#475569');
    yAxisGroup.select('.domain').attr('stroke', '#475569');
  }, [stats, metric, selectedSectionId, onSelectSection]);

  const totalVisits = stats.reduce((acc, curr) => acc + curr.visits, 0);
  const totalClicks = stats.reduce((acc, curr) => acc + curr.clicks, 0);
  const topSection = [...stats].sort((a, b) => b.visits - a.visits)[0];

  return (
    <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 space-y-4 shadow-xl">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span>📊 সেকশন ট্রাফিক ও ভিজিট অ্যানালিটিক্স</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                D3 Chart
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              সকল ৯টি সেকশনের লাইভ ইউজার ভিজিট ও ইন্টারঅ্যাকশন অ্যানালিটিক্স।
            </p>
          </div>
        </div>

        {/* Filter Toggle Buttons */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setMetric('visits')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                metric === 'visits'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>ভিজিট ({totalVisits.toLocaleString()})</span>
            </button>
            <button
              onClick={() => setMetric('clicks')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                metric === 'clicks'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MousePointerClick className="w-3.5 h-3.5" />
              <span>ক্লিক ({totalClicks.toLocaleString()})</span>
            </button>
          </div>

          <button
            onClick={handleResetStats}
            title="পরিসংখ্যান রিসেট করুন"
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2.5">
          <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">মোট ভিজিট সংখ্যা</span>
            <span className="text-sm font-black text-amber-300">{totalVisits.toLocaleString()} বার</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2.5">
          <MousePointerClick className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">মোট ক্লিক/ইন্টারঅ্যাকশন</span>
            <span className="text-sm font-black text-emerald-300">{totalClicks.toLocaleString()} বার</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl flex items-center gap-2.5">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block font-medium">শীর্ষ জনপ্রিয় সেকশন</span>
            <span className="text-xs font-bold text-white truncate block">
              {topSection ? topSection.name.split(':')[1] || topSection.name : '-'}
            </span>
          </div>
        </div>
      </div>

      {/* D3 Bar Chart Canvas */}
      <div ref={containerRef} className="relative w-full overflow-hidden bg-slate-900/50 rounded-xl p-2 border border-slate-800/80">
        <svg ref={svgRef} className="w-full h-[260px]"></svg>

        {/* Hovered bar tooltip overlay */}
        {hoveredSection && (
          <div className="absolute top-2 right-3 bg-slate-950/95 border border-amber-500/50 px-3 py-1.5 rounded-xl text-[11px] shadow-2xl flex items-center gap-2 animate-in fade-in">
            <span className="font-bold text-white">{hoveredSection.name}:</span>
            <span className="text-amber-300 font-mono font-black">
              {metric === 'visits' ? `${hoveredSection.visits} ভিজিট` : `${hoveredSection.clicks} ক্লিক`}
            </span>
            <span className="text-[9px] text-emerald-400 font-bold">(ক্লিক করে নির্বাচন করুন)</span>
          </div>
        )}
      </div>

      {/* Selected section status bar */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            বর্তমানে নির্বাচিত: <strong className="text-emerald-300">{stats.find((s) => s.id === selectedSectionId)?.name}</strong>
          </span>
        </span>
        <span className="text-[10px] text-amber-400/90 font-semibold">
          💡 চার্টের যেকোনো বারে ক্লিক করে সরাসরি সেকশন পরিবর্তন করতে পারবেন
        </span>
      </div>
    </div>
  );
};
