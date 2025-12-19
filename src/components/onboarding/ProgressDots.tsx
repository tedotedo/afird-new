interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === current
              ? 'w-8 bg-blue-600'
              : index < current
              ? 'w-2 bg-blue-400'
              : 'w-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

