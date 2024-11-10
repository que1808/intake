import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { Substance, IntakeLog } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IntakeGraphProps {
  substance: Substance;
  logs: IntakeLog[];
  days?: number;
}

const IntakeGraph: React.FC<IntakeGraphProps> = ({ substance, logs, days = 7 }) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useTransform(x, [-100, 0, 100], [0.8, 1, 0.8]);

  const dates = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  const data = {
    labels: dates,
    datasets: [
      {
        label: `Daily ${substance.name} Intake`,
        data: dates.map(() => Math.random() * substance.maxDailyDose),
        borderColor: '#007AFF',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => {
            return `${context.parsed.y.toFixed(0)} ${substance.dosageUnit}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: substance.maxDailyDose,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <motion.div
      className="ios-card p-4"
      style={{ scale }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-lg font-semibold text-black mb-4">Intake History</h3>
      <div className="relative h-64">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

export default IntakeGraph;