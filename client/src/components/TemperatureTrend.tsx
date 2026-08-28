import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import type { TemperatureDataPoint } from "../types/weather";

interface TemperatureTrendProps {
  data: TemperatureDataPoint[];
}

function TemperatureTrend({ data }: TemperatureTrendProps) {
  return (
    <div className="h-32 w-full overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
      <style>{`
        .temp-trend-chart .recharts-cartesian-axis-tick-value {
          fill: #94a3b8;
        }
        .dark .temp-trend-chart .recharts-cartesian-axis-tick-value {
          fill: #64748b;
        }
      `}</style>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          className="temp-trend-chart"
        >
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(99 102 241)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="rgb(168 85 247)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="currentColor"
            strokeOpacity={0.08}
            className="text-slate-300 dark:text-slate-600"
          />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 9 }}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length && payload[0]) {
                const value = Number(payload[0].value);
                return (
                  <div className="rounded-2xl border-2 border-indigo-200 bg-white px-5 py-4 shadow-2xl dark:border-indigo-700 dark:bg-slate-900">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {label}
                    </p>
                    <p className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                      {value.toFixed(1)}°C
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="rgb(99 102 241)"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#tempGradient)"
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="rgb(99 102 241)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
              fill: "rgb(99 102 241)",
              stroke: "rgb(255 255 255)",
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureTrend;