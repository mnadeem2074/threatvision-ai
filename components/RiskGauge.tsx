'use client';

interface RiskGaugeProps {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  size?: 'sm' | 'md' | 'lg';
}

export default function RiskGauge({ score, level, size = 'md' }: RiskGaugeProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48'
  };
  
  const levelColors = {
    low: 'from-green-500 to-green-600',
    medium: 'from-yellow-500 to-orange-500',
    high: 'from-orange-500 to-red-600',
    critical: 'from-red-600 to-red-800'
  };
  
  const levelText = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
    critical: 'CRITICAL'
  };
  
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="8"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={`url(#gradient-${level})`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id={`gradient-${level}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor={level === 'critical' ? '#ef4444' : '#f59e0b'} />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-bold ${
          size === 'lg' ? 'text-3xl' : size === 'md' ? 'text-2xl' : 'text-xl'
        } text-white`}>
          {Math.round(score)}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${
          level === 'critical' ? 'bg-red-500/20 text-red-400' :
          level === 'high' ? 'bg-orange-500/20 text-orange-400' :
          level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-green-500/20 text-green-400'
        }`}>
          {levelText[level]}
        </span>
      </div>
    </div>
  );
}
